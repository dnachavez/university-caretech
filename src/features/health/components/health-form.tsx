"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Check, User, MapPin, Phone, Upload, Trash2, CreditCard } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { SignaturePad } from "@/components/ui/signature-pad"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth-store"

// Check if we're running in production (Vercel) or development
const isProduction = process.env.NODE_ENV === 'production'

// Define form steps
const formSteps = [
  { id: "personal", title: "Personal Information" },
  { id: "medical", title: "Medical History" },
  { id: "certification", title: "Certification" },
]

interface FormData {
  lastName: string
  firstName: string
  middleInitial: string
  idNumber: string
  birthdate: Date | null
  gender: string
  birthplace: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  departmentId: string
  yearLevel: string
  guardianName: string
  guardianContact: string
  emergencyContact: string
  relationship: string
  emergencyNumber: string
  bloodType: string
  signature: string | null
  certifyInfo: boolean
  dateIssued: Date | null
  pastIllnesses: string
  hospitalization: string
  medications: string
  allergies: boolean
  immunized: boolean
  communicableDisease: boolean
  asthmatic: boolean
  chronicIllness: boolean
  hiking: boolean
  dancing: boolean
  swimming: boolean
  basketball: boolean
  ballgames: boolean
  jogging: boolean
  football: boolean
  badminton: boolean
  calisthenics: boolean
  wallclimbing: boolean
  notFitActivities: string
  medicationPermission: boolean
}

interface HealthFormProps {
  baseUrl?: string;
  userType?: string;
  isAdmin?: boolean;
}

