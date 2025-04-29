"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  User, 
  Building, 
  Mail, 
  ChevronRight, 
  GraduationCap
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"

interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
}

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  yearLevel?: string;
  departmentId?: string;
  status: string;
  createdAt: string;
  healthForm?: {
    id: string;
    middleInitial?: string;
    gender: string;
    birthdate: string;
    birthPlace: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    bloodType?: string;
    signaturePath: string;
  }
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user: currentUser, isAuthenticated } = useAuthStore()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [department, setDepartment] = useState<Department | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      try {
        // First try to fetch from admin API
        let response = await fetch(`/api/admin/users/${params.id}`)
        
        // If it fails and the user is not an admin, try faculty/staff endpoint
        if (!response.ok && currentUser?.role !== 'ADMIN') {
          response = await fetch(`/api/fs/users/${params.id}`)
        }
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch user details")
        }
        
        const data = await response.json()
        setUser(data.user)
        
        // If user has department, fetch department info
        if (data.user.departmentId || data.user.healthForm?.departmentId) {
          const deptId = data.user.departmentId || data.user.healthForm?.departmentId
          fetchDepartment(deptId)
        }
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError(typeof err === 'object' && err !== null ? (err as Error).message : "Failed to load user information")
      } finally {
        setIsLoading(false)
      }
    }
    
    if (isAuthenticated) {
      fetchUserData()
    } else {
      router.push('/auth')
    }
  }, [params.id, isAuthenticated, router, currentUser?.role])
  
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
  
  if (!isAuthenticated) {
    return null // Don't render anything while checking auth
  }
  
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
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-500">
            {user.role === 'STUDENT' ? 'Student' : user.role === 'FACULTY' ? 'Faculty' : 'Staff'} Profile
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/directory" className="hover:text-blue-600">
            Directory
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Profile</span>
        </nav>
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
            ) : user.role === 'FACULTY' ? (
              <User className="h-5 w-5 mr-2 text-blue-500" />
            ) : (
              <Building className="h-5 w-5 mr-2 text-blue-500" />
            )}
            <CardTitle className="text-gray-700">
              {user.role === 'STUDENT' ? 'Student' : user.role === 'FACULTY' ? 'Faculty' : 'Staff'} Information
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Full Name:</span>
                <p className="font-medium">
                  {user.lastName}, {user.firstName} {user.healthForm?.middleInitial || ""}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email Address:</span>
                <p className="font-medium">
                  <Mail className="inline h-4 w-4 mr-1 text-gray-400" />
                  {user.email}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Role:</span>
                <p className="font-medium">{user.role}</p>
              </div>
              {department && (
                <div>
                  <span className="text-sm text-gray-500">Department:</span>
                  <p className="font-medium">
                    <Building className="inline h-4 w-4 mr-1 text-gray-400" />
                    {department.name}
                  </p>
                </div>
              )}
              {user.role === 'STUDENT' && user.yearLevel && (
                <div>
                  <span className="text-sm text-gray-500">Year Level:</span>
                  <p className="font-medium">
                    <GraduationCap className="inline h-4 w-4 mr-1 text-gray-400" />
                    {user.yearLevel}
                  </p>
                </div>
              )}
            </div>
            
            {user.healthForm && (
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-500">Gender:</span>
                  <p className="font-medium">{user.healthForm.gender}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Birthdate:</span>
                  <p className="font-medium">
                    {user.healthForm.birthdate && format(new Date(user.healthForm.birthdate), "MMMM d, yyyy")}
                  </p>
                </div>
                {user.healthForm.birthPlace && (
                  <div>
                    <span className="text-sm text-gray-500">Birth Place:</span>
                    <p className="font-medium">{user.healthForm.birthPlace}</p>
                  </div>
                )}
                {user.healthForm.bloodType && (
                  <div>
                    <span className="text-sm text-gray-500">Blood Type:</span>
                    <p className="font-medium">{user.healthForm.bloodType}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 