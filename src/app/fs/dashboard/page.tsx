"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, FileText, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function FacultyStaffDashboard() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  
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
  
  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Custom Dashboard Header with Breadcrumb */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">Dashboard</h1>
          <p className="text-gray-500">
            Welcome back, {user.firstName}!
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Dashboard</span>
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/fs/medical/consultation">
            <Card className="bg-white shadow-sm hover:border-blue-500 transition-all cursor-pointer">
              <CardContent className="flex">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Schedule a Consultation</h3>
                  <p className="text-muted-foreground">Book an appointment with a healthcare provider</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/fs/medical/clearance">
            <Card className="bg-white shadow-sm hover:border-blue-500 transition-all cursor-pointer">
              <CardContent className="flex">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Request Medical Clearance</h3>
                  <p className="text-muted-foreground">Apply for your medical clearance documents</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
} 