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
import { ArrowLeft, FileText, Activity, Clipboard, FileCheck, Calendar, Syringe, Download, Eye, Search, Printer } from "lucide-react"
import { PageHeader } from "@/features/medical/components/page-header"
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

// Define types for the health form and medical records
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
  user: {
    username: string
    email: string
    firstName: string
    lastName: string
    role: string
  }
}

interface MedicalRecord {
  id: string
  userId: string
  formType: string
  filePath: string
  notes?: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function StudentRecordsDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [healthForm, setHealthForm] = useState<HealthForm | null>(null)
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recordSearchQuery, setRecordSearchQuery] = useState("")
  
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
  
  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Fetch health form data
        const healthFormResponse = await fetch(`/api/fs/student-health-form/${params.id}`)
        
        if (!healthFormResponse.ok) {
          const errorData = await healthFormResponse.json();
          throw new Error(errorData.error || "Failed to fetch student health form");
        }
        
        const healthFormData = await healthFormResponse.json()
        setHealthForm(healthFormData)
        
        // Fetch medical records
        const medicalRecordsResponse = await fetch(`/api/fs/student-medical-records/${params.id}`)
        
        if (!medicalRecordsResponse.ok) {
          const errorData = await medicalRecordsResponse.json();
          throw new Error(errorData.error || "Failed to fetch student medical records");
        }
        
        const medicalRecordsData = await medicalRecordsResponse.json()
        setMedicalRecords(medicalRecordsData)
      } catch (err) {
        console.error("Error fetching student data:", err)
        setError(typeof err === 'object' && err !== null ? (err as Error).message : "Failed to load student information. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
    
    if (params.id && isAuthenticated) {
      fetchStudentData()
    }
  }, [params.id, isAuthenticated])
  
  // Download file handler
  const handleDownloadFile = (filePath: string) => {
    const fileName = filePath.split('/').pop() || 'medical-record.pdf';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print file handler
  const handlePrintFile = (filePath: string) => {
    const printWindow = window.open(filePath, '_blank');
    printWindow?.addEventListener('load', () => {
      printWindow.print();
    });
  };
  
  // Filter medical records based on search query
  const filteredMedicalRecords = medicalRecords.filter(record => 
    record.id.toLowerCase().includes(recordSearchQuery.toLowerCase()) ||
    record.formType.toLowerCase().includes(recordSearchQuery.toLowerCase()) ||
    (record.notes && record.notes.toLowerCase().includes(recordSearchQuery.toLowerCase())) ||
    record.status.toLowerCase().includes(recordSearchQuery.toLowerCase()) ||
    format(new Date(record.updatedAt), "MMM d, yyyy").toLowerCase().includes(recordSearchQuery.toLowerCase())
  )
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  if (error || !healthForm) {
    return (
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Student Details"
          description="An error occurred"
          currentPage="Student Details"
          baseUrl="/fs"
        />
        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center py-8 text-gray-500">
              {error || "No health form data available for this student."}
            </div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title={`${healthForm.lastName}, ${healthForm.firstName} ${healthForm.middleInitial || ""}`}
        description="Student medical records and forms"
        currentPage="Student Details"
        baseUrl="/fs"
      />
      
      {/* Custom breadcrumb for student records */}
      <div className="flex items-center text-sm text-gray-500 mb-6 -mt-4">
        <Link href="/fs/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/fs/student-records" className="hover:text-blue-600">
          Student Records
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-700 font-medium">Student Details</span>
      </div>
      
      {/* Back Button */}
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Search
      </Button>
      
      {/* Student Information Card */}
      <Card className="bg-white shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="text-gray-700">Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Username:</span>
                <p className="font-medium">{healthForm.user.username}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Full Name:</span>
                <p className="font-medium">{healthForm.lastName}, {healthForm.firstName} {healthForm.middleInitial || ""}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email Address:</span>
                <p className="font-medium">{healthForm.user.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Gender:</span>
                <p className="font-medium">{healthForm.gender}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Birthday:</span>
                <p className="font-medium">
                  {format(new Date(healthForm.birthdate), "MMMM d, yyyy")}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Birth Place:</span>
                <p className="font-medium">{healthForm.birthPlace}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Contact Number:</span>
                <p className="font-medium">{healthForm.emergencyNumber}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Blood Type:</span>
                <p className="font-medium">{healthForm.bloodType || "Not specified"}</p>
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
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-700">Student Health Form</CardTitle>
              <CardDescription>
                Last updated on {format(new Date(healthForm.dateSigned), "MMMM d, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Address Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Address Line 1:</span>
                    <p className="font-medium">{healthForm.addressLine1}</p>
                  </div>
                  {healthForm.addressLine2 && (
                    <div>
                      <span className="text-sm text-gray-500">Address Line 2:</span>
                      <p className="font-medium">{healthForm.addressLine2}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-gray-500">City:</span>
                    <p className="font-medium">{healthForm.city}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">State/Province:</span>
                    <p className="font-medium">{healthForm.state}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Postal Code:</span>
                    <p className="font-medium">{healthForm.postalCode}</p>
                  </div>
                </div>
              </div>
              
              {/* Guardian Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Guardian Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Guardian Name:</span>
                    <p className="font-medium">{healthForm.guardianName || "Not specified"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Guardian Contact:</span>
                    <p className="font-medium">{healthForm.guardianContact || "Not specified"}</p>
                  </div>
                </div>
              </div>
              
              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Contact Person:</span>
                    <p className="font-medium">{healthForm.emergencyContact}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Relationship:</span>
                    <p className="font-medium">{healthForm.relationship}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Contact Number:</span>
                    <p className="font-medium">{healthForm.emergencyNumber}</p>
                  </div>
                </div>
              </div>
              
              {/* Medical History */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Medical History</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Past Illnesses:</span>
                    <p className="font-medium">{healthForm.pastIllnesses || "None"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Hospitalization:</span>
                    <p className="font-medium">{healthForm.hospitalization || "None"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Medications:</span>
                    <p className="font-medium">{healthForm.medications || "None"}</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  <Badge variant={healthForm.allergies ? "default" : "outline"}>
                    Allergies: {healthForm.allergies ? "Yes" : "No"}
                  </Badge>
                  <Badge variant={healthForm.immunized ? "default" : "outline"}>
                    Immunized: {healthForm.immunized ? "Yes" : "No"}
                  </Badge>
                  <Badge variant={healthForm.communicableDisease ? "default" : "outline"}>
                    Communicable Disease: {healthForm.communicableDisease ? "Yes" : "No"}
                  </Badge>
                  <Badge variant={healthForm.asthmatic ? "default" : "outline"}>
                    Asthmatic: {healthForm.asthmatic ? "Yes" : "No"}
                  </Badge>
                  <Badge variant={healthForm.chronicIllness ? "default" : "outline"}>
                    Chronic Illness: {healthForm.chronicIllness ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
              
              {/* Physical Activities */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Physical Activities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  <Badge variant={healthForm.hiking ? "default" : "outline"}>
                    Hiking
                  </Badge>
                  <Badge variant={healthForm.dancing ? "default" : "outline"}>
                    Dancing
                  </Badge>
                  <Badge variant={healthForm.swimming ? "default" : "outline"}>
                    Swimming
                  </Badge>
                  <Badge variant={healthForm.basketball ? "default" : "outline"}>
                    Basketball
                  </Badge>
                  <Badge variant={healthForm.ballgames ? "default" : "outline"}>
                    Ball Games
                  </Badge>
                  <Badge variant={healthForm.jogging ? "default" : "outline"}>
                    Jogging
                  </Badge>
                  <Badge variant={healthForm.football ? "default" : "outline"}>
                    Football
                  </Badge>
                  <Badge variant={healthForm.badminton ? "default" : "outline"}>
                    Badminton
                  </Badge>
                  <Badge variant={healthForm.calisthenics ? "default" : "outline"}>
                    Calisthenics
                  </Badge>
                  <Badge variant={healthForm.wallclimbing ? "default" : "outline"}>
                    Wall Climbing
                  </Badge>
                </div>
                {healthForm.notFitActivities && (
                  <div className="mt-4">
                    <span className="text-sm text-gray-500">Activities Not Fit For:</span>
                    <p className="font-medium">{healthForm.notFitActivities}</p>
                  </div>
                )}
              </div>
              
              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Additional Information</h3>
                <div>
                  <Badge variant={healthForm.medicationPermission ? "default" : "outline"}>
                    Medication Permission: {healthForm.medicationPermission ? "Granted" : "Not Granted"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Medical Records Tab */}
        <TabsContent value="medical-records">
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-gray-700">Medical Records</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search records..."
                  className="pl-8 text-sm h-9"
                  value={recordSearchQuery}
                  onChange={(e) => setRecordSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              {medicalRecords.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Form Type</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          Loading records...
                        </TableCell>
                      </TableRow>
                    ) : filteredMedicalRecords.length > 0 ? (
                      filteredMedicalRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.id.slice(0, 8)}</TableCell>
                          <TableCell>{record.formType}</TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {record.notes || 'No notes'}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              record.status === "APPROVED"
                                ? "bg-green-100 text-green-800"
                                : record.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}>
                              {record.status}
                            </span>
                          </TableCell>
                          <TableCell>{format(new Date(record.updatedAt), "MMM d, yyyy")}</TableCell>
                          <TableCell className="space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="View record"
                              className="text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                              onClick={() => window.open(record.filePath, '_blank')}
                            >
                              <Eye className="h-5 w-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="Download record"
                              className="text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                              onClick={() => handleDownloadFile(record.filePath)}
                            >
                              <Download className="h-5 w-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="Print record"
                              className="text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                              onClick={() => handlePrintFile(record.filePath)}
                            >
                              <Printer className="h-5 w-5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No records match your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No medical records available for this student.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 