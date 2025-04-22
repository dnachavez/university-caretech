"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Printer } from "lucide-react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { PageHeader } from "@/features/medical/components/page-header"
import { useAuthStore } from "@/store/auth-store"

// Mock data for UI development
const mockStudentData = {
  id: "1",
  lastName: "Dela Cruz",
  firstName: "Juan",
  middleInitial: "P",
  course: "BSIT",
  yearLevel: "3rd Year",
  studentNumber: "2021-12345",
}

const mockHealthFormData = {
  id: "hf-1",
  studentId: "1",
  dateSubmitted: "2023-08-15",
  lastUpdated: "2023-08-15",
  status: "Approved",
  height: "170 cm",
  weight: "65 kg",
  bloodType: "O+",
  vision: {
    left: "20/20",
    right: "20/20",
    withGlasses: false
  },
  allergies: ["Seafood", "Peanuts"],
  medicalConditions: ["Asthma"],
  medications: ["Ventolin inhaler as needed"],
  familyHistory: {
    diabetes: true,
    heartDisease: false,
    cancer: true,
    hypertension: true,
    others: "Thyroid disease"
  },
  lastPhysicalExam: "2023-07-20",
  primaryPhysician: "Dr. Maria Santos",
  emergencyContact: {
    name: "Pedro Dela Cruz",
    relationship: "Father",
    phone: "09187654321",
    address: "123 Main St., Quezon City"
  }
}

export default function StudentHealthFormPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [student, setStudent] = useState<typeof mockStudentData | null>(null)
  const [healthForm, setHealthForm] = useState<typeof mockHealthFormData | null>(null)
  
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
    // For UI development, we'll just use mock data
    // In a real app, we would fetch the student and health form data from the API
    setStudent(mockStudentData)
    setHealthForm(mockHealthFormData)
  }, [params.id])
  
  if (!student || !healthForm || !isAuthenticated || !user) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  const handlePrint = () => {
    window.print()
  }
  
  const viewStudentRecords = (studentId: string) => {
    router.push(`/fs/student-records/${studentId}`)
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Student Health Form"
        description={`${student.lastName}, ${student.firstName} ${student.middleInitial}.`}
        currentPage="Health Form"
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
        <Link href={`/fs/student-records/${params.id}`} className="hover:text-blue-600">
          Student Details
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-700 font-medium">Health Form</span>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Button 
          className="bg-[#166cbb] hover:bg-[#1259a1]"
          onClick={handlePrint}
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Form
        </Button>
      </div>
      
      {/* Form Status */}
      <div className={`mb-6 p-4 rounded-lg ${
        healthForm.status === 'Approved' ? 'bg-green-100 text-green-800' : 
        healthForm.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
        'bg-red-100 text-red-800'
      }`}>
        <div className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          <div>
            <p className="font-medium">Status: {healthForm.status}</p>
            <p className="text-sm">Last Updated: {healthForm.lastUpdated}</p>
          </div>
        </div>
      </div>
      
      {/* Health Form Content */}
      <div className="space-y-6 print:space-y-4">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-700">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Username:</span>
                <p className="font-medium">{student.studentNumber}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Full Name:</span>
                <p className="font-medium">{student.lastName}, {student.firstName} {student.middleInitial}.</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Course & Year:</span>
                <p className="font-medium">{student.course} - {student.yearLevel}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-700">Physical Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-500">Height:</span>
                <p className="font-medium">{healthForm.height}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Weight:</span>
                <p className="font-medium">{healthForm.weight}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Blood Type:</span>
                <p className="font-medium">{healthForm.bloodType}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Vision (Left):</span>
                <p className="font-medium">{healthForm.vision.left}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Vision (Right):</span>
                <p className="font-medium">{healthForm.vision.right}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Wears Glasses:</span>
                <p className="font-medium">{healthForm.vision.withGlasses ? "Yes" : "No"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-700">Medical Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">Allergies:</span>
                {healthForm.allergies.length > 0 ? (
                  <ul className="list-disc list-inside ml-2">
                    {healthForm.allergies.map((allergy, index) => (
                      <li key={index} className="font-medium">{allergy}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-medium">None</p>
                )}
              </div>
              
              <div>
                <span className="text-sm text-gray-500">Medical Conditions:</span>
                {healthForm.medicalConditions.length > 0 ? (
                  <ul className="list-disc list-inside ml-2">
                    {healthForm.medicalConditions.map((condition, index) => (
                      <li key={index} className="font-medium">{condition}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-medium">None</p>
                )}
              </div>
              
              <div>
                <span className="text-sm text-gray-500">Current Medications:</span>
                {healthForm.medications.length > 0 ? (
                  <ul className="list-disc list-inside ml-2">
                    {healthForm.medications.map((medication, index) => (
                      <li key={index} className="font-medium">{medication}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-medium">None</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-700">Family Medical History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Diabetes:</span>
                <p className="font-medium">{healthForm.familyHistory.diabetes ? "Yes" : "No"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Heart Disease:</span>
                <p className="font-medium">{healthForm.familyHistory.heartDisease ? "Yes" : "No"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Cancer:</span>
                <p className="font-medium">{healthForm.familyHistory.cancer ? "Yes" : "No"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Hypertension:</span>
                <p className="font-medium">{healthForm.familyHistory.hypertension ? "Yes" : "No"}</p>
              </div>
              {healthForm.familyHistory.others && (
                <div className="col-span-2">
                  <span className="text-sm text-gray-500">Other Conditions:</span>
                  <p className="font-medium">{healthForm.familyHistory.others}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-700">Medical Care</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Last Physical Examination:</span>
                <p className="font-medium">{healthForm.lastPhysicalExam}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Primary Physician:</span>
                <p className="font-medium">{healthForm.primaryPhysician}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-700">Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Name:</span>
                <p className="font-medium">{healthForm.emergencyContact.name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Relationship:</span>
                <p className="font-medium">{healthForm.emergencyContact.relationship}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Phone Number:</span>
                <p className="font-medium">{healthForm.emergencyContact.phone}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Address:</span>
                <p className="font-medium">{healthForm.emergencyContact.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 