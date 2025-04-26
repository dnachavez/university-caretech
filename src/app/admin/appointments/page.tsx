"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { 
  ChevronRight, Calendar, Clock, 
  CheckCircle2, XCircle, CalendarDays, 
  CalendarCheck, ClipboardList, RefreshCcw
} from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

// Define types for appointments and time slots
interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  isAvailable: boolean
  consultationDateId: string
  consultationDate: {
    id: string
    date: string
    isActive: boolean
  }
  createdAt: string
  updatedAt: string
}

interface Appointment {
  id: string
  userId: string
  timeSlotId: string
  consultationType: string
  reasonForVisit: string
  additionalNotes?: string
  status: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    username: string
  }
  timeSlot: TimeSlot
}

interface ConsultationDate {
  id: string
  date: string
  isActive: boolean
  timeSlots: TimeSlot[]
  createdAt: string
  updatedAt: string
}

export default function AppointmentsPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [scheduledAppointments, setScheduledAppointments] = useState<Appointment[]>([])
  const [confirmedAppointments, setConfirmedAppointments] = useState<Appointment[]>([])
  const [ongoingAppointments, setOngoingAppointments] = useState<Appointment[]>([])
  const [completedAppointments, setCancelledAppointments] = useState<Appointment[]>([])
  const [rejectedAppointments, setRejectedAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  
  // For schedule setup
  const [consultationDates, setConsultationDates] = useState<ConsultationDate[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [dateDialogOpen, setDateDialogOpen] = useState(false)
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([])
  
  // Protect this route
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth')
      return
    }
    
    // Verify this is an admin
    if (user.role !== 'ADMIN') {
      router.push(user.role === 'STUDENT' ? '/student/dashboard' : '/fs/dashboard')
    }

    // Fetch appointments and consultation dates
    fetchAppointments()
    fetchConsultationDates()
    
    // Set up auto update interval
    const autoUpdateInterval = setInterval(() => {
      autoUpdateAppointmentStatuses()
    }, 60000) // Check every minute
    
    return () => clearInterval(autoUpdateInterval)
  }, [isAuthenticated, user, router])
  
  // Function to auto-update appointment statuses based on current time
  const autoUpdateAppointmentStatuses = async () => {
    try {
      const response = await fetch('/api/admin/appointments/auto-update')
      const data = await response.json()
      
      if (response.ok && data.updatedCount > 0) {
        // If any appointments were updated, refresh the appointment list
        fetchAppointments()
        toast.success(`${data.updatedCount} appointment(s) status updated automatically`)
      }
    } catch (error) {
      console.error("Error auto-updating appointment statuses:", error)
    }
  }
  
  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/appointments')
      const data = await response.json()
      
      if (data.appointments) {
        setAppointments(data.appointments)
        // Filter appointments by status
        setScheduledAppointments(data.appointments.filter((appt: Appointment) => appt.status === 'SCHEDULED'))
        setConfirmedAppointments(data.appointments.filter((appt: Appointment) => appt.status === 'CONFIRMED'))
        setOngoingAppointments(data.appointments.filter((appt: Appointment) => appt.status === 'ONGOING'))
        setCancelledAppointments(data.appointments.filter((appt: Appointment) => 
          appt.status === 'COMPLETED'))
        // Set rejected appointments
        setRejectedAppointments(data.appointments.filter((appt: Appointment) => 
          appt.status === 'CANCELLED'))
      }
    } catch (error) {
      console.error("Error fetching appointments:", error)
      toast.error("Failed to load appointments")
    } finally {
      setLoading(false)
    }
  }
  
  const fetchConsultationDates = async () => {
    try {
      const response = await fetch('/api/admin/consultation/dates')
      const data = await response.json()
      
      if (data.consultationDates) {
        setConsultationDates(data.consultationDates)
      }
    } catch (error) {
      console.error("Error fetching consultation dates:", error)
      toast.error("Failed to load consultation dates")
    }
  }
  
  const handleConfirmAppointment = async (appointmentId: string) => {
    try {
      const response = await fetch(`/api/admin/appointments/${appointmentId}/confirm`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        toast.success("Appointment confirmed successfully")
        fetchAppointments()
      } else {
        toast.error("Failed to confirm appointment")
      }
    } catch (error) {
      console.error("Error confirming appointment:", error)
      toast.error("Failed to confirm appointment")
    }
  }

  const handleRejectAppointment = async (appointmentId: string) => {
    try {
      const response = await fetch(`/api/admin/appointments/${appointmentId}/reject`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        toast.success("Appointment rejected successfully")
        fetchAppointments()
      } else {
        toast.error("Failed to reject appointment")
      }
    } catch (error) {
      console.error("Error rejecting appointment:", error)
      toast.error("Failed to reject appointment")
    }
  }
  
  const handleUnconfirmAppointment = async (appointmentId: string) => {
    try {
      const response = await fetch(`/api/admin/appointments/${appointmentId}/unconfirm`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        toast.success("Appointment has been unconfirmed")
        fetchAppointments()
      } else {
        toast.error("Failed to unconfirm appointment")
      }
    } catch (error) {
      console.error("Error unconfirming appointment:", error)
      toast.error("Failed to unconfirm appointment")
    }
  }
  
  const handleUnrejectAppointment = async (appointmentId: string) => {
    try {
      const response = await fetch(`/api/admin/appointments/${appointmentId}/unreject`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        toast.success("Appointment was successfully unrejected")
        fetchAppointments()
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to unreject appointment")
      }
    } catch (error) {
      console.error("Error unrejecting appointment:", error)
      toast.error("Failed to unreject appointment")
    }
  }
  
  const openRescheduleDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setRescheduleDialogOpen(true)
    
    // Reset timeSlot selection
    setSelectedTimeSlot("")
    
    // Clear available time slots since we'll select date first
    setAvailableTimeSlots([])
  }
  
  const handleRescheduleAppointment = async () => {
    if (!selectedAppointment || !selectedTimeSlot) {
      toast.error("Please select a new time slot")
      return
    }
    
    try {
      const response = await fetch(`/api/admin/appointments/${selectedAppointment.id}/reschedule`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newTimeSlotId: selectedTimeSlot })
      })
      
      if (response.ok) {
        toast.success("Appointment rescheduled successfully")
        fetchAppointments()
        setRescheduleDialogOpen(false)
        setSelectedAppointment(null)
        setSelectedTimeSlot("")
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to reschedule appointment")
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error)
      toast.error("Failed to reschedule appointment")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Scheduled</Badge>
      case 'CONFIRMED':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Confirmed</Badge>
      case 'ONGOING':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Ongoing</Badge>
      case 'COMPLETED':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Completed</Badge>
      case 'CANCELLED':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const handleAddTimeSlot = (timeSlot: string) => {
    // API call would go here to add a time slot for the selected date
    console.log(`Added time slot: ${timeSlot} on ${format(selectedDate, 'PPP')}`);
  }

  const handleRemoveTimeSlot = (index: number) => {
    // We now remove by index instead of comparing objects
    const updatedSlots = [...availableTimeSlots]
    updatedSlots.splice(index, 1)
    setAvailableTimeSlots(updatedSlots)
  }

  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Breadcrumb */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">Appointment Management</h1>
          <p className="text-gray-500">
            Manage medical consultation appointments
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/admin/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Appointments</span>
        </nav>
      </div>

      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          className="mr-2"
          onClick={() => {
            fetchAppointments();
            autoUpdateAppointmentStatuses();
          }}
        >
          <RefreshCcw className="h-4 w-4 mr-1" />
          Refresh Appointments
        </Button>
        <Button
          variant="default"
          onClick={() => setDateDialogOpen(true)}
        >
          <CalendarDays className="h-4 w-4 mr-1" />
          Configure Available Dates
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Today's Appointments */}
        <Card className="shadow-sm border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Calendar className="h-5 w-5 text-blue-500 mr-2" />
              Today's Appointments
            </CardTitle>
            <CardDescription>
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {appointments.filter(appt => {
                const apptDate = new Date(appt.timeSlot.consultationDate.date);
                const today = new Date();
                return apptDate.toDateString() === today.toDateString();
              }).length}
            </div>
            <div className="flex mt-2 text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
                <span>Scheduled: {scheduledAppointments.filter(appt => {
                  const apptDate = new Date(appt.timeSlot.consultationDate.date);
                  const today = new Date();
                  return apptDate.toDateString() === today.toDateString();
                }).length}</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                <span>Ongoing: {ongoingAppointments.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Confirmation */}
        <Card className="shadow-sm border-yellow-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="h-5 w-5 text-yellow-500 mr-2" />
              Pending Confirmation
            </CardTitle>
            <CardDescription>
              Appointments awaiting approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {scheduledAppointments.length}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              New appointment requests that need your confirmation
            </p>
          </CardContent>
        </Card>

        {/* Confirmed Appointments */}
        <Card className="shadow-sm border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <CalendarCheck className="h-5 w-5 text-green-500 mr-2" />
              Confirmed Appointments
            </CardTitle>
            <CardDescription>
              Ready for service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {confirmedAppointments.length}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Appointments that have been confirmed and scheduled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals Card */}
      {scheduledAppointments.length > 0 && (
        <Card className="shadow-sm border-yellow-200 mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="h-5 w-5 text-yellow-500 mr-2" />
              Pending Approvals
            </CardTitle>
            <CardDescription>
              Appointment requests awaiting your confirmation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentTable 
              appointments={scheduledAppointments}
              getStatusBadge={getStatusBadge}
              onConfirm={handleConfirmAppointment}
              onReject={handleRejectAppointment}
              onReschedule={openRescheduleDialog}
              onUnconfirm={handleUnconfirmAppointment}
              onUnreject={handleUnrejectAppointment}
              showActions={true}
            />
          </CardContent>
        </Card>
      )}

      {/* All Appointments Card */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <ClipboardList className="h-5 w-5 text-blue-500 mr-2" />
            All Appointments
          </CardTitle>
          <CardDescription>
            View and manage all appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <AppointmentTable 
                appointments={appointments}
                getStatusBadge={getStatusBadge}
                onConfirm={handleConfirmAppointment}
                onReject={handleRejectAppointment}
                onReschedule={openRescheduleDialog}
                onUnconfirm={handleUnconfirmAppointment}
                onUnreject={handleUnrejectAppointment}
                showActions={true}
              />
            </TabsContent>
            
            <TabsContent value="scheduled">
              <AppointmentTable 
                appointments={scheduledAppointments}
                getStatusBadge={getStatusBadge}
                onConfirm={handleConfirmAppointment}
                onReject={handleRejectAppointment}
                onReschedule={openRescheduleDialog}
                showActions={true}
              />
            </TabsContent>
            
            <TabsContent value="confirmed">
              <AppointmentTable 
                appointments={confirmedAppointments}
                getStatusBadge={getStatusBadge}
                onReschedule={openRescheduleDialog}
                onUnconfirm={handleUnconfirmAppointment}
                onReject={handleRejectAppointment}
                showActions={true}
              />
            </TabsContent>
            
            <TabsContent value="ongoing">
              <AppointmentTable 
                appointments={ongoingAppointments}
                getStatusBadge={getStatusBadge}
                showActions={false}
              />
            </TabsContent>
            
            <TabsContent value="completed">
              <AppointmentTable 
                appointments={completedAppointments}
                getStatusBadge={getStatusBadge}
                showActions={false}
              />
            </TabsContent>
            
            <TabsContent value="rejected">
              <AppointmentTable 
                appointments={rejectedAppointments}
                getStatusBadge={getStatusBadge}
                onUnreject={handleUnrejectAppointment}
                showActions={true}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Date Configuration Dialog */}
      <Dialog open={dateDialogOpen} onOpenChange={setDateDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Configure Available Dates</DialogTitle>
            <DialogDescription>
              Create and manage consultation dates and time slots
            </DialogDescription>
          </DialogHeader>
          
          <DateConfigurationComponent 
            consultationDates={consultationDates} 
            onUpdate={fetchConsultationDates}
          />
          
          <DialogFooter className="flex justify-between">
            <Button 
              variant="secondary" 
              onClick={() => {
                // Reset the form state in DateConfigurationComponent before closing
                const dateConfig = document.querySelector('button[form="create-new-date"]');
                if (dateConfig) {
                  (dateConfig as HTMLButtonElement).click();
                }
              }}
            >
              Add Another Date
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setDateDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Dialog */}
      <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Select a new date and time slot for this appointment
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {selectedAppointment && (
              <div className="mb-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium">Current Appointment</h3>
                <p className="text-sm mt-1">
                  <span className="text-gray-500">Patient: </span> 
                  {selectedAppointment.user.firstName} {selectedAppointment.user.lastName}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Date: </span> 
                  {format(new Date(selectedAppointment.timeSlot.consultationDate.date), 'PPP')}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Time: </span> 
                  {selectedAppointment.timeSlot.startTime} - {selectedAppointment.timeSlot.endTime}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Type: </span> 
                  {selectedAppointment.consultationType}
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              {/* Add date selection for rescheduling */}
              <div>
                <Label htmlFor="date-select">Select Date</Label>
                <Select 
                  onValueChange={(value) => {
                    // When date changes, filter available time slots for that date
                    const dateTimeSlots = consultationDates
                      .find(d => d.id === value)?.timeSlots
                      .filter(slot => slot.isAvailable) || [];
                    
                    setAvailableTimeSlots(dateTimeSlots);
                    setSelectedTimeSlot("");
                  }}
                >
                  <SelectTrigger id="date-select">
                    <SelectValue placeholder="Select a date" />
                  </SelectTrigger>
                  <SelectContent>
                    {consultationDates
                      .filter(date => date.isActive)
                      .map(date => (
                        <SelectItem key={date.id} value={date.id}>
                          {format(new Date(date.date), 'MMM d, yyyy')}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="time-slot">Time Slot</Label>
                <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot} disabled={availableTimeSlots.length === 0}>
                  <SelectTrigger id="time-slot">
                    <SelectValue placeholder={availableTimeSlots.length === 0 ? "Select a date first" : "Select a time slot"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimeSlots.length === 0 ? (
                      <SelectItem value="none" disabled>
                        {availableTimeSlots.length === 0 ? "Select a date first" : "No available time slots"}
                      </SelectItem>
                    ) : (
                      availableTimeSlots.map((slot) => (
                        <SelectItem key={slot.id} value={slot.id}>
                          {slot.startTime} - {slot.endTime}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setRescheduleDialogOpen(false)
                setSelectedAppointment(null)
                setSelectedTimeSlot("")
                setAvailableTimeSlots([])
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRescheduleAppointment}
              disabled={!selectedTimeSlot}
            >
              Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// AppointmentTable Component
function AppointmentTable({ 
  appointments, 
  getStatusBadge, 
  onConfirm = () => {}, 
  onReject = () => {},
  onReschedule = () => {},
  onUnconfirm = () => {},
  onUnreject = () => {},
  showActions = true
}: {
  appointments: Appointment[],
  getStatusBadge: (status: string) => React.ReactNode,
  onConfirm?: (id: string) => void,
  onReject?: (id: string) => void,
  onReschedule?: (appointment: Appointment) => void,
  onUnconfirm?: (id: string) => void,
  onUnreject?: (id: string) => void,
  showActions?: boolean
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            {showActions && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showActions ? 6 : 5} className="text-center text-gray-500 py-6">
                No appointments found
              </TableCell>
            </TableRow>
          ) : (
            appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>
                        {appointment.user.firstName[0]}{appointment.user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{appointment.user.firstName} {appointment.user.lastName}</div>
                      <div className="text-xs text-gray-500">{appointment.user.role}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(appointment.timeSlot.consultationDate.date), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  {appointment.timeSlot.startTime} - {appointment.timeSlot.endTime}
                </TableCell>
                <TableCell>
                  {appointment.consultationType}
                </TableCell>
                <TableCell>
                  {getStatusBadge(appointment.status)}
                </TableCell>
                {showActions && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {appointment.status === 'SCHEDULED' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => onConfirm(appointment.id)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Confirm
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => onReject(appointment.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {appointment.status === 'CONFIRMED' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-orange-600 border-orange-200 hover:bg-orange-50"
                            onClick={() => onUnconfirm(appointment.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Unconfirm
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => onReject(appointment.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {appointment.status === 'CANCELLED' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          onClick={() => onUnreject(appointment.id)}
                        >
                          <RefreshCcw className="h-4 w-4 mr-1" />
                          Unreject
                        </Button>
                      )}
                      {(appointment.status === 'SCHEDULED' || appointment.status === 'CONFIRMED') && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          onClick={() => onReschedule(appointment)}
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          Reschedule
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

// DateConfigurationComponent
function DateConfigurationComponent({ 
  consultationDates,
  onUpdate
}: {
  consultationDates: ConsultationDate[],
  onUpdate: () => void
}) {
  const { user } = useAuthStore()
  const [date, setDate] = useState<Date>(new Date())
  const [timeSlots, setTimeSlots] = useState<{ startTime: string, endTime: string }[]>([
    { startTime: "08:00 AM", endTime: "08:30 AM" }
  ])
  const [selectedDateId, setSelectedDateId] = useState<string>("")
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  
  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { startTime: "08:00 AM", endTime: "08:30 AM" }])
  }
  
  const handleRemoveTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index))
  }
  
  const handleTimeSlotChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const updatedSlots = [...timeSlots]
    updatedSlots[index][field] = value
    setTimeSlots(updatedSlots)
  }
  
  const handleToggleTimeSlotSelection = (timeSlotId: string) => {
    if (selectedTimeSlots.includes(timeSlotId)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(id => id !== timeSlotId))
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, timeSlotId])
    }
  }
  
  const handleCreateDate = async () => {
    if (!date) {
      toast.error("Please select a date")
      return
    }
    
    if (timeSlots.length === 0) {
      toast.error("Please add at least one time slot")
      return
    }
    
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/consultation/dates?userId=${user?.id}&role=${user?.role}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: date.toISOString(),
          timeSlots
        })
      })
      
      if (response.ok) {
        toast.success("Consultation date created successfully")
        setTimeSlots([{ startTime: "08:00 AM", endTime: "08:30 AM" }])
        setDate(new Date())
        onUpdate()
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to create consultation date")
      }
    } catch (error) {
      console.error("Error creating consultation date:", error)
      toast.error("Failed to create consultation date")
    } finally {
      setLoading(false)
    }
  }
  
  const handleToggleDateActive = async (dateId: string) => {
    try {
      const response = await fetch(`/api/admin/consultation/dates/${dateId}/toggle?userId=${user?.id}&role=${user?.role}`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        toast.success("Consultation date status updated")
        onUpdate()
      } else {
        toast.error("Failed to update consultation date status")
      }
    } catch (error) {
      console.error("Error toggling consultation date status:", error)
      toast.error("Failed to update consultation date status")
    }
  }
  
  const handleAddTimeSlotsToDate = async () => {
    if (!selectedDateId) {
      toast.error("Please select a date")
      return
    }
    
    if (timeSlots.length === 0) {
      toast.error("Please add at least one time slot")
      return
    }
    
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/consultation/dates/${selectedDateId}/timeslots?userId=${user?.id}&role=${user?.role}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timeSlots })
      })
      
      if (response.ok) {
        toast.success("Time slots added successfully")
        setTimeSlots([{ startTime: "08:00 AM", endTime: "08:30 AM" }])
        onUpdate()
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to add time slots")
      }
    } catch (error) {
      console.error("Error adding time slots:", error)
      toast.error("Failed to add time slots")
    } finally {
      setLoading(false)
    }
  }
  
  const handleRemoveTimeSlotsFromDate = async () => {
    if (!selectedDateId) {
      toast.error("Please select a date")
      return
    }
    
    if (selectedTimeSlots.length === 0) {
      toast.error("Please select at least one time slot to remove")
      return
    }
    
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/consultation/dates/${selectedDateId}/timeslots?userId=${user?.id}&role=${user?.role}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timeSlotIds: selectedTimeSlots })
      })
      
      if (response.ok) {
        toast.success("Time slots removed successfully")
        setSelectedTimeSlots([])
        onUpdate()
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to remove time slots")
      }
    } catch (error) {
      console.error("Error removing time slots:", error)
      toast.error("Failed to remove time slots")
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Create New Date</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="date">Select Date</Label>
            <div className="flex mt-1">
              <DatePicker date={date} setDate={(newDate) => setDate(newDate || new Date())} />
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Time Slots</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddTimeSlot}>
                Add Time Slot
              </Button>
            </div>
            {timeSlots.map((slot, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Select value={slot.startTime} onValueChange={(value) => handleTimeSlotChange(index, 'startTime', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Start Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00 AM">08:00 AM</SelectItem>
                    <SelectItem value="08:30 AM">08:30 AM</SelectItem>
                    <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                    <SelectItem value="09:30 AM">09:30 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="11:30 AM">11:30 AM</SelectItem>
                    <SelectItem value="01:00 PM">01:00 PM</SelectItem>
                    <SelectItem value="01:30 PM">01:30 PM</SelectItem>
                    <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                    <SelectItem value="02:30 PM">02:30 PM</SelectItem>
                    <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                    <SelectItem value="03:30 PM">03:30 PM</SelectItem>
                    <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                    <SelectItem value="04:30 PM">04:30 PM</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={slot.endTime} onValueChange={(value) => handleTimeSlotChange(index, 'endTime', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="End Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:30 AM">08:30 AM</SelectItem>
                    <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                    <SelectItem value="09:30 AM">09:30 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="11:30 AM">11:30 AM</SelectItem>
                    <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                    <SelectItem value="01:30 PM">01:30 PM</SelectItem>
                    <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                    <SelectItem value="02:30 PM">02:30 PM</SelectItem>
                    <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                    <SelectItem value="03:30 PM">03:30 PM</SelectItem>
                    <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                    <SelectItem value="04:30 PM">04:30 PM</SelectItem>
                    <SelectItem value="05:00 PM">05:00 PM</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500"
                  onClick={() => handleRemoveTimeSlot(index)}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <Button
            className="w-full"
            onClick={handleCreateDate}
            disabled={loading}
            form="create-new-date"
          >
            Create Consultation Date
          </Button>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-2">Manage Existing Dates</h3>
        <div className="grid grid-cols-1 gap-4">
          <Select value={selectedDateId} onValueChange={setSelectedDateId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a date to manage" />
            </SelectTrigger>
            <SelectContent>
              {consultationDates.map(date => (
                <SelectItem key={date.id} value={date.id}>
                  {format(new Date(date.date), 'MMM d, yyyy')} ({date.isActive ? 'Active' : 'Inactive'})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedDateId && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => handleToggleDateActive(selectedDateId)}
                >
                  {consultationDates.find(d => d.id === selectedDateId)?.isActive ? 'Deactivate Date' : 'Activate Date'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleAddTimeSlotsToDate}
                >
                  Add Time Slots
                </Button>
              </div>
              
              {selectedDateId && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>New Time Slot</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddTimeSlot}>
                      Add Time Slot
                    </Button>
                  </div>
                  
                  {timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Select value={slot.startTime} onValueChange={(value) => handleTimeSlotChange(index, 'startTime', value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Start Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:00 AM">08:00 AM</SelectItem>
                          <SelectItem value="08:30 AM">08:30 AM</SelectItem>
                          <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                          <SelectItem value="09:30 AM">09:30 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="11:30 AM">11:30 AM</SelectItem>
                          <SelectItem value="01:00 PM">01:00 PM</SelectItem>
                          <SelectItem value="01:30 PM">01:30 PM</SelectItem>
                          <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                          <SelectItem value="02:30 PM">02:30 PM</SelectItem>
                          <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                          <SelectItem value="03:30 PM">03:30 PM</SelectItem>
                          <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                          <SelectItem value="04:30 PM">04:30 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={slot.endTime} onValueChange={(value) => handleTimeSlotChange(index, 'endTime', value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="End Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="08:30 AM">08:30 AM</SelectItem>
                          <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                          <SelectItem value="09:30 AM">09:30 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                          <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                          <SelectItem value="11:30 AM">11:30 AM</SelectItem>
                          <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                          <SelectItem value="01:30 PM">01:30 PM</SelectItem>
                          <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                          <SelectItem value="02:30 PM">02:30 PM</SelectItem>
                          <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                          <SelectItem value="03:30 PM">03:30 PM</SelectItem>
                          <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                          <SelectItem value="04:30 PM">04:30 PM</SelectItem>
                          <SelectItem value="05:00 PM">05:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500"
                        onClick={() => handleRemoveTimeSlot(index)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              {selectedDateId && consultationDates.find(d => d.id === selectedDateId)?.timeSlots && 
               consultationDates.find(d => d.id === selectedDateId)!.timeSlots.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Time Slots</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto p-2 border rounded-md">
                    {consultationDates.find(d => d.id === selectedDateId)?.timeSlots.map(slot => (
                      <div 
                        key={slot.id} 
                        className={`p-2 rounded-md flex items-center justify-between ${
                          selectedTimeSlots.includes(slot.id) ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                        }`}
                        onClick={() => handleToggleTimeSlotSelection(slot.id)}
                      >
                        <div>
                          <span>{slot.startTime} - {slot.endTime}</span>
                          {!slot.isAvailable && (
                            <Badge className="ml-2 bg-red-100 text-red-800">Booked</Badge>
                          )}
                        </div>
                        <input 
                          type="checkbox" 
                          checked={selectedTimeSlots.includes(slot.id)} 
                          onChange={() => handleToggleTimeSlotSelection(slot.id)}
                          disabled={!slot.isAvailable}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="mt-2 w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleRemoveTimeSlotsFromDate}
                    disabled={selectedTimeSlots.length === 0}
                  >
                    Remove Selected Time Slots
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 