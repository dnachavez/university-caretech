"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, User, Briefcase, GraduationCap, Building, Calendar, Download, Eye, Search, Printer, MoreHorizontal, Settings, Mail, MapPin, Phone, School, Star, UserPlus, UserSquare } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"
import Link from "next/link"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

// Define types for user and health form
interface HealthForm {
  id: string
  userId: string
  lastName: string
  firstName: string
  middleInitial?: string
  birthdate: string
  gender: string
  birthPlace: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  departmentId?: string
  yearLevel?: string
  guardianName?: string
  guardianContact?: string
  emergencyContact: string
  relationship: string
  emergencyNumber: string
  bloodType?: string
  signaturePath: string
  dateSigned: string
  pastIllnesses?: string
  hospitalization?: string
  medications?: string
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
  notFitActivities?: string
  medicationPermission: boolean
}

interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  status: string;
}

interface MedicalRecord {
  id: string;
  formType: string;
  filePath: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  healthForm?: HealthForm;
  uploadedForms: MedicalRecord[];
}

export default function UserProfilePage({ 
  params 
}: { 
  params: { userId: string } 
}) {
  const router = useRouter()
  const { user: currentUser, isAuthenticated } = useAuthStore()
  const [user, setUser] = useState<User | null>(null)
  const [department, setDepartment] = useState<Department | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recordSearchQuery, setRecordSearchQuery] = useState("")
  
  // Protect this route
  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      router.push('/auth')
      return
    }
    
    // Verify this is an admin
    if (currentUser.role !== 'ADMIN') {
      router.push(currentUser.role === 'STUDENT' ? '/student/dashboard' : '/fs/dashboard')
      return
    }
    
    // Fetch user details
    fetchUserDetails()
  }, [isAuthenticated, currentUser, router, params.userId])
  
  const fetchUserDetails = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/users/${params.userId}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch user details")
      }
      
      const data = await response.json()
      setUser(data.user)
      
      // If user has department, fetch department info
      if (data.user.healthForm?.departmentId) {
        fetchDepartment(data.user.healthForm.departmentId)
      }
    } catch (err) {
      console.error("Error fetching user details:", err)
      setError(typeof err === 'object' && err !== null ? (err as Error).message : "Failed to load user information")
    } finally {
      setIsLoading(false)
    }
  }
  
  const fetchDepartment = async (departmentId: string) => {
    try {
      const response = await fetch(`/api/admin/departments/${departmentId}`)
      if (!response.ok) {
        return // Silently fail if department not found
      }
      
      const data = await response.json()
      setDepartment(data.department)
    } catch (err) {
      console.error("Error fetching department:", err)
      // Don't set error state as department is optional
    }
  }
  
  const handleDownloadFile = (filePath: string) => {
    // Implementation for downloading the file
    window.open(filePath, '_blank')
  }
  
  const handlePrintFile = (filePath: string) => {
    const printWindow = window.open(filePath, '_blank');
    printWindow?.addEventListener('load', () => {
      printWindow.print();
    });
  }
  
  // Filter medical records based on search query
  const filteredMedicalRecords = user?.uploadedForms?.filter(record => 
    record.formType.toLowerCase().includes(recordSearchQuery.toLowerCase()) ||
    (record.notes && record.notes.toLowerCase().includes(recordSearchQuery.toLowerCase())) ||
    record.status.toLowerCase().includes(recordSearchQuery.toLowerCase()) ||
    format(new Date(record.createdAt), "MMM d, yyyy").toLowerCase().includes(recordSearchQuery.toLowerCase())
  ) || []
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  if (error || !user) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-700">User Profile</h1>
            <p className="text-gray-500">An error occurred</p>
          </div>
        </div>
        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center py-8 text-gray-500">
              {error || "Unable to load user information."}
            </div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-500">
            {user.role === 'STUDENT' ? 'Student' : user.role === 'FACULTY' ? 'Faculty' : user.role === 'ADMIN' ? 'Admin' : 'Staff'} Profile
          </p>
        </div>
      </div>
      
      {/* Custom breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6 -mt-4">
        <Link href="/admin/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/admin/users" className="hover:text-blue-600">
          Users
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-700 font-medium">User Profile</span>
      </div>
      
      {/* Back Button */}
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      {/* User Information Card */}
      <Card className="bg-white shadow-sm mb-6">
        <CardHeader>
          <div className="flex items-center">
            {user.role === 'STUDENT' ? (
              <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
            ) : user.role === 'ADMIN' ? (
              <User className="h-5 w-5 mr-2 text-purple-500" />
            ) : (
              <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
            )}
            <CardTitle className="text-gray-700">
              {user.role === 'STUDENT' ? 'Student' : user.role === 'FACULTY' ? 'Faculty' : user.role === 'ADMIN' ? 'Admin' : 'Staff'} Information
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Username:</span>
                <p className="font-medium">{user.username}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Full Name:</span>
                <p className="font-medium">{user.lastName}, {user.firstName} {user.healthForm?.middleInitial || ""}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email Address:</span>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">ID Number:</span>
                <p className="font-medium">{user.idNumber || "-"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Role:</span>
                <p className="font-medium">{user.role}</p>
              </div>
              {user.role === 'STUDENT' && user.healthForm?.yearLevel && (
                <div>
                  <span className="text-sm text-gray-500">Year Level:</span>
                  <p className="font-medium">{user.healthForm.yearLevel}</p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {department && (
                <div>
                  <span className="text-sm text-gray-500">Department:</span>
                  <p className="font-medium">{department.name}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-gray-500">Status:</span>
                <Badge variant={user.status === 'ACTIVE' ? 'default' : user.status === 'PENDING' ? 'outline' : 'destructive'}>
                  {user.status}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-gray-500">Joined On:</span>
                <p className="font-medium">
                  {format(new Date(user.createdAt), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Health Form and Medical Records Tabs */}
      <Tabs defaultValue="health-form" className="mb-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="health-form">Health Form</TabsTrigger>
          <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
        </TabsList>
        
        {/* Health Form Tab */}
        <TabsContent value="health-form">
          {user.healthForm ? (
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  <CardTitle className="text-gray-700">Health Form</CardTitle>
                </div>
                <CardDescription>
                  Last updated on {format(new Date(user.healthForm.dateSigned), "MMMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Birthday:</span>
                      <p className="font-medium">
                        {format(new Date(user.healthForm.birthdate), "MMMM d, yyyy")}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Gender:</span>
                      <p className="font-medium">{user.healthForm.gender}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Birth Place:</span>
                      <p className="font-medium">{user.healthForm.birthPlace}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Blood Type:</span>
                      <p className="font-medium">{user.healthForm.bloodType || "Not specified"}</p>
                    </div>
                  </div>
                </div>
                
                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Address Line 1:</span>
                      <p className="font-medium">{user.healthForm.addressLine1}</p>
                    </div>
                    {user.healthForm.addressLine2 && (
                      <div>
                        <span className="text-sm text-gray-500">Address Line 2:</span>
                        <p className="font-medium">{user.healthForm.addressLine2}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-gray-500">City:</span>
                      <p className="font-medium">{user.healthForm.city}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">State/Province:</span>
                      <p className="font-medium">{user.healthForm.state}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Postal Code:</span>
                      <p className="font-medium">{user.healthForm.postalCode}</p>
                    </div>
                  </div>
                </div>
                
                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Contact Person:</span>
                      <p className="font-medium">{user.healthForm.emergencyContact}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Relationship:</span>
                      <p className="font-medium">{user.healthForm.relationship}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Contact Number:</span>
                      <p className="font-medium">{user.healthForm.emergencyNumber}</p>
                    </div>
                  </div>
                </div>
                
                {/* Guardian Information (for students) */}
                {user.role === 'STUDENT' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Guardian Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Guardian Name:</span>
                        <p className="font-medium">{user.healthForm.guardianName || "Not specified"}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Guardian Contact:</span>
                        <p className="font-medium">{user.healthForm.guardianContact || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Medical History */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Medical History</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Past Illnesses:</span>
                      <p className="font-medium">{user.healthForm.pastIllnesses || "None"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Hospitalization:</span>
                      <p className="font-medium">{user.healthForm.hospitalization || "None"}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Medications:</span>
                      <p className="font-medium">{user.healthForm.medications || "None"}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                    <Badge variant={user.healthForm.allergies ? "default" : "outline"}>
                      Allergies: {user.healthForm.allergies ? "Yes" : "No"}
                    </Badge>
                    <Badge variant={user.healthForm.immunized ? "default" : "outline"}>
                      Immunized: {user.healthForm.immunized ? "Yes" : "No"}
                    </Badge>
                    <Badge variant={user.healthForm.communicableDisease ? "default" : "outline"}>
                      Communicable Disease: {user.healthForm.communicableDisease ? "Yes" : "No"}
                    </Badge>
                    <Badge variant={user.healthForm.asthmatic ? "default" : "outline"}>
                      Asthmatic: {user.healthForm.asthmatic ? "Yes" : "No"}
                    </Badge>
                    <Badge variant={user.healthForm.chronicIllness ? "default" : "outline"}>
                      Chronic Illness: {user.healthForm.chronicIllness ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white shadow-sm">
              <CardContent className="py-8">
                <div className="text-center text-gray-500">
                  No health form data available for this user.
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Medical Records Tab */}
        <TabsContent value="medical-records">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  <CardTitle className="text-gray-700">Medical Records</CardTitle>
                </div>
                <div className="relative max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search records..."
                    value={recordSearchQuery}
                    onChange={(e) => setRecordSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 text-sm"
                  />
                </div>
              </div>
              <CardDescription>
                View and manage submitted medical records and forms
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredMedicalRecords.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Form Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Submitted</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedicalRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.formType}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              record.status === 'APPROVED' ? 'default' : 
                              record.status === 'PENDING' ? 'outline' :
                              'destructive'
                            }
                          >
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(new Date(record.createdAt), "MMM d, yyyy")}</TableCell>
                        <TableCell>{record.notes || "—"}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadFile(record.filePath)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadFile(record.filePath)}
                            className="ml-2"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePrintFile(record.filePath)}
                            className="ml-2"
                          >
                            <Printer className="h-4 w-4 mr-1" />
                            Print
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-md border border-gray-100">
                  <Calendar className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-gray-500 font-medium mb-1">No Medical Records</h3>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">
                    {recordSearchQuery 
                      ? "No records match your search criteria." 
                      : "This user has not uploaded any medical records or forms yet."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 