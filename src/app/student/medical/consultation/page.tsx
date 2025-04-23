"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "@/store/auth-store"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRight, Calendar as CalendarIcon, Check, Clock, InfoIcon, XCircle, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define consultation types
const consultationTypes = [
  { id: "general", label: "General Checkup" },
  { id: "specialist", label: "Specialist Referral" },
  { id: "medcert", label: "Medical Certificate" },
  { id: "followup", label: "Follow-up Visit" },
]

// Define form steps
const formSteps = [
  { id: "schedule", title: "Select Schedule" },
  { id: "details", title: "Appointment Details" },
]

export default function ConsultationPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string | null>(null)
  const [consultationType, setConsultationType] = useState<string | null>(null)
  const [reasonForVisit, setReasonForVisit] = useState<string>("")
  const [additionalNotes, setAdditionalNotes] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [availableTimeSlots, setAvailableTimeSlots] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [consultationDates, setConsultationDates] = useState<any[]>([])
  
  // Add state for user's appointments history
  const [userAppointments, setUserAppointments] = useState<any[]>([])
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true)
  
  // Add state for editing appointments
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null)
  const [editConsultationType, setEditConsultationType] = useState<string | null>(null)
  const [editReasonForVisit, setEditReasonForVisit] = useState<string>("")
  const [editAdditionalNotes, setEditAdditionalNotes] = useState<string>("")
  const [isUpdating, setIsUpdating] = useState(false)
  
  // Add state for rescheduling date and time
  const [editDate, setEditDate] = useState<Date | undefined>(undefined)
  const [editTimeSlot, setEditTimeSlot] = useState<string | null>(null)
  const [editTimeSlotId, setEditTimeSlotId] = useState<string | null>(null)
  const [editAvailableTimeSlots, setEditAvailableTimeSlots] = useState<any[]>([])
  const [isLoadingEditTimeSlots, setIsLoadingEditTimeSlots] = useState(false)
  
  // Protect this route
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth')
      return
    }
    
    // Verify this is a student
    if (user.role !== 'STUDENT') {
      router.push(user.role === 'ADMIN' ? '/admin/dashboard' : '/fs/dashboard')
    }
  }, [isAuthenticated, user, router])
  
  // Fetch available consultation dates from the API
  useEffect(() => {
    const fetchConsultationDates = async () => {
      try {
        setIsLoading(true)
        // Add authorization headers
        const response = await fetch('/api/consultation/dates', {
          headers: {
            'Authorization': `Bearer ${user?.id || ''}`,
            'x-user-id': user?.id || '',
            'x-user-role': user?.role || ''
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch consultation dates')
        }
        
        const data = await response.json()
        setConsultationDates(data.consultationDates || [])
        
        // Extract and format available dates for the calendar
        const dates = (data.consultationDates || []).map((date: any) => new Date(date.date))
        setAvailableDates(dates)
      } catch (error) {
        console.error('Error fetching consultation dates:', error)
        toast.error('Failed to load available consultation dates')
      } finally {
        setIsLoading(false)
      }
    }
    
    if (isAuthenticated && user) {
      fetchConsultationDates()
    }
  }, [isAuthenticated, user])
  
  // Add effect to fetch user's appointment history
  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        setIsLoadingAppointments(true)
        const response = await fetch('/api/consultation/appointments', {
          headers: {
            'Authorization': `Bearer ${user?.id || ''}`,
            'x-user-id': user?.id || '',
            'x-user-role': user?.role || ''
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch your appointment history')
        }
        
        const data = await response.json()
        setUserAppointments(data.appointments || [])
      } catch (error) {
        console.error('Error fetching user appointments:', error)
        toast.error('Failed to load your appointment history')
      } finally {
        setIsLoadingAppointments(false)
      }
    }
    
    if (isAuthenticated && user) {
      fetchUserAppointments()
    }
  }, [isAuthenticated, user])
  
  // Check if a date is available for consultation
  const isDateAvailable = (date: Date) => {
    if (!availableDates.length) return false
    
    return availableDates.some(availableDate => 
      availableDate.toDateString() === date.toDateString()
    )
  }
  
  // Get available time slots for the selected date
  const getAvailableTimeSlots = (date: Date) => {
    if (!date || !consultationDates.length) return []
    
    // Find the consultation date that matches the selected date
    const selectedConsultationDate = consultationDates.find((consultDate: any) => 
      new Date(consultDate.date).toDateString() === date.toDateString()
    )
    
    // Return the available time slots for that date
    return selectedConsultationDate?.timeSlots || []
  }
  
  // Update available time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const slots = getAvailableTimeSlots(selectedDate)
      setAvailableTimeSlots(slots)
      // Reset selected time slot when date changes
      setSelectedTimeSlot(null)
      setSelectedTimeSlotId(null)
    } else {
      setAvailableTimeSlots([])
    }
  }, [selectedDate, consultationDates])
  
  // Calculate progress percentage
  const progress = ((currentStep + 1) / formSteps.length) * 100
  
  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    
    if (currentStep === 0) {
      if (!selectedDate) {
        newErrors.date = "Please select a date"
      }
      if (!selectedTimeSlot) {
        newErrors.timeSlot = "Please select a time slot"
      }
    } else if (currentStep === 1) {
      if (!consultationType) {
        newErrors.consultationType = "Please select a consultation type"
      }
      if (!reasonForVisit.trim()) {
        newErrors.reasonForVisit = "Please enter your reason for visit"
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleNextStep = () => {
    if (!validateStep()) {
      toast.error("Please fill in all required fields")
      return
    }
    
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }
  
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep()) {
      toast.error("Please fill in all required fields")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Submit the appointment data to API with auth headers
      const response = await fetch('/api/consultation/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || ''}`,
          'x-user-id': user?.id || '',
          'x-user-role': user?.role || ''
        },
        body: JSON.stringify({
          timeSlotId: selectedTimeSlotId,
          consultationType,
          reasonForVisit,
          additionalNotes: additionalNotes || undefined
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to schedule appointment')
      }
      
      // Show success and redirect
      toast.success("Appointment scheduled successfully!")
      router.push('/student/dashboard')
    } catch (error: any) {
      console.error("Form submission error:", error)
      toast.error(error.message || "Failed to schedule appointment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Helper function to display status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      case 'CONFIRMED':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Confirmed</Badge>
      case 'ONGOING':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Ongoing</Badge>
      case 'COMPLETED':
        return <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">Completed</Badge>
      case 'REJECTED':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>
      case 'CANCELLED':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
  
  // Function to open the edit dialog for an appointment
  const handleEditAppointment = (appointment: any) => {
    setSelectedAppointment(appointment)
    setEditConsultationType(appointment.consultationType)
    setEditReasonForVisit(appointment.reasonForVisit)
    setEditAdditionalNotes(appointment.additionalNotes || "")
    
    // Initialize date with current appointment date
    const appointmentDate = new Date(appointment.timeSlot.consultationDate.date)
    setEditDate(appointmentDate)
    
    // Set current time slot for reference
    setEditTimeSlot(`${appointment.timeSlot.startTime} - ${appointment.timeSlot.endTime}`)
    setEditTimeSlotId(null) // We start with no new time slot selected
    
    setIsEditDialogOpen(true)
  }
  
  // Get available time slots for the selected edit date
  const getEditAvailableTimeSlots = (date: Date) => {
    if (!date || !consultationDates.length) return []
    
    // Find the consultation date that matches the selected date
    const selectedConsultationDate = consultationDates.find((consultDate: any) => 
      new Date(consultDate.date).toDateString() === date.toDateString()
    )
    
    // Return the available time slots for that date
    return selectedConsultationDate?.timeSlots?.filter((slot: any) => slot.isAvailable) || []
  }

  // Update available time slots when edit date changes
  useEffect(() => {
    if (editDate) {
      setIsLoadingEditTimeSlots(true)
      const slots = getEditAvailableTimeSlots(editDate)
      
      setEditAvailableTimeSlots(slots)
      setIsLoadingEditTimeSlots(false)
      
      // Reset selected time slot when date changes
      if (selectedAppointment && 
          new Date(selectedAppointment.timeSlot.consultationDate.date).toDateString() !== editDate.toDateString()) {
        setEditTimeSlot(null)
        setEditTimeSlotId(null)
      }
    } else {
      setEditAvailableTimeSlots([])
    }
  }, [editDate, consultationDates, selectedAppointment])
  
  // Function to update an appointment
  const handleUpdateAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedAppointment) return
    
    // Validate edit form
    const editErrors: Record<string, string> = {}
    
    if (!editConsultationType) {
      editErrors.consultationType = "Please select a consultation type"
    }
    if (!editReasonForVisit.trim()) {
      editErrors.reasonForVisit = "Please enter your reason for visit"
    }
    
    // Only require new time slot if date was changed
    if (editDate && 
        (new Date(selectedAppointment.timeSlot.consultationDate.date).toDateString() !== editDate.toDateString()) && 
        !editTimeSlotId) {
      editErrors.timeSlot = "Please select a new time slot for your rescheduled appointment"
    }
    
    if (Object.keys(editErrors).length > 0) {
      setErrors(editErrors)
      toast.error("Please fill in all required fields")
      return
    }
    
    setIsUpdating(true)
    
    try {
      // Prepare request body
      const requestBody: any = {
        consultationType: editConsultationType,
        reasonForVisit: editReasonForVisit,
        additionalNotes: editAdditionalNotes || undefined
      }
      
      // Add timeSlotId if rescheduling
      if (editTimeSlotId) {
        requestBody.timeSlotId = editTimeSlotId
      }
      
      // Call API to update the appointment
      const response = await fetch(`/api/consultation/appointments/${selectedAppointment.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id || ''}`,
          'x-user-id': user?.id || '',
          'x-user-role': user?.role || ''
        },
        body: JSON.stringify(requestBody)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update appointment')
      }
      
      const data = await response.json()
      
      // Refresh all appointments data to get fresh data
      const appointmentsResponse = await fetch('/api/consultation/appointments', {
        headers: {
          'Authorization': `Bearer ${user?.id || ''}`,
          'x-user-id': user?.id || '',
          'x-user-role': user?.role || ''
        }
      })
      
      if (appointmentsResponse.ok) {
        const appointmentsData = await appointmentsResponse.json()
        setUserAppointments(appointmentsData.appointments || [])
      }
      
      // Show success message and close dialog
      toast.success("Appointment updated successfully!")
      setIsEditDialogOpen(false)
      
    } catch (error: any) {
      console.error("Update appointment error:", error)
      toast.error(error.message || "Failed to update appointment. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }
  
  // Function to cancel an appointment
  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      // Call API to cancel the appointment
      const response = await fetch(`/api/consultation/appointments/${appointmentId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user?.id || ''}`,
          'x-user-id': user?.id || '',
          'x-user-role': user?.role || ''
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to cancel appointment')
      }
      
      // Update local state
      const updatedAppointments = userAppointments.map(appt => 
        appt.id === appointmentId 
          ? { ...appt, status: 'CANCELLED' }
          : appt
      )
      
      setUserAppointments(updatedAppointments)
      toast.success("Appointment cancelled successfully!")
      
    } catch (error: any) {
      console.error("Cancel appointment error:", error)
      toast.error(error.message || "Failed to cancel appointment. Please try again.")
    }
  }
  
  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Custom Page Header with Breadcrumb */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">Schedule Consultation</h1>
          <p className="text-gray-500">
            Book an appointment with our healthcare providers
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/student/medical" className="hover:text-blue-600">
            Medical
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Consultation</span>
        </nav>
      </div>

      {/* Tabs for New Appointment and History */}
      <Tabs defaultValue="schedule" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="schedule">Book New Consultation</TabsTrigger>
          <TabsTrigger value="history">My Consultation History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule">
          {/* Multi-step Form */}
          <Card className="bg-white shadow-sm mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-700">{formSteps[currentStep].title}</CardTitle>
                <span className="text-sm text-gray-500">
                  Step {currentStep + 1} of {formSteps.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Step 1: Select Schedule */}
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Calendar Column */}
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-[#5b6779] text-sm font-medium">Select Date</Label>
                      <div className={`${errors.date ? 'border border-red-500 rounded-lg' : ''}`}>
                        {isLoading ? (
                          <div className="flex justify-center items-center h-[400px] border rounded-md">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                          </div>
                        ) : (
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              setSelectedDate(date)
                              if (errors.date) {
                                setErrors(prev => ({ ...prev, date: "" }))
                              }
                            }}
                            className="w-full h-full border rounded-md p-3"
                            modifiers={{
                              available: isDateAvailable
                            }}
                            modifiersClassNames={{
                              available: "bg-blue-100 text-blue-600 hover:bg-blue-200"
                            }}
                            disabled={(date) => !isDateAvailable(date) || date < new Date()}
                          />
                        )}
                      </div>
                      {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
                    </div>
                    
                    {/* Time Slots Column */}
                    <div className="space-y-2">
                      <Label htmlFor="timeSlot" className="text-[#5b6779] text-sm font-medium">Select Time Slot</Label>
                      {isLoading ? (
                        <div className="flex justify-center items-center h-[400px] border rounded-md">
                          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                        </div>
                      ) : selectedDate ? (
                        availableTimeSlots.length > 0 ? (
                          <div className={`grid grid-cols-1 gap-2 p-2 max-h-[400px] overflow-y-auto border rounded-md ${errors.timeSlot ? 'border-red-500' : 'border-[#dde5f0]'}`}>
                            {availableTimeSlots.map((slot) => (
                              <div
                                key={slot.id}
                                className={cn(
                                  "p-3 border rounded-md cursor-pointer hover:border-blue-500 transition-colors",
                                  selectedTimeSlotId === slot.id 
                                    ? "bg-blue-100 border-blue-500 text-blue-600" 
                                    : "bg-white border-[#dde5f0]"
                                )}
                                onClick={() => {
                                  setSelectedTimeSlot(`${slot.startTime} - ${slot.endTime}`)
                                  setSelectedTimeSlotId(slot.id)
                                  if (errors.timeSlot) {
                                    setErrors(prev => ({ ...prev, timeSlot: "" }))
                                  }
                                }}
                              >
                                {`${slot.startTime} - ${slot.endTime}`}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-8 text-gray-500 border border-dashed rounded-md h-[400px] flex items-center justify-center">
                            No available time slots for the selected date.
                          </div>
                        )
                      ) : (
                        <div className="text-center p-8 text-gray-500 border border-dashed rounded-md h-[400px] flex items-center justify-center">
                          Please select a date first to view available time slots.
                        </div>
                      )}
                      {errors.timeSlot && <p className="text-xs text-red-500">{errors.timeSlot}</p>}
                    </div>
                  </div>
                )}

                {/* Step 2: Appointment Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    {/* Consultation Type */}
                    <div className="space-y-2">
                      <Label htmlFor="consultationType" className="text-[#5b6779] text-sm font-medium">
                        Consultation Type <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={consultationType || ""}
                        onValueChange={(value) => {
                          setConsultationType(value)
                          if (errors.consultationType) {
                            setErrors(prev => ({ ...prev, consultationType: "" }))
                          }
                        }}
                        className={`grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 p-3 border rounded-md ${errors.consultationType ? 'border-red-500' : 'border-[#dde5f0]'}`}
                      >
                        {consultationTypes.map((type) => (
                          <div key={type.id} className="flex items-center space-x-2 p-2 border rounded-md bg-white hover:border-blue-500 transition-colors">
                            <RadioGroupItem 
                              value={type.id} 
                              id={type.id}
                              className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-blue-400 focus:border-blue-500"
                            />
                            <Label htmlFor={type.id} className="cursor-pointer text-[#5b6779]">{type.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                      {errors.consultationType && <p className="text-xs text-red-500">{errors.consultationType}</p>}
                    </div>
                    
                    {/* Reason for Visit */}
                    <div className="space-y-2">
                      <Label htmlFor="reasonForVisit" className="text-[#5b6779] text-sm font-medium">
                        Reason for Visit <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="reasonForVisit"
                        value={reasonForVisit}
                        onChange={(e) => {
                          setReasonForVisit(e.target.value)
                          if (errors.reasonForVisit) {
                            setErrors(prev => ({ ...prev, reasonForVisit: "" }))
                          }
                        }}
                        placeholder="Please describe the reason for your consultation"
                        className={`min-h-[120px] bg-white text-[#5b6779] text-sm rounded-lg border ${errors.reasonForVisit ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                        rows={4}
                      />
                      {errors.reasonForVisit && <p className="text-xs text-red-500">{errors.reasonForVisit}</p>}
                    </div>
                    
                    {/* Additional Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="additionalNotes" className="text-[#5b6779] text-sm font-medium">
                        Additional Notes
                      </Label>
                      <Textarea
                        id="additionalNotes"
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        placeholder="Any additional information the healthcare provider should know"
                        className="min-h-[120px] bg-white text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {currentStep > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="text-gray-600"
                >
                  Previous: {formSteps[currentStep - 1].title}
                </Button>
              ) : (
                <div></div> // Empty div for spacing when there's no back button
              )}
              
              {currentStep < formSteps.length - 1 ? (
                <Button 
                  type="button" 
                  onClick={handleNextStep}
                  className="bg-[#166cbb] text-white hover:bg-[#1259a1] transition-colors"
                >
                  Next: {formSteps[currentStep + 1].title}
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  onClick={handleSubmit}
                  className="bg-[#166cbb] text-white hover:bg-[#1259a1] transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="mr-1 h-4 w-4" /> Schedule Appointment
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card className="bg-white shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                My Consultation Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingAppointments ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              ) : userAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <InfoIcon className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                  <h3 className="text-gray-500 font-medium">No appointments yet</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    You haven't scheduled any consultations. Use the "Book New Consultation" tab to schedule one.
                  </p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>
                            {format(new Date(appointment.timeSlot.consultationDate.date), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell>
                            {appointment.timeSlot.startTime} - {appointment.timeSlot.endTime}
                          </TableCell>
                          <TableCell>
                            {appointment.consultationType}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {appointment.reasonForVisit}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(appointment.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            {appointment.status === 'SCHEDULED' && (
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditAppointment(appointment)}
                                  className="h-8 px-2 text-blue-600"
                                >
                                  <Pencil className="h-3.5 w-3.5 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCancelAppointment(appointment.id)}
                                  className="h-8 px-2 text-red-500 border-red-200"
                                >
                                  <XCircle className="h-3.5 w-3.5 mr-1" />
                                  Cancel
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Edit Appointment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 z-10 bg-white pb-2">
            <DialogTitle>Edit Consultation Appointment</DialogTitle>
            <DialogDescription>
              Update the details or reschedule your upcoming appointment.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <form onSubmit={handleUpdateAppointment}>
              <div className="grid gap-6 py-4">
                {/* Current Appointment Details */}
                <div className="bg-gray-50 p-3 rounded-md mb-2">
                  <p className="text-sm text-gray-500 mb-1">Current Appointment:</p>
                  <p className="font-medium">
                    {format(new Date(selectedAppointment.timeSlot.consultationDate.date), 'MMMM d, yyyy')} at {' '}
                    {selectedAppointment.timeSlot.startTime} - {selectedAppointment.timeSlot.endTime}
                  </p>
                </div>
                
                {/* Date and Time Selection */}
                <div>
                  <Label htmlFor="appointmentDate" className="text-sm font-medium mb-1 block">
                    Reschedule Date and Time <span className="text-gray-400">(Optional)</span>
                  </Label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {/* Calendar Column */}
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-[#5b6779] text-xs">Select New Date</Label>
                      <div className={`${errors.date ? 'border border-red-500 rounded-lg' : ''}`}>
                        {isLoading ? (
                          <div className="flex justify-center items-center h-[300px] border rounded-md">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          </div>
                        ) : (
                          <Calendar
                            mode="single"
                            selected={editDate}
                            onSelect={(date) => {
                              setEditDate(date)
                              if (errors.date) {
                                setErrors(prev => ({ ...prev, date: "" }))
                              }
                            }}
                            className="border rounded-md p-2"
                            modifiers={{
                              available: isDateAvailable
                            }}
                            modifiersClassNames={{
                              available: "bg-blue-100 text-blue-600 hover:bg-blue-200"
                            }}
                            disabled={(date) => !isDateAvailable(date) || date < new Date()}
                          />
                        )}
                      </div>
                      {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
                    </div>
                    
                    {/* Time Slots Column */}
                    <div className="space-y-2">
                      <Label htmlFor="timeSlot" className="text-[#5b6779] text-xs">Select New Time Slot</Label>
                      {isLoadingEditTimeSlots ? (
                        <div className="flex justify-center items-center h-[300px] border rounded-md">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                      ) : editDate ? (
                        editAvailableTimeSlots.length > 0 ? (
                          <div className={`grid grid-cols-1 gap-2 p-2 h-[300px] overflow-y-auto border rounded-md ${errors.timeSlot ? 'border-red-500' : 'border-[#dde5f0]'}`}>
                            {editAvailableTimeSlots.map((slot) => (
                              <div
                                key={slot.id}
                                className={cn(
                                  "p-3 border rounded-md cursor-pointer hover:border-blue-500 transition-colors",
                                  editTimeSlotId === slot.id 
                                    ? "bg-blue-100 border-blue-500 text-blue-600" 
                                    : "bg-white border-[#dde5f0]"
                                )}
                                onClick={() => {
                                  setEditTimeSlot(`${slot.startTime} - ${slot.endTime}`)
                                  setEditTimeSlotId(slot.id)
                                  if (errors.timeSlot) {
                                    setErrors(prev => ({ ...prev, timeSlot: "" }))
                                  }
                                }}
                              >
                                {`${slot.startTime} - ${slot.endTime}`}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-8 text-gray-500 border border-dashed rounded-md h-[300px] flex items-center justify-center">
                            No available time slots for the selected date.
                          </div>
                        )
                      ) : (
                        <div className="text-center p-8 text-gray-500 border border-dashed rounded-md h-[300px] flex items-center justify-center">
                          Please select a date to view available time slots.
                        </div>
                      )}
                      {errors.timeSlot && <p className="text-xs text-red-500">{errors.timeSlot}</p>}
                    </div>
                  </div>
                </div>
                
                {/* Consultation Type */}
                <div className="space-y-2">
                  <Label htmlFor="editConsultationType" className="text-[#5b6779] text-sm font-medium">
                    Consultation Type <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={editConsultationType || ""}
                    onValueChange={(value) => {
                      setEditConsultationType(value)
                      if (errors.consultationType) {
                        setErrors(prev => ({ ...prev, consultationType: "" }))
                      }
                    }}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-2 mt-1 p-2 border rounded-md ${errors.consultationType ? 'border-red-500' : 'border-[#dde5f0]'}`}
                  >
                    {consultationTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2 p-2 border rounded-md bg-white hover:border-blue-500 transition-colors">
                        <RadioGroupItem 
                          value={type.id} 
                          id={`edit-${type.id}`}
                          className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-blue-400 focus:border-blue-500"
                        />
                        <Label htmlFor={`edit-${type.id}`} className="cursor-pointer text-[#5b6779]">{type.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.consultationType && <p className="text-xs text-red-500">{errors.consultationType}</p>}
                </div>
                
                {/* Reason for Visit */}
                <div className="space-y-2">
                  <Label htmlFor="editReasonForVisit" className="text-[#5b6779] text-sm font-medium">
                    Reason for Visit <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="editReasonForVisit"
                    value={editReasonForVisit}
                    onChange={(e) => {
                      setEditReasonForVisit(e.target.value)
                      if (errors.reasonForVisit) {
                        setErrors(prev => ({ ...prev, reasonForVisit: "" }))
                      }
                    }}
                    placeholder="Please describe the reason for your consultation"
                    className={`min-h-[80px] bg-white text-[#5b6779] text-sm rounded-lg border ${errors.reasonForVisit ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                    rows={2}
                  />
                  {errors.reasonForVisit && <p className="text-xs text-red-500">{errors.reasonForVisit}</p>}
                </div>
                
                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="editAdditionalNotes" className="text-[#5b6779] text-sm font-medium">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="editAdditionalNotes"
                    value={editAdditionalNotes}
                    onChange={(e) => setEditAdditionalNotes(e.target.value)}
                    placeholder="Any additional information the healthcare provider should know"
                    className="min-h-[80px] bg-white text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                    rows={2}
                  />
                </div>
              </div>
              
              <DialogFooter className="mt-6 sticky bottom-0 pt-2 pb-2 bg-white z-10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isUpdating ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    "Update Appointment"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 