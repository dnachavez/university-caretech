"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "@/store/auth-store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, FileText, Upload, PlusCircle } from "lucide-react"

export default function FormsPage() {
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
      {/* Custom Page Header with Breadcrumb */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">Health Forms</h1>
          <p className="text-gray-500">
            Manage and submit your health documents
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/fs/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Forms</span>
        </nav>
      </div>

      {/* Form Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link href="/fs/forms/new">
          <Card className="bg-white shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <PlusCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg text-gray-700">Create New Form</h3>
                  <p className="text-gray-500 text-sm mt-1">Fill out a new health information form</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/fs/forms/upload">
          <Card className="bg-white shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg text-gray-700">Upload Existing Form</h3>
                  <p className="text-gray-500 text-sm mt-1">Upload already completed health forms</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Your Forms Section - Placeholder */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Forms</h2>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No forms submitted yet</h3>
            <p className="text-gray-500 mb-6">You haven't submitted any health forms yet.</p>
            <div className="flex justify-center space-x-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/fs/forms/new">Create New Form</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/fs/forms/upload">Upload Form</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 