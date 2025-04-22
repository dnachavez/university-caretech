"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "@/store/auth-store"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, FileText, Stethoscope, Activity, Syringe, FlaskConical, History } from "lucide-react"

export default function MedicalPage() {
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

  // Define medical services
  const medicalServices = [
    {
      title: "Schedule Consultation",
      description: "Book an appointment with our healthcare providers",
      href: "/fs/medical/consultation",
      icon: Stethoscope,
      color: "blue"
    },
    {
      title: "Request Medical Clearance",
      description: "Apply for your medical clearance documents",
      href: "/fs/medical/clearance",
      icon: FileText,
      color: "green"
    },
    {
      title: "View Medical History",
      description: "Access your complete medical record history",
      href: "/fs/medical/history",
      icon: History,
      color: "purple"
    },
    {
      title: "Immunization Records",
      description: "View your vaccination history and status",
      href: "/fs/medical/immunization",
      icon: Syringe,
      color: "orange"
    },
    {
      title: "Laboratory Results",
      description: "Check your lab test results and reports",
      href: "/fs/medical/lab-results",
      icon: FlaskConical,
      color: "red"
    },
    {
      title: "Health Monitoring",
      description: "Track your vital signs and health metrics",
      href: "/fs/medical/others",
      icon: Activity,
      color: "pink"
    }
  ]
  
  // Map color names to TailwindCSS color classes
  const colorMap: Record<string, { bg: string, text: string, icon: string }> = {
    blue: { bg: "bg-blue-100", text: "text-blue-600", icon: "text-blue-600" },
    green: { bg: "bg-green-100", text: "text-green-600", icon: "text-green-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600", icon: "text-purple-600" },
    orange: { bg: "bg-orange-100", text: "text-orange-600", icon: "text-orange-600" },
    red: { bg: "bg-red-100", text: "text-red-600", icon: "text-red-600" },
    pink: { bg: "bg-pink-100", text: "text-pink-600", icon: "text-pink-600" }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Custom Page Header with Breadcrumb */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">Health Form</h1>
          <p className="text-gray-500">
            Access our healthcare services and your medical records
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/fs/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Medical</span>
        </nav>
      </div>

      {/* Medical Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {medicalServices.map((service, index) => {
          const IconComponent = service.icon
          const colors = colorMap[service.color]
          
          return (
            <Link href={service.href} key={index}>
              <Card className="bg-white shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`h-12 w-12 rounded-full ${colors.bg} flex items-center justify-center`}>
                      <IconComponent className={`h-6 w-6 ${colors.icon}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-gray-700">{service.title}</h3>
                      <p className="text-gray-500 text-sm mt-1">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
} 