"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"
import { ClearanceRequest, fetchClearanceRequests } from "@/services/clearance-service"

export function useClearanceRequests() {
  const [requests, setRequests] = useState<ClearanceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuthStore()
  
  // Fetch clearance requests on hook initialization
  useEffect(() => {
    const loadRequests = async () => {
      if (!user?.id) return
      
      try {
        const response = await fetchClearanceRequests()
        if (response.success && response.clearanceRequests) {
          setRequests(response.clearanceRequests)
        } else {
          toast.error(response.message || 'Failed to load clearance requests')
        }
      } catch (error) {
        console.error('Error fetching clearance requests:', error)
        toast.error('An error occurred while fetching your clearance requests')
      } finally {
        setLoading(false)
      }
    }
    
    loadRequests()
  }, [user])
  
  // Filter requests based on search query
  const filteredRequests = requests.filter(request =>
    request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (request.department?.name && request.department.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    request.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (request.otherReason && request.otherReason?.toLowerCase().includes(searchQuery.toLowerCase())) ||
    request.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.status.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return {
    requests,
    filteredRequests,
    loading,
    searchQuery,
    setSearchQuery,
    refreshRequests: () => {
      setLoading(true)
      fetchClearanceRequests()
        .then(response => {
          if (response.success && response.clearanceRequests) {
            setRequests(response.clearanceRequests)
          }
        })
        .finally(() => setLoading(false))
    }
  }
} 