export function HealthForm({ baseUrl = "/student", userType = "student", isAdmin = false }: HealthFormProps) {
  const { user, isAuthenticated } = useAuthStore()
  const userId = user?.id
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    lastName: "",
    firstName: "",
    middleInitial: "",
    idNumber: "",
    birthdate: null,
    gender: "",
    birthplace: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    departmentId: "",
    yearLevel: "",
    guardianName: "",
    guardianContact: "",
    emergencyContact: "",
    relationship: "",
    emergencyNumber: "",
    bloodType: "",
    signature: null,
    certifyInfo: false,
    dateIssued: new Date(),
    pastIllnesses: "",
    hospitalization: "",
    medications: "",
    allergies: false,
    immunized: false,
    communicableDisease: false,
    asthmatic: false,
    chronicIllness: false,
    hiking: false,
    dancing: false,
    swimming: false,
    basketball: false,
    ballgames: false,
    jogging: false,
    football: false,
    badminton: false,
    calisthenics: false,
    wallclimbing: false,
    notFitActivities: "",
    medicationPermission: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedSignature, setUploadedSignature] = useState<string | null>(null)
  const [isUploadingSignature, setIsUploadingSignature] = useState(false)
  
  const [departments, setDepartments] = useState([])
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false)
  
  // Fetch existing health form data if available
  useEffect(() => {
    if (userId) {
      fetchHealthFormData()
    }
  }, [userId])

  // Fetch departments
  useEffect(() => {
    fetchDepartments()
  }, [])

  // Add useEffect to display uploaded signature in canvas whenever it changes
  useEffect(() => {
    if (uploadedSignature && !formData.signature) {
      // If we have an uploaded signature path but no current signature data,
      // load the image to set as current signature
      const img = new Image();
      img.onload = () => {
        // Create a temporary canvas to convert the image to data URL
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        const ctx = tempCanvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          // Convert to data URL and set as current signature
          const dataUrl = tempCanvas.toDataURL('image/png');
          setFormData(prev => ({ ...prev, signature: dataUrl }));
        }
      };
      img.src = uploadedSignature;
    }
  }, [uploadedSignature]);

  const fetchHealthFormData = async () => {
    try {
      setIsLoading(true)
      // Use the appropriate API endpoint based on userType
      const endpoint = userType === 'student' ? '/api/student/health-form' : '/api/fs/health-form';
      const response = await fetch(`${endpoint}?userId=${userId}`)
      const data = await response.json()

      if (data.success && data.exists) {
        const formData = data.healthForm
        
        // Convert date strings to Date objects
        const birthdate = formData.birthdate ? new Date(formData.birthdate) : null
        const dateIssued = formData.dateSigned ? new Date(formData.dateSigned) : null
        
        // Set signature path from database
        setUploadedSignature(formData.signaturePath)
        
        // Update form data with retrieved values
        setFormData({
          lastName: formData.lastName || "",
          firstName: formData.firstName || "",
          middleInitial: formData.middleInitial || "",
          idNumber: user?.idNumber || "",
          birthdate,
          gender: formData.gender || "",
          birthplace: formData.birthPlace || "",
          addressLine1: formData.addressLine1 || "",
          addressLine2: formData.addressLine2 || "",
          city: formData.city || "",
          state: formData.state || "",
          postalCode: formData.postalCode || "",
          departmentId: formData.departmentId || "",
          yearLevel: formData.yearLevel || "",
          guardianName: formData.guardianName || "",
          guardianContact: formData.guardianContact || "",
          emergencyContact: formData.emergencyContact || "",
          relationship: formData.relationship || "",
          emergencyNumber: formData.emergencyNumber || "",
          bloodType: formData.bloodType || "",
          signature: null, // We'll load this separately through the useEffect
          certifyInfo: true,
          dateIssued,
          pastIllnesses: formData.pastIllnesses || "",
          hospitalization: formData.hospitalization || "",
          medications: formData.medications || "",
          allergies: formData.allergies || false,
          immunized: formData.immunized || false,
          communicableDisease: formData.communicableDisease || false,
          asthmatic: formData.asthmatic || false,
          chronicIllness: formData.chronicIllness || false,
          hiking: formData.hiking || false,
          dancing: formData.dancing || false,
          swimming: formData.swimming || false,
          basketball: formData.basketball || false,
          ballgames: formData.ballgames || false,
          jogging: formData.jogging || false,
          football: formData.football || false,
          badminton: formData.badminton || false,
          calisthenics: formData.calisthenics || false,
          wallclimbing: formData.wallclimbing || false,
          notFitActivities: formData.notFitActivities || "",
          medicationPermission: formData.medicationPermission || false
        })
      }
    } catch (error) {
      console.error("Error fetching health form:", error)
      toast.error("Failed to load your health form data")
    } finally {
      setIsLoading(false)
    }
  }
  
  const fetchDepartments = async () => {
    try {
      setIsLoadingDepartments(true)
      const response = await fetch('/api/admin/departments')
      const data = await response.json()
      
      if (data.departments) {
        setDepartments(data.departments.filter((dept: any) => dept.status === "ACTIVE"))
      }
    } catch (error) {
      console.error("Error fetching departments:", error)
    } finally {
      setIsLoadingDepartments(false)
    }
  }

  // Function to load signature from path
  const loadSignatureFromPath = (signaturePath: string) => {
    const img = new Image()
    img.onload = () => {
      // This will be handled by the SignaturePad component itself
      // We just need to set the signature path for displaying
    }
    img.src = signaturePath
  }

  // Calculate progress percentage
  const progress = ((currentStep + 1) / formSteps.length) * 100

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

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [id]: checked
    }))
    
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }))
    }
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    
    if (currentStep === 0) {
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (isAdmin && !formData.idNumber.trim()) newErrors.idNumber = "ID number is required"
      if (!formData.birthdate) newErrors.birthdate = "Birthdate is required"
      if (!formData.gender) newErrors.gender = "Gender is required"
      if (!formData.birthplace.trim()) newErrors.birthplace = "Birth place is required"
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Address line 1 is required"
      if (!formData.city.trim()) newErrors.city = "City is required"
      if (!formData.state.trim()) newErrors.state = "State/Province is required"
      if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required"
      if (userType === "student" && !formData.departmentId) newErrors.departmentId = "Department is required"
      if (userType === "student" && !formData.yearLevel) newErrors.yearLevel = "Year level is required"
      if (!formData.guardianName.trim()) newErrors.guardianName = "Parent/Guardian name is required"
      if (!formData.guardianContact.trim()) newErrors.guardianContact = "Contact number is required"
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Emergency contact person is required"
      if (!formData.relationship.trim()) newErrors.relationship = "Relationship is required"
      if (!formData.emergencyNumber.trim()) newErrors.emergencyNumber = "Contact number is required"
    } else if (currentStep === 1) {
      if (!formData.bloodType) newErrors.bloodType = "Blood type is required"
    } else if (currentStep === 2) {
      if (!formData.signature && !uploadedSignature) newErrors.signature = "Signature is required"
      if (!formData.certifyInfo) newErrors.certifyInfo = "You must certify that the information provided is true and accurate"
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
  
  // Handle uploading signature to server
  const handleSignatureUpload = async (signatureDataUrl: string) => {
    if (!userId) {
      toast.error("You must be logged in to upload a signature")
      return
    }
    
    setIsUploadingSignature(true)
    
    try {
      // Use the appropriate API endpoint based on userType
      const endpoint = userType === 'student' ? '/api/student/signature-upload' : '/api/fs/signature-upload';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          signature: signatureDataUrl,
          userId
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }
      
      // Save the signature path
      setUploadedSignature(data.signaturePath)
      
      // In production, we're not actually writing to the filesystem,
      // but we still need to track that the signature was "uploaded"
      if (isProduction) {
        toast.success("Signature registered")
      } else {
        toast.success("Signature uploaded successfully")
      }
      
      return signatureDataUrl // Return the data URL directly instead of the path
    } catch (error) {
      console.error("Signature upload error:", error)
      
      if (isProduction) {
        // In production, we might get file system errors but we can still proceed
        toast.warning("Signature registered locally only")
        // We'll still count it as "uploaded" for form purposes
        return signatureDataUrl
      } else {
        toast.error("Failed to upload signature")
        return null
      }
    } finally {
      setIsUploadingSignature(false)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep()) {
      toast.error("Please fill in all required fields")
      return
    }
    
    if (!userId) {
      toast.error("You must be logged in to submit the form")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // For Vercel deployment, we'll use the signature data URL directly
      let finalSignature = formData.signature
      
      // If we have no signature, show an error
      if (!finalSignature) {
        toast.error("Signature is required")
        setIsSubmitting(false)
        return
      }
      
      // We'll create a unique signature path for reference
      const uniqueId = new Date().getTime().toString()
      const signaturePath = `/signatures/${userType}-${userId}-${uniqueId}.png`
      
      // Send form data to API - use the appropriate endpoint based on userType
      const endpoint = userType === 'student' ? '/api/student/health-form' : '/api/fs/health-form';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          lastName: formData.lastName,
          firstName: formData.firstName,
          middleInitial: formData.middleInitial,
          birthdate: formData.birthdate,
          gender: formData.gender,
          birthPlace: formData.birthplace,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2 || "",
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          departmentId: formData.departmentId,
          yearLevel: userType === 'student' ? formData.yearLevel : undefined,
          guardianName: formData.guardianName,
          guardianContact: formData.guardianContact,
          emergencyContact: formData.emergencyContact,
          relationship: formData.relationship,
          emergencyNumber: formData.emergencyNumber,
          bloodType: formData.bloodType,
          pastIllnesses: formData.pastIllnesses,
          hospitalization: formData.hospitalization,
          allergies: formData.allergies,
          immunized: formData.immunized,
          communicableDisease: formData.communicableDisease,
          asthmatic: formData.asthmatic,
          chronicIllness: formData.chronicIllness,
          hiking: formData.hiking,
          dancing: formData.dancing,
          swimming: formData.swimming,
          basketball: formData.basketball,
          ballgames: formData.ballgames,
          jogging: formData.jogging,
          football: formData.football,
          badminton: formData.badminton,
          calisthenics: formData.calisthenics,
          wallclimbing: formData.wallclimbing,
          notFitActivities: formData.notFitActivities,
          medicationPermission: formData.medicationPermission,
          signature: finalSignature,
          signaturePath: signaturePath
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Submission failed")
      }
      
      toast.success("Health form submitted successfully!")
      
      // Redirect to dashboard or appropriate page
      // window.location.href = '/student/dashboard'
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("Failed to submit health form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Update the title based on userType
  const formTitle = userType === 'student' ? 'Student Health Form' : 'Faculty/Staff Health Form';
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">{formTitle}</h1>
          <p className="text-gray-500">
            Please complete all sections of this form to provide important health information
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href={`${baseUrl}/dashboard`} className="hover:text-blue-600">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href={`${baseUrl}/forms`} className="hover:text-blue-600">
            My Forms
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">New Form</span>
        </nav>
      </div>

      <Card className="bg-white shadow-sm">
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
            {/* Step 1: Personal Information */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[#5b6779] text-sm font-medium">Last Name</Label>
                    <div className="relative">
                      <Input 
                        id="lastName" 
                        placeholder="Enter last name" 
                        required 
                        className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                    {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[#5b6779] text-sm font-medium">First Name</Label>
                    <div className="relative">
                      <Input 
                        id="firstName" 
                        placeholder="Enter first name" 
                        required 
                        className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                    {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleInitial" className="text-[#5b6779] text-sm font-medium">Middle Initial</Label>
                    <div className="relative">
                      <Input 
                        id="middleInitial" 
                        placeholder="M.I." 
                        maxLength={2} 
                        className="w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                        value={formData.middleInitial}
                        onChange={handleChange}
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber" className="text-[#5b6779] text-sm font-medium">ID Number</Label>
                  <div className="relative">
                    <Input 
                      id="idNumber" 
                      placeholder="ID Number" 
                      required 
                      className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.idNumber ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                      value={formData.idNumber}
                      onChange={handleChange}
                      disabled={!isAdmin}
                    />
                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                  </div>
                  {errors.idNumber && <p className="text-xs text-red-500">{errors.idNumber}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthdate" className="text-[#5b6779] text-sm font-medium">Birthdate</Label>
                    <div className={`${errors.birthdate ? 'border border-red-500 rounded-lg' : ''}`}>
                      <DatePicker
                        date={formData.birthdate || new Date()}
                        setDate={(date) => {
                          setFormData(prev => ({ ...prev, birthdate: date }))
                          if (errors.birthdate) {
                            setErrors(prev => ({ ...prev, birthdate: "" }))
                          }
                        }}
                      />
                    </div>
                    {errors.birthdate && <p className="text-xs text-red-500">{errors.birthdate}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-[#5b6779] text-sm font-medium">Gender</Label>
                    <Select 
                      value={formData.gender} 
                      onValueChange={(value) => handleSelectChange("gender", value)}
                    >
                      <SelectTrigger className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.gender ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthplace" className="text-[#5b6779] text-sm font-medium">Birth Place</Label>
                    <div className="relative">
                      <Input 
                        id="birthplace" 
                        placeholder="Enter birth place" 
                        required 
                        className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.birthplace ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                        value={formData.birthplace}
                        onChange={handleChange}
                      />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                    {errors.birthplace && <p className="text-xs text-red-500">{errors.birthplace}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1" className="text-[#5b6779] text-sm font-medium">Address Line 1</Label>
                    <div className="relative">
                      <Input 
                        id="addressLine1" 
                        placeholder="Street address" 
                        required 
                        className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.addressLine1 ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                        value={formData.addressLine1}
                        onChange={handleChange}
                      />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                    {errors.addressLine1 && <p className="text-xs text-red-500">{errors.addressLine1}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressLine2" className="text-[#5b6779] text-sm font-medium">Address Line 2</Label>
                    <div className="relative">
                      <Input 
                        id="addressLine2" 
                        placeholder="Apt, suite, unit, etc. (optional)" 
                        className="w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                        value={formData.addressLine2}
                        onChange={handleChange}
                      />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-[#5b6779] text-sm font-medium">City</Label>
                    <div className="relative">
                      <Input 
                        id="city" 
                        placeholder="Enter city" 
                        required 
                        className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.city ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                        value={formData.city}
                        onChange={handleChange}
                      />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                    {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-[#5b6779] text-sm font-medium">State/Province</Label>
                    <div className="relative">
                      <Input 
                        id="state" 
                        placeholder="Enter state/province" 
                        required 
                        className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.state ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                        value={formData.state}
                        onChange={handleChange}
                      />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                    {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-[#5b6779] text-sm font-medium">Postal Code</Label>
                    <div className="relative">
                      <Input 
                        id="postalCode" 
                        placeholder="Enter postal code" 
                        required 
                        className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.postalCode ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                        value={formData.postalCode}
                        onChange={handleChange}
                      />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                    {errors.postalCode && <p className="text-xs text-red-500">{errors.postalCode}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guardianName" className="text-[#5b6779] text-sm font-medium">Parent/Guardian Name</Label>
                    <div className="relative">
                      <Input 
                        id="guardianName" 
                        placeholder="Enter parent/guardian name" 
                        required 
                        className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.guardianName ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                        value={formData.guardianName}
                        onChange={handleChange}
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                    {errors.guardianName && <p className="text-xs text-red-500">{errors.guardianName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianContact" className="text-[#5b6779] text-sm font-medium">Contact Number</Label>
                    <div className="relative">
                      <Input 
                        id="guardianContact" 
                        placeholder="Enter contact number" 
                        required 
                        type="tel" 
                        className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.guardianContact ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                        value={formData.guardianContact}
                        onChange={handleChange}
                      />
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                    {errors.guardianContact && <p className="text-xs text-red-500">{errors.guardianContact}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact" className="text-[#5b6779] text-sm font-medium">Emergency Contact Person</Label>
                    <div className="relative">
                      <Input 
                        id="emergencyContact" 
                        placeholder="Enter emergency contact name" 
                        required 
                        className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.emergencyContact ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                        value={formData.emergencyContact}
                        onChange={handleChange}
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                    {errors.emergencyContact && <p className="text-xs text-red-500">{errors.emergencyContact}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship" className="text-[#5b6779] text-sm font-medium">Relationship</Label>
                    <div className="relative">
                      <Input 
                        id="relationship" 
                        placeholder="Enter relationship" 
                        required 
                        className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.relationship ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                        value={formData.relationship}
                        onChange={handleChange}
                      />
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                    {errors.relationship && <p className="text-xs text-red-500">{errors.relationship}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyNumber" className="text-[#5b6779] text-sm font-medium">Contact Number</Label>
                    <div className="relative">
                      <Input 
                        id="emergencyNumber" 
                        placeholder="Enter contact number" 
                        required 
                        type="tel" 
                        className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.emergencyNumber ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                        value={formData.emergencyNumber}
                        onChange={handleChange}
                      />
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
                    </div>
                    {errors.emergencyNumber && <p className="text-xs text-red-500">{errors.emergencyNumber}</p>}
                  </div>
                </div>

                {/* Department and Year Level fields for students */}
                {userType === "student" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="departmentId" className="text-[#5b6779] text-sm font-medium">Department</Label>
                      <Select 
                        value={formData.departmentId} 
                        onValueChange={(value) => handleSelectChange("departmentId", value)}
                      >
                        <SelectTrigger className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.departmentId ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept: any) => (
                            <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.departmentId && <p className="text-xs text-red-500">{errors.departmentId}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="yearLevel" className="text-[#5b6779] text-sm font-medium">Year Level</Label>
                      <Select 
                        value={formData.yearLevel} 
                        onValueChange={(value) => handleSelectChange("yearLevel", value)}
                      >
                        <SelectTrigger className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.yearLevel ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}>
                          <SelectValue placeholder="Select year level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st Year">1st Year</SelectItem>
                          <SelectItem value="2nd Year">2nd Year</SelectItem>
                          <SelectItem value="3rd Year">3rd Year</SelectItem>
                          <SelectItem value="4th Year">4th Year</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.yearLevel && <p className="text-xs text-red-500">{errors.yearLevel}</p>}
                    </div>
                  </div>
                )}
                
                {/* Department field for faculty/staff */}
                {userType !== "student" && (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="departmentId" className="text-[#5b6779] text-sm font-medium">Department</Label>
                      <Select 
                        value={formData.departmentId} 
                        onValueChange={(value) => handleSelectChange("departmentId", value)}
                      >
                        <SelectTrigger className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.departmentId ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept: any) => (
                            <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Medical History */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bloodType" className="text-[#5b6779] text-sm font-medium">Blood Type</Label>
                    <Select 
                      value={formData.bloodType} 
                      onValueChange={(value) => handleSelectChange("bloodType", value)}
                    >
                      <SelectTrigger className={`w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border ${errors.bloodType ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.bloodType && <p className="text-xs text-red-500">{errors.bloodType}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pastIllnesses" className="text-[#5b6779] text-sm font-medium">Past Illnesses</Label>
                    <Textarea 
                      id="pastIllnesses" 
                      placeholder="List any past illnesses" 
                      className="min-h-[100px] bg-white text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                      value={formData.pastIllnesses}
                      onChange={handleTextareaChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospitalization" className="text-[#5b6779] text-sm font-medium">Previous Hospitalization/Operations</Label>
                    <Textarea 
                      id="hospitalization" 
                      placeholder="List any previous hospitalizations" 
                      className="min-h-[100px] bg-white text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                      value={formData.hospitalization}
                      onChange={handleTextareaChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medications" className="text-[#5b6779] text-sm font-medium">Current Medications</Label>
                    <Textarea 
                      id="medications" 
                      placeholder="List any current medications" 
                      className="min-h-[100px] bg-white text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                      value={formData.medications}
                      onChange={handleTextareaChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="allergies" 
                        checked={formData.allergies}
                        onCheckedChange={(checked) => handleCheckboxChange("allergies", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="allergies" className="leading-tight text-[#5b6779]">
                        Do you have allergies?
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="immunized" 
                        checked={formData.immunized}
                        onCheckedChange={(checked) => handleCheckboxChange("immunized", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="immunized" className="leading-tight text-[#5b6779]">
                        Are you immunized (including booster shots)?
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="communicableDisease" 
                        checked={formData.communicableDisease}
                        onCheckedChange={(checked) => handleCheckboxChange("communicableDisease", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="communicableDisease" className="leading-tight text-[#5b6779]">
                        Free from any communicable/infectious disease?
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="asthmatic" 
                        checked={formData.asthmatic}
                        onCheckedChange={(checked) => handleCheckboxChange("asthmatic", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="asthmatic" className="leading-tight text-[#5b6779]">
                        Are you asthmatic?
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="chronicIllness" 
                        checked={formData.chronicIllness}
                        onCheckedChange={(checked) => handleCheckboxChange("chronicIllness", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="chronicIllness" className="leading-tight text-[#5b6779]">
                        Do you have chronic illnesses or take any medication?
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-[#5b6779] text-sm font-medium">Can you participate in the following activities:</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="hiking" 
                        checked={formData.hiking}
                        onCheckedChange={(checked) => handleCheckboxChange("hiking", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="hiking" className="text-[#5b6779]">Hiking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="dancing" 
                        checked={formData.dancing}
                        onCheckedChange={(checked) => handleCheckboxChange("dancing", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="dancing" className="text-[#5b6779]">Dancing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="swimming" 
                        checked={formData.swimming}
                        onCheckedChange={(checked) => handleCheckboxChange("swimming", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="swimming" className="text-[#5b6779]">Swimming</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="basketball" 
                        checked={formData.basketball}
                        onCheckedChange={(checked) => handleCheckboxChange("basketball", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="basketball" className="text-[#5b6779]">Basketball</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="ballgames" 
                        checked={formData.ballgames}
                        onCheckedChange={(checked) => handleCheckboxChange("ballgames", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="ballgames" className="text-[#5b6779]">Other Ballgames</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="jogging" 
                        checked={formData.jogging}
                        onCheckedChange={(checked) => handleCheckboxChange("jogging", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="jogging" className="text-[#5b6779]">Jogging</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="football" 
                        checked={formData.football}
                        onCheckedChange={(checked) => handleCheckboxChange("football", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="football" className="text-[#5b6779]">Football</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="badminton" 
                        checked={formData.badminton}
                        onCheckedChange={(checked) => handleCheckboxChange("badminton", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="badminton" className="text-[#5b6779]">Badminton</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="calisthenics" 
                        checked={formData.calisthenics}
                        onCheckedChange={(checked) => handleCheckboxChange("calisthenics", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="calisthenics" className="text-[#5b6779]">Calisthenics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="wallclimbing" 
                        checked={formData.wallclimbing}
                        onCheckedChange={(checked) => handleCheckboxChange("wallclimbing", checked as boolean)}
                        className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                      />
                      <Label htmlFor="wallclimbing" className="text-[#5b6779]">Wall Climbing</Label>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="notFitActivities" className="text-[#5b6779] text-sm font-medium">Specify other physical activities not physically fit to engage in:</Label>
                    <Textarea 
                      id="notFitActivities" 
                      placeholder="List activities you cannot participate in" 
                      className="bg-white text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                      value={formData.notFitActivities}
                      onChange={handleTextareaChange}
                    />
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="medicationPermission" 
                      checked={formData.medicationPermission}
                      onCheckedChange={(checked) => handleCheckboxChange("medicationPermission", checked as boolean)}
                      className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb]"
                    />
                    <div>
                      <Label htmlFor="medicationPermission" className="leading-tight text-[#5b6779]">
                        Are you allowed to take medications for fever, headache, colds, asthma, etc., as prescribed by the university physician?
                      </Label>
                      <p className="text-sm text-[#5b6779] mt-1">
                        If not selected, the university will contact your guardian for permission before administering any medication, which may delay treatment in non-emergency situations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Certification */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-4 border rounded-md p-6">
                  <div className="space-y-4">
                    <Label htmlFor="signature" className="text-[#5b6779] text-sm font-medium">Signature</Label>
                    
                    {/* Use updated SignaturePad with new props */}
                    <SignaturePad 
                      value={formData.signature} 
                      onChange={(signature) => {
                        setFormData(prev => ({ ...prev, signature }));
                        
                        if (errors.signature) {
                          setErrors(prev => ({ ...prev, signature: "" }));
                        }
                        
                        // If user is drawing a new signature, clear the uploaded one
                        if (signature && uploadedSignature) {
                          setUploadedSignature(null);
                        }
                      }}
                      onUpload={async (signature) => {
                        await handleSignatureUpload(signature);
                      }}
                      uploadedSignature={uploadedSignature}
                      isUploading={isUploadingSignature}
                      error={errors.signature}
                    />
                    
                    {errors.signature && <p className="text-xs text-red-500">{errors.signature}</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mt-6 pt-4 border-t">
                    <div className="flex-grow space-y-2">
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="certifyInfo" 
                          checked={formData.certifyInfo}
                          onCheckedChange={(checked) => handleCheckboxChange("certifyInfo", checked as boolean)}
                          className="data-[state=checked]:bg-[#166cbb] data-[state=checked]:border-[#166cbb] mt-1"
                        />
                        <Label htmlFor="certifyInfo" className="leading-tight text-[#5b6779]">
                          I certify that the information provided in this form is true and accurate to the best of my knowledge.
                        </Label>
                      </div>

                      {errors.certifyInfo && <p className="text-xs text-red-500">{errors.certifyInfo}</p>}
                    </div>

                    <div className="sm:w-1/3 space-y-2">
                      <Label htmlFor="dateIssued" className="text-[#5b6779] text-sm font-medium">Date Issued</Label>
                      <div className="opacity-70 pointer-events-none">
                        <DatePicker
                          date={formData.dateIssued || new Date()}
                          setDate={(date) => {
                            // This won't be triggered because the field is disabled,
                            // but we keep it for consistency
                            setFormData(prev => ({ ...prev, dateIssued: date }))
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 italic">Automatically set to current date</p>
                    </div>
                  </div>
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
                  <Check className="mr-1 h-4 w-4" /> Submit
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 