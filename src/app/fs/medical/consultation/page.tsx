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
import { ChevronRight, Calendar as CalendarIcon, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

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
  
  // Protect this route
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth')
      return
    }
    
    // Verify this is a faculty or staff
    if (user.role !== 'FACULTY' && user.role !== 'STAFF') {
      router.push(user.role === 'STUDENT' ? '/student/dashboard' : '/admin/dashboard')
    }
  }, [isAuthenticated, user, router])
  
  // TODO: Replace with actual API calls when backend is available
  useEffect(() => {
    // Simulate loading available dates
    const loadConsultationDates = async () => {
      try {
        setIsLoading(true)
        
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data - in production, this would come from your API
        const today = new Date()
        const futureDates = []
        
        for (let i = 1; i <= 14; i++) {
          const futureDate = new Date(today)
          futureDate.setDate(today.getDate() + i)
          
          // Only include weekdays (Monday-Friday)
          if (futureDate.getDay() !== 0 && futureDate.getDay() !== 6) {
            futureDates.push(futureDate)
          }
        }
        
        setAvailableDates(futureDates)
        
        // Mock consultation slots
        const slots = []
        for (let i = 0; i < futureDates.length; i++) {
          const date = futureDates[i]
          const dateString = date.toISOString().split('T')[0]
          
          // Create random slots for each date
          const daySlots = []
          const startHour = 8
          const endHour = 16
          
          for (let hour = startHour; hour < endHour; hour++) {
            // Random chance to have a slot
            if (Math.random() > 0.3) {
              const startTime = `${hour.toString().padStart(2, '0')}:00`
              const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`
              daySlots.push({
                id: `slot-${dateString}-${hour}`,
                date: dateString,
                startTime,
                endTime,
                available: true
              })
            }
          }
          
          slots.push({
            date: dateString,
            slots: daySlots
          })
        }
        
        setConsultationDates(slots)
      } catch (error) {
        console.error("Error loading consultation dates:", error)
        toast.error("Failed to load available dates. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
    
    loadConsultationDates()
  }, [])
  
  // Helper function to get time slots for a date
  const getAvailableTimeSlots = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    const dateEntry = consultationDates.find(d => d.date === dateString)
    
    if (dateEntry) {
      return dateEntry.slots
    }
    
    return []
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
      router.push('/fs/dashboard')
    } catch (error: any) {
      console.error("Form submission error:", error)
      toast.error(error.message || "Failed to schedule appointment. Please try again.")
    } finally {
      setIsSubmitting(false)
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
          <Link href="/fs/medical" className="hover:text-blue-600">
            Medical
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Consultation</span>
        </nav>
      </div>

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
            {currentStep === 0 &&
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-[#5b6779] text-sm font-medium">Select Date</Label>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-[400px] border rounded-md">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <div className={`p-3 border rounded-md ${errors.date ? 'border-red-500' : 'border-[#dde5f0]'}`}>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={{ 
                          before: new Date(),
                          after: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                          dayOfWeek: [0, 6], // Disable weekends (Saturday and Sunday)
                        }}
                        classNames={{
                          day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white",
                          day_today: "bg-gray-100 text-gray-900",
                        }}
                      />
                    </div>
                  )}
                  {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
                </div>

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
                    ) :
                      <div className="text-center p-8 text-gray-500 border border-dashed rounded-md h-[400px] flex items-center justify-center">
                        No available time slots for the selected date.
                      </div>
                    )
                  : (
                    <div className="text-center p-8 text-gray-500 border border-dashed rounded-md h-[400px] flex items-center justify-center">
                      Please select a date first to view available time slots.
                    </div>
                  )}
                  {errors.timeSlot && <p className="text-xs text-red-500">{errors.timeSlot}</p>}
                </div>
              </div>
            }

            {/* Step 2: Appointment Details */}
            {currentStep === 1 &&
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
                    value={reasonForVisit}
                    onChange={(e) => {
                      setReasonForVisit(e.target.value)
                      if (errors.reasonForVisit) {
                        setErrors(prev => ({ ...prev, reasonForVisit: "" }))
                      }
                    }}
                    id="reasonForVisit"
                    placeholder="Please describe your symptoms or reason for consultation"
                    className={`min-h-[120px] bg-white ${errors.reasonForVisit ? 'border-red-500' : 'border-[#dde5f0]'}`}
                  />
                  {errors.reasonForVisit && <p className="text-xs text-red-500">{errors.reasonForVisit}</p>}
                </div>
                
                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes" className="text-[#5b6779] text-sm font-medium">
                    Additional Notes <span className="text-gray-400">(Optional)</span>
                  </Label>
                  <Textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    id="additionalNotes"
                    placeholder="Any additional information you'd like to provide"
                    className="min-h-[80px] bg-white border-[#dde5f0]"
                  />
                </div>
              </div>
            }
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentStep > 0 ? (
            <Button 
              type="button" 
              onClick={handlePreviousStep}
              variant="outline"
              className="text-gray-600 border-gray-300"
            >
              Back
            </Button>
          ) : (
            <div /> // Empty div to maintain spacing
          )}
          
          {currentStep < formSteps.length - 1 ? (
            <Button 
              type="button" 
              onClick={handleNextStep}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continue
            </Button>
          ) : (
            <Button 
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 