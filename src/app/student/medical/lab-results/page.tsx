"use client"

import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/features/medical/components/page-header"
import { MedicalRecordTable } from "@/features/medical/components/medical-record-table"
import { useMedicalRecords } from "@/hooks/useMedicalRecords"

export default function LabResultsPage() {
  const { 
    filteredRecords, 
    loading, 
    searchQuery, 
    setSearchQuery 
  } = useMedicalRecords('health')
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Lab Results" 
        description="Access and download your laboratory test results." 
        currentPage="Lab Results"
      />

      {/* Lab Results Card with Table */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-gray-700">Laboratory Records</CardTitle>
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
            downloadPrefix="Lab_Result"
          />
        </CardContent>
      </Card>
    </div>
  )
} 