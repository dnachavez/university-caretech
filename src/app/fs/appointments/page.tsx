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
import { format } from "date-fns"
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

export default function FSAppointmentsPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [scheduledAppointments, setScheduledAppointments] = useState<Appointment[]>([])
  const [confirmedAppointments, setConfirmedAppointments] = useState<Appointment[]>([])
  const [ongoingAppointments, setOngoingAppointments] = useState<Appointment[]>([])
  const [completedAppointments, setCancelledAppointments] = useState<Appointment[]>([])
  const [rejectedAppointments, setRejectedAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  
  // Protect this route
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth')
      return
    }
    
    // Verify this is a staff user
    if (user.role !== 'STAFF') {
      router.push(user.role === 'ADMIN' ? '/admin/dashboard' : 
        (user.role === 'STUDENT' ? '/student/dashboard' : '/fs/dashboard'))
      return
    }

    // Fetch appointments
    fetchAppointments()
    
    // Set up auto update interval
    const autoUpdateInterval = setInterval(() => {
      autoUpdateAppointmentStatuses()
    }, 60000) // Check every minute
    
    return () => clearInterval(autoUpdateInterval)
  }, [isAuthenticated, user, router])
  
  // Function to auto-update appointment statuses based on current time
  const autoUpdateAppointmentStatuses = async () => {
    try {
      const response = await fetch('/api/fs/appointments/auto-update')
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
      const response = await fetch('/api/fs/appointments')
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
  
  const handleConfirmAppointment = async (appointmentId: string) => {
    try {
      const response = await fetch(`/api/fs/appointments/${appointmentId}/confirm`, {
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
      const response = await fetch(`/api/fs/appointments/${appointmentId}/reject`, {
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
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>
      case 'CONFIRMED':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Confirmed</Badge>
      case 'ONGOING':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Ongoing</Badge>
      case 'COMPLETED':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
      case 'CANCELLED':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            View and manage all student appointments
          </p>
        </div>
        <Button 
          onClick={() => fetchAppointments()} 
          variant="outline" 
          size="sm" 
          className="gap-1"
        >
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          Loading appointments...
        </div>
      ) : (
        <Tabs defaultValue="scheduled" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="scheduled" className="flex gap-2 items-center">
              <Calendar className="h-4 w-4" />
              Scheduled
              {scheduledAppointments.length > 0 && (
                <Badge variant="secondary" className="ml-1">{scheduledAppointments.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="flex gap-2 items-center">
              <CheckCircle2 className="h-4 w-4" />
              Confirmed
              {confirmedAppointments.length > 0 && (
                <Badge variant="secondary" className="ml-1">{confirmedAppointments.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="flex gap-2 items-center">
              <Clock className="h-4 w-4" />
              Ongoing
              {ongoingAppointments.length > 0 && (
                <Badge variant="secondary" className="ml-1">{ongoingAppointments.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex gap-2 items-center">
              <CalendarCheck className="h-4 w-4" />
              Completed
              {completedAppointments.length > 0 && (
                <Badge variant="secondary" className="ml-1">{completedAppointments.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex gap-2 items-center">
              <XCircle className="h-4 w-4" />
              Cancelled
              {rejectedAppointments.length > 0 && (
                <Badge variant="secondary" className="ml-1">{rejectedAppointments.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scheduled">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Appointments</CardTitle>
                <CardDescription>
                  These appointments are waiting for confirmation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentTable 
                  appointments={scheduledAppointments} 
                  getStatusBadge={getStatusBadge}
                  onConfirm={handleConfirmAppointment}
                  onReject={handleRejectAppointment}
                  showActions={true}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="confirmed">
            <Card>
              <CardHeader>
                <CardTitle>Confirmed Appointments</CardTitle>
                <CardDescription>
                  These appointments have been confirmed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentTable 
                  appointments={confirmedAppointments} 
                  getStatusBadge={getStatusBadge}
                  showActions={false}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ongoing">
            <Card>
              <CardHeader>
                <CardTitle>Ongoing Appointments</CardTitle>
                <CardDescription>
                  These appointments are currently in progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentTable 
                  appointments={ongoingAppointments} 
                  getStatusBadge={getStatusBadge}
                  showActions={false}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Appointments</CardTitle>
                <CardDescription>
                  These appointments have been completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentTable 
                  appointments={completedAppointments} 
                  getStatusBadge={getStatusBadge}
                  showActions={false}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cancelled">
            <Card>
              <CardHeader>
                <CardTitle>Cancelled Appointments</CardTitle>
                <CardDescription>
                  These appointments have been cancelled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppointmentTable 
                  appointments={rejectedAppointments} 
                  getStatusBadge={getStatusBadge}
                  showActions={false}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

function AppointmentTable({ 
  appointments, 
  getStatusBadge,
  onConfirm = () => {},
  onReject = () => {},
  showActions = true
}: {
  appointments: Appointment[],
  getStatusBadge: (status: string) => React.ReactNode,
  onConfirm?: (id: string) => void,
  onReject?: (id: string) => void,
  showActions?: boolean
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Patient</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            {showActions && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showActions ? 7 : 6} className="text-center py-6 text-muted-foreground">
                No appointments found
              </TableCell>
            </TableRow>
          ) : (
            appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs">
                        {appointment.user.firstName[0]}{appointment.user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{appointment.user.firstName} {appointment.user.lastName}</div>
                      <div className="text-xs text-muted-foreground">{appointment.user.role}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[150px] truncate">
                    {appointment.consultationType}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[150px] truncate" title={appointment.reasonForVisit}>
                    {appointment.reasonForVisit}
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(appointment.timeSlot.consultationDate.date), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  {appointment.timeSlot.startTime} - {appointment.timeSlot.endTime}
                </TableCell>
                <TableCell>
                  {getStatusBadge(appointment.status)}
                </TableCell>
                {showActions && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        onClick={() => onConfirm(appointment.id)} 
                        size="sm" 
                        variant="outline"
                        className="h-8 gap-1 border-green-200 text-green-700 hover:bg-green-50"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Confirm
                      </Button>
                      <Button 
                        onClick={() => onReject(appointment.id)} 
                        size="sm" 
                        variant="outline"
                        className="h-8 gap-1 border-red-200 text-red-700 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
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