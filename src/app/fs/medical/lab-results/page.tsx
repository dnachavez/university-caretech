"use client"

import { useEffect } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/features/medical/components/page-header"
import { MedicalRecordTable } from "@/features/medical/components/medical-record-table"
import { useMedicalRecords } from "@/hooks/useMedicalRecords"
import { useAuthStore } from "@/store/auth-store" 
import { useRouter } from "next/navigation"

export default function LabResultsPage() {
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
  
  const { 
    filteredRecords, 
    loading, 
    searchQuery, 
    setSearchQuery 
  } = useMedicalRecords('lab')
  
  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Laboratory Results" 
        description="View your laboratory test results and diagnostic reports." 
        currentPage="Lab Results"
        baseUrl="/fs"
      />

      {/* Lab Results Card with Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-gray-700">Lab Test Results</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search records..."
              className="pl-8 text-sm h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <MedicalRecordTable 
            records={filteredRecords} 
            loading={loading} 
            downloadPrefix="Lab_Results"
          />
        </CardContent>
      </Card>
    </div>
  )
} 