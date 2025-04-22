"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/features/medical/components/page-header"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { useAuthStore } from "@/store/auth-store"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Department, fetchDepartments } from "@/services/department-service"
import { submitClearanceRequest } from "@/services/clearance-service"
import { ClearanceRequestTable } from "@/features/medical/components/clearance-request-table"
import { useClearanceRequests } from "@/hooks/useClearanceRequests"

export default function ClearancePage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [departments, setDepartments] = useState<Department[]>([])
  const [loadingDepartments, setLoadingDepartments] = useState(true)
  const { filteredRequests, loading: loadingRequests, searchQuery, setSearchQuery, refreshRequests } = useClearanceRequests()
  
  // Fetch departments from the database
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const response = await fetchDepartments();
        if (response.success && response.departments) {
          setDepartments(response.departments);
        } else {
          toast.error(response.message || 'Failed to load departments');
        }
      } catch (error) {
        console.error('Error loading departments:', error);
        toast.error('An error occurred while loading departments');
      } finally {
        setLoadingDepartments(false);
      }
    };
    
    loadDepartments();
  }, []);
  
  // Form state
  const [formData, setFormData] = useState({
    reason: "",
    otherReason: "",
    departmentId: "",
    purpose: "",
    dateNeeded: new Date(),
    additionalInfo: ""
  })
  
  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Reasons for clearance
  const clearanceReasons = [
    { id: "sportsParticipation", label: "Sports Participation" },
    { id: "studyAbroad", label: "Study Abroad/Travel" },
    { id: "internship", label: "Internship/Clinical Rotation" },
    { id: "other", label: "Other" },
  ]
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const newErrors: Record<string, string> = {}
    
    if (!formData.reason) {
      newErrors.reason = "Please select a reason for clearance"
    }
    
    if (formData.reason === "other" && !formData.otherReason.trim()) {
      newErrors.otherReason = "Please specify your reason"
    }
    
    if (!formData.departmentId) {
      newErrors.departmentId = "Please select a department"
    }
    
    if (!formData.purpose || formData.purpose.trim().length < 10) {
      newErrors.purpose = "Please provide a detailed purpose (at least 10 characters)"
    }
    
    if (!formData.dateNeeded) {
      newErrors.dateNeeded = "Please select the date needed"
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      if (!user) {
        toast.error("You must be logged in to submit a clearance request");
        return;
      }
      
      const response = await submitClearanceRequest(formData);
      
      if (response.success) {
        // Reset form
        setFormData({
          reason: "",
          otherReason: "",
          departmentId: "",
          purpose: "",
          dateNeeded: new Date(),
          additionalInfo: ""
        });
        
        // Show success message
        toast.success("Clearance request submitted successfully");
        
        // Refresh the requests
        refreshRequests();
      } else {
        toast.error(response.message || "Failed to submit clearance request");
      }
    } catch (error) {
      console.error("Error submitting clearance request:", error)
      toast.error("Failed to submit clearance request")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }))
    }
  }
  
  // Handle textarea change
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }))
    }
  }
  
  // Handle select change
  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }))
    }
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Medical Clearance" 
        description="Request a medical clearance certificate and track your clearance history." 
        currentPage="Clearance"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clearance Request Form Card */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-700">Clearance Request Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Reason for Clearance */}
                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-[#5b6779] text-sm font-medium">
                    Reason for Clearance <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.reason}
                    onValueChange={(value) => {
                      handleSelectChange("reason", value)
                    }}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 p-3 border rounded-md ${errors.reason ? 'border-red-500' : 'border-[#dde5f0]'}`}
                  >
                    {clearanceReasons.map((reason) => (
                      <div key={reason.id} className="flex items-center space-x-2 p-2 border rounded-md bg-white hover:border-blue-500 transition-colors">
                        <RadioGroupItem 
                          value={reason.id} 
                          id={reason.id}
                          className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-blue-400 focus:border-blue-500"
                        />
                        <Label htmlFor={reason.id} className="cursor-pointer text-[#5b6779]">{reason.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.reason && <p className="text-xs text-red-500">{errors.reason}</p>}
                </div>
                
                {/* Other Reason Input - Conditional */}
                {formData.reason === "other" && (
                  <div className="space-y-2">
                    <Label htmlFor="otherReason" className="text-[#5b6779] text-sm font-medium">
                      Specify Reason <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="otherReason"
                        value={formData.otherReason}
                        onChange={handleChange}
                        placeholder="Please specify your reason"
                        className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.otherReason ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                      />
                    </div>
                    {errors.otherReason && <p className="text-xs text-red-500">{errors.otherReason}</p>}
                  </div>
                )}
                
                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="departmentId" className="text-[#5b6779] text-sm font-medium">
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.departmentId} 
                    onValueChange={(value) => handleSelectChange("departmentId", value)}
                    disabled={loadingDepartments}
                  >
                    <SelectTrigger className={`w-full bg-white border ${errors.departmentId ? 'border-red-500' : 'border-[#dde5f0]'}`}>
                      <SelectValue placeholder={loadingDepartments ? "Loading departments..." : "Select department"} />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.departmentId && <p className="text-xs text-red-500">{errors.departmentId}</p>}
                </div>
                
                {/* Purpose */}
                <div className="space-y-2">
                  <Label htmlFor="purpose" className="text-[#5b6779] text-sm font-medium">
                    Purpose <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="purpose"
                    value={formData.purpose}
                    onChange={handleTextareaChange}
                    placeholder="State your purpose for requesting a clearance"
                    className={`w-full min-h-[100px] bg-white border ${errors.purpose ? 'border-red-500' : 'border-[#dde5f0]'}`}
                  />
                  {errors.purpose && <p className="text-xs text-red-500">{errors.purpose}</p>}
                </div>
                
                {/* Date Needed */}
                <div className="space-y-2">
                  <Label htmlFor="dateNeeded" className="text-[#5b6779] text-sm font-medium">
                    Date Needed <span className="text-red-500">*</span>
                  </Label>
                  <div className={`${errors.dateNeeded ? 'border border-red-500 rounded-lg' : ''}`}>
                    <DatePicker
                      date={formData.dateNeeded}
                      setDate={(date) => {
                        setFormData(prev => ({ ...prev, dateNeeded: date }))
                        if (errors.dateNeeded) {
                          setErrors(prev => ({ ...prev, dateNeeded: "" }))
                        }
                      }}
                    />
                  </div>
                  {errors.dateNeeded && <p className="text-xs text-red-500">{errors.dateNeeded}</p>}
                </div>
                
                {/* Additional Information */}
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo" className="text-[#5b6779] text-sm font-medium">
                    Additional Information
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleTextareaChange}
                    placeholder="Provide any additional information if necessary"
                    className="w-full min-h-[80px] bg-white border border-[#dde5f0]"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting || loadingDepartments}
              className="w-auto py-2 px-6 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb] disabled:opacity-70 flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Clearance Request"
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Clearance Records Card */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-gray-700">Clearance Records</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search records..."
                className="pl-8 text-sm h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ClearanceRequestTable 
              requests={filteredRequests} 
              loading={loadingRequests} 
              downloadPrefix="Medical_Clearance"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 