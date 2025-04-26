"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuthStore } from "@/store/auth-store"
import { HealthForm } from "@/features/health/components/health-form"

export default function AdminUserHealthFormPage({ 
  params 
}: { 
  params: { userId: string } 
}) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Protect this route
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth')
      return
    }
    
    // Verify this is an admin
    if (user.role !== 'ADMIN') {
      router.push(user.role === 'STUDENT' ? '/student/dashboard' : user.role === 'FACULTY' || user.role === 'STAFF' ? '/fs/dashboard' : '/admin/dashboard')
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/admin/users/${params.userId}`)
        const data = await response.json()
        if (data.user) {
          setUserData(data.user)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [isAuthenticated, user, router, params.userId])

  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">
            User Health Form
          </h1>
          <p className="text-gray-500">
            Edit health form information for user
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
        <Link href={`/admin/users/${params.userId}/profile`} className="hover:text-blue-600">
          User Profile
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-700 font-medium">Health Form</span>
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

      {/* Health Form */}
      <HealthForm baseUrl="/admin" userType="admin" isAdmin={true} />
    </div>
  )
} 