"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"
import { MedicalRecord } from "@/features/medical/types/record-types"
import { fetchMedicalRecords } from "@/services/medical-service"
import { formatDate } from "@/utils/date-utils"
import { fetchClearanceRequests } from "@/services/clearance-service"

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
        if (formType === 'clearance') {
          // For clearance, fetch both uploaded forms and clearance requests
          const [formsResponse, clearanceResponse] = await Promise.all([
            fetchMedicalRecords(user.id, 'clearance'),
            fetchClearanceRequests()
          ]);
          
          let combinedRecords: MedicalRecord[] = [];
          
          // Add uploaded forms if any
          if (formsResponse.success && formsResponse.forms) {
            combinedRecords = [...formsResponse.forms];
          }
          
          // Convert clearance requests to the MedicalRecord format and add them
          if (clearanceResponse.success && clearanceResponse.clearanceRequests) {
            const clearanceRecords = clearanceResponse.clearanceRequests.map(req => ({
              id: req.id,
              formType: 'Clearance Request',
              notes: `${req.reason}${req.otherReason ? ': ' + req.otherReason : ''} - ${req.purpose}`,
              status: req.status,
              filePath: '', // No file for clearance requests
              createdAt: req.createdAt,
              updatedAt: req.updatedAt,
              departmentName: req.department?.name || 'Unknown Department'
            }));
            
            combinedRecords = [...combinedRecords, ...clearanceRecords];
          }
          
          setRecords(combinedRecords);
        } else {
          // For other forms, just fetch from the regular endpoint
          const response = await fetchMedicalRecords(user.id, formType);
          
          if (response.success && response.forms) {
            setRecords(response.forms);
          } else {
            toast.error(response.message || 'Failed to load records');
          }
        }
      } catch (error) {
        console.error(`Error fetching ${formType} records:`, error);
        toast.error('An error occurred while fetching your records');
      } finally {
        setLoading(false);
      }
    };
    
    loadRecords();
  }, [user, formType]);
  
  // Filter records based on search query
  const filteredRecords = records.filter(record => 
    record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.formType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (record.notes && record.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
    record.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (record.departmentName && record.departmentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    formatDate(record.updatedAt).toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return {
    records,
    filteredRecords,
    loading,
    searchQuery,
    setSearchQuery
  };
} 