"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, Upload, FileText, Search, Plus, Check, X } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"
import { 
  generateUniqueId,
  fileToDataUrl,
  uploadFile
} from "@/utils/file-utils"
import { FormType } from "@/features/health/types/form-types"
import { prisma } from "@/lib/prisma"

interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

interface MedicalRecord {
  id: string
  userId: string
  formType: FormType
  filePath: string
  notes?: string
  status: string
  user?: {
    firstName: string
    lastName: string
    email: string
    role: string
  }
  createdAt: string
  updatedAt: string
}

export default function AdminMedicalRecordsPage() {
  // State
  const [selectedTab, setSelectedTab] = useState<string>("upload")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [formType, setFormType] = useState<FormType>("")
  const [notes, setNotes] = useState<string>("")
  const [status, setStatus] = useState<string>("PENDING")
  const [userSearchQuery, setUserSearchQuery] = useState<string>("")
  const [userResults, setUserResults] = useState<UserData[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [isLoadingRecords, setIsLoadingRecords] = useState<boolean>(false)
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Router
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  
  // Protect this route
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth')
      return
    }
    
    // Verify this is an admin
    if (user.role !== 'ADMIN') {
      router.push(user.role === 'STUDENT' ? '/student/dashboard' : '/fs/dashboard')
    }
  }, [isAuthenticated, user, router])
  
  // Load records when tab changes
  useEffect(() => {
    if (selectedTab === "manage") {
      loadRecords()
    }
  }, [selectedTab])
  
  const loadRecords = async () => {
    setIsLoadingRecords(true)
    try {
      const response = await fetch('/api/admin/medical-records')
      const data = await response.json()
      
      if (data.success) {
        setRecords(data.records)
      } else {
        toast.error(data.message || "Failed to load records")
      }
    } catch (error) {
      toast.error(`Error loading records: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoadingRecords(false)
    }
  }
  
  const handleSearchUsers = async () => {
    if (userSearchQuery.trim().length < 3) {
      toast.error("Please enter at least 3 characters to search")
      return
    }
    
    setIsSearching(true)
    try {
      const response = await fetch(`/api/admin/users/search?q=${encodeURIComponent(userSearchQuery)}`)
      const data = await response.json()
      
      if (data.success) {
        setUserResults(data.users)
      } else {
        toast.error(data.message || "User search failed")
      }
    } catch (error) {
      toast.error(`Error searching users: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSearching(false)
    }
  }
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // Convert FileList to array and add to state
      const filesArray = Array.from(files)
      setUploadedFiles(filesArray)
    }
  }
  
  const handleOpenFilePicker = () => {
    fileInputRef.current?.click()
  }
  
  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }
  
  const handleSubmit = async () => {
    // Validation
    if (!selectedUser) {
      toast.error("Please select a user")
      return
    }
    
    if (!formType) {
      toast.error("Please select a form type")
      return
    }
    
    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one file")
      return
    }
    
    setIsUploading(true)
    try {
      // Upload each file and get its URL
      const uploadPromises = uploadedFiles.map(async (file) => {
        const fileUrl = await uploadFile(file)
        return fileUrl
      })
      
      const fileUrls = await Promise.all(uploadPromises)
      
      // Submit the form data to our API
      const response = await fetch('/api/admin/medical-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser,
          adminId: user?.id,
          files: fileUrls.map(url => ({
            filePath: url,
            formType,
            notes,
            status,
          })),
        }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        toast.success(result.message || "Records uploaded successfully")
        
        // Reset form
        setUploadedFiles([])
        setSelectedUser("")
        setFormType("")
        setNotes("")
        setStatus("PENDING")
        setUserSearchQuery("")
        setUserResults([])
        
        // Switch to manage tab
        setSelectedTab("manage")
      } else {
        toast.error(result.message || "Failed to upload records")
      }
    } catch (error) {
      toast.error(`Error uploading records: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsUploading(false)
    }
  }
  
  const handleUpdateRecordStatus = async (recordId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/medical-records/${recordId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        toast.success(result.message || "Record updated successfully")
        
        // Update local state
        setRecords(prev => 
          prev.map(record => 
            record.id === recordId 
              ? { ...record, status: newStatus } 
              : record
          )
        )
      } else {
        toast.error(result.message || "Failed to update record")
      }
    } catch (error) {
      toast.error(`Error updating record: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
  
  const handleDeleteRecord = async (recordId: string) => {
    if (!confirm("Are you sure you want to delete this record?")) {
      return
    }
    
    try {
      const response = await fetch(`/api/admin/medical-records/${recordId}`, {
        method: 'DELETE',
      })
      
      const result = await response.json()
      
      if (result.success) {
        toast.success(result.message || "Record deleted successfully")
        
        // Update local state
        setRecords(prev => prev.filter(record => record.id !== recordId))
      } else {
        toast.error(result.message || "Failed to delete record")
      }
    } catch (error) {
      toast.error(`Error deleting record: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
  
  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Custom Page Header with Breadcrumb */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">Medical Records Management</h1>
          <p className="text-gray-500">
            Upload and manage medical records for students, faculty, and staff
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/admin/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Medical Records</span>
        </nav>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full md:w-1/3 grid-cols-2">
          <TabsTrigger value="upload">Upload Records</TabsTrigger>
          <TabsTrigger value="manage">Manage Records</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Medical Records</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Selection */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Select User</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search by name or email"
                    value={userSearchQuery}
                    onChange={e => setUserSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSearchUsers} 
                    disabled={isSearching || userSearchQuery.trim().length < 3}
                  >
                    {isSearching ? "Searching..." : "Search"}
                  </Button>
                </div>
                
                {userResults.length > 0 && (
                  <div className="border rounded-md p-4 max-h-60 overflow-y-auto space-y-2">
                    {userResults.map(user => (
                      <div 
                        key={user.id}
                        className={`p-2 border rounded-md cursor-pointer hover:bg-gray-50 flex justify-between items-center ${selectedUser === user.id ? 'border-blue-500 bg-blue-50' : ''}`}
                        onClick={() => setSelectedUser(user.id)}
                      >
                        <div>
                          <p className="font-medium">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-gray-500">{user.email} • {user.role}</p>
                        </div>
                        {selectedUser === user.id && <Check className="h-5 w-5 text-blue-500" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* File Upload */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Upload Files</h3>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  onClick={handleOpenFilePicker}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <Upload className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, PNG, JPG, DOC, or DOCX (max 10MB)
                  </p>
                </div>
                
                {/* File list */}
                {uploadedFiles.length > 0 && (
                  <div className="border rounded-md divide-y">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="p-3 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemoveFile(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Form Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Record Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Record Type</label>
                    <Select 
                      value={formType} 
                      onValueChange={(value) => setFormType(value as FormType)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select record type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="vaccination">Vaccination</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-500">Status</label>
                    <Select 
                      value={status} 
                      onValueChange={setStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="APPROVED">Approved</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Notes (Optional)</label>
                  <Textarea
                    placeholder="Add notes about this record"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleSubmit}
                disabled={isUploading || !selectedUser || !formType || uploadedFiles.length === 0}
              >
                {isUploading ? "Uploading..." : "Upload Records"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manage" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Medical Records</CardTitle>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={loadRecords}
                disabled={isLoadingRecords}
              >
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              {isLoadingRecords ? (
                <p className="text-center py-4">Loading records...</p>
              ) : records.length === 0 ? (
                <p className="text-center py-4 text-gray-500">No records found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Record Type</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {records.map(record => (
                        <tr key={record.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-sm">{record.user?.firstName} {record.user?.lastName}</p>
                              <p className="text-xs text-gray-500">{record.user?.role}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 capitalize">{record.formType}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              record.status === 'APPROVED' 
                                ? 'bg-green-100 text-green-800' 
                                : record.status === 'REJECTED'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {record.status.toLowerCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {new Date(record.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(record.filePath, '_blank')}
                            >
                              View
                            </Button>
                            
                            <Select 
                              value={record.status} 
                              onValueChange={(value) => handleUpdateRecordStatus(record.id, value)}
                            >
                              <SelectTrigger className="h-8 w-32 inline-flex">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="APPROVED">Approve</SelectItem>
                                <SelectItem value="REJECTED">Reject</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDeleteRecord(record.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 