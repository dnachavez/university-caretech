"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"
import { MedicalRecord } from "@/features/medical/types/record-types"
import { fetchMedicalRecords } from "@/services/medical-service"
import { formatDate } from "@/utils/date-utils"

export function useMedicalRecords(formType: string) {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuthStore()
  
  // Fetch records on hook initialization
  useEffect(() => {
    const loadRecords = async () => {
      if (!user?.id) return
      
      try {
        const response = await fetchMedicalRecords(user.id, formType)
        
        if (response.success && response.forms) {
          setRecords(response.forms)
        } else {
          toast.error(response.message || 'Failed to load records')
        }
      } catch (error) {
        console.error(`Error fetching ${formType} records:`, error)
        toast.error('An error occurred while fetching your records')
      } finally {
        setLoading(false)
      }
    }
    
    loadRecords()
  }, [user, formType])
  
  // Filter records based on search query
  const filteredRecords = records.filter(record => 
    record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.formType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (record.notes && record.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
    record.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    formatDate(record.updatedAt).toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return {
    records,
    filteredRecords,
    loading,
    searchQuery,
    setSearchQuery
  }
} 