"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  ChevronRight, 
  FileText, 
  ExternalLink, 
  Loader2, 
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  RefreshCw,
  User
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

interface UploadedForm {
  id: string
  userId: string
  formType: string
  filePath: string
  notes: string
  status: string
  createdAt: string
  updatedAt: string
  user?: User
}

export default function AdminHealthFormsPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [forms, setForms] = useState<UploadedForm[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedForm, setSelectedForm] = useState<UploadedForm | null>(null)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [updatedNotes, setUpdatedNotes] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [userTypeFilter, setUserTypeFilter] = useState<string | null>(null)
  
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
  
  // Fetch forms data
  useEffect(() => {
    if (isAuthenticated && user?.role === 'ADMIN') {
      fetchForms()
    }
  }, [isAuthenticated, user])
  
  const fetchForms = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/forms?userId=${user?.id}&role=${user?.role}`)
      const data = await response.json()
      
      if (data.success) {
        setForms(data.forms)
      } else {
        console.error("Failed to fetch forms:", data.message)
      }
    } catch (error) {
      console.error("Error fetching forms:", error)
    } finally {
      setLoading(false)
    }
  }
  
  const updateFormStatus = async (formId: string, status: string, message?: string) => {
    try {
      const response = await fetch(`/api/admin/forms/update-status?userId=${user?.id}&role=${user?.role}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId,
          status,
          message,
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success(data.message || 'Form status updated')
        fetchForms() // Refresh the list
      } else {
        toast.error(data.message || 'Failed to update form status')
      }
    } catch (error) {
      toast.error('Error updating form status')
      console.error('Error updating form status:', error)
    }
  }
  
  const updateFormNotes = async (formId: string, notes: string) => {
    try {
      const response = await fetch(`/api/admin/forms/update?userId=${user?.id}&role=${user?.role}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId,
          notes,
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success(data.message || 'Form updated successfully')
        fetchForms() // Refresh the list
      } else {
        toast.error(data.message || 'Failed to update form')
      }
    } catch (error) {
      toast.error('Error updating form')
      console.error('Error updating form:', error)
    }
  }
  
  const handleApprove = (form: UploadedForm) => {
    updateFormStatus(form.id, 'APPROVED')
  }
  
  const handleReject = (form: UploadedForm) => {
    setSelectedForm(form)
    setRejectReason("")
    setShowRejectDialog(true)
  }
  
  const confirmReject = () => {
    if (selectedForm) {
      updateFormStatus(selectedForm.id, 'REJECTED', rejectReason)
      setShowRejectDialog(false)
    }
  }
  
  const handleUpdate = (form: UploadedForm) => {
    setSelectedForm(form)
    setUpdatedNotes(form.notes || "")
    setShowUpdateDialog(true)
  }
  
  const confirmUpdate = () => {
    if (selectedForm) {
      updateFormNotes(selectedForm.id, updatedNotes)
      setShowUpdateDialog(false)
    }
  }
  
  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      case 'APPROVED':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
      case 'REJECTED':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
  
  const getFormTypeLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case 'health':
        return 'Health Form'
      case 'medical':
        return 'Medical Certificate'
      case 'vaccination':
        return 'Vaccination Record'
      default:
        return type
    }
  }
  
  const getUserRole = (role: string) => {
    switch (role.toUpperCase()) {
      case 'STUDENT':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Student</Badge>
      case 'FACULTY':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Faculty</Badge>
      case 'STAFF':
        return <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">Staff</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }
  
  // Filter and search forms
  const filteredForms = forms.filter(form => {
    const matchesSearch = searchTerm === "" || 
      (form.user && `${form.user.firstName} ${form.user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
      form.formType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === null || form.status.toUpperCase() === statusFilter
    
    const matchesUserType = userTypeFilter === null || 
      (form.user && form.user.role.toUpperCase() === userTypeFilter)
    
    return matchesSearch && matchesStatus && matchesUserType
  })

  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Custom Header with Breadcrumb */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">Health Form Submissions</h1>
          <p className="text-gray-500">
            Manage and review health form submissions from students, faculty and staff
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/admin/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Health Forms</span>
        </nav>
      </div>

      {/* Filters and search */}
      <div className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, form type or notes..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant={statusFilter === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(null)}
                  className={statusFilter === null ? "bg-[#166cbb]" : ""}
                >
                  All
                </Button>
                <Button 
                  variant={statusFilter === 'PENDING' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter('PENDING')}
                  className={statusFilter === 'PENDING' ? "bg-[#f59e0b] hover:bg-[#d97706]" : ""}
                >
                  <AlertCircle className="h-3.5 w-3.5 mr-1" />
                  Pending
                </Button>
                <Button 
                  variant={statusFilter === 'APPROVED' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter('APPROVED')}
                  className={statusFilter === 'APPROVED' ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Approved
                </Button>
                <Button 
                  variant={statusFilter === 'REJECTED' ? "default" : "outline"}
                  size="sm" 
                  onClick={() => setStatusFilter('REJECTED')}
                  className={statusFilter === 'REJECTED' ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  <XCircle className="h-3.5 w-3.5 mr-1" />
                  Rejected
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant={userTypeFilter === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserTypeFilter(null)}
                  className={userTypeFilter === null ? "bg-[#166cbb]" : ""}
                >
                  <User className="h-3.5 w-3.5 mr-1" />
                  All
                </Button>
                <Button 
                  variant={userTypeFilter === 'STUDENT' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserTypeFilter('STUDENT')}
                  className={userTypeFilter === 'STUDENT' ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  Student
                </Button>
                <Button 
                  variant={userTypeFilter === 'FACULTY' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserTypeFilter('FACULTY')}
                  className={userTypeFilter === 'FACULTY' ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  Faculty
                </Button>
                <Button 
                  variant={userTypeFilter === 'STAFF' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserTypeFilter('STAFF')}
                  className={userTypeFilter === 'STAFF' ? "bg-teal-600 hover:bg-teal-700" : ""}
                >
                  Staff
                </Button>
              </div>
              
              <Button variant="outline" size="icon" onClick={fetchForms} title="Refresh">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forms List */}
      <Card>
        <CardHeader>
          <CardTitle>Health Form Submissions</CardTitle>
          <CardDescription>
            {filteredForms.length} {filteredForms.length === 1 ? 'form' : 'forms'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : filteredForms.length === 0 ? (
            <div className="text-center py-8 border border-dashed rounded-md bg-gray-50">
              <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No forms found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search filters</p>
              <Button variant="outline" size="sm" onClick={() => {
                setSearchTerm("")
                setStatusFilter(null)
                setUserTypeFilter(null)
              }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Form Type</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredForms.map((form) => (
                  <TableRow key={form.id}>
                    <TableCell className="font-medium">
                      {form.user ? `${form.user.firstName} ${form.user.lastName}` : 'Unknown User'}
                    </TableCell>
                    <TableCell>
                      {form.user ? getUserRole(form.user.role) : '-'}
                    </TableCell>
                    <TableCell>{getFormTypeLabel(form.formType)}</TableCell>
                    <TableCell>{format(new Date(form.createdAt), 'MMM d, yyyy')}</TableCell>
                    <TableCell>{getStatusBadge(form.status)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{form.notes || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <a 
                          href={form.filePath} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {form.status !== 'APPROVED' && (
                              <DropdownMenuItem onClick={() => handleApprove(form)}>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                Approve
                              </DropdownMenuItem>
                            )}
                            {form.status !== 'REJECTED' && (
                              <DropdownMenuItem onClick={() => handleReject(form)}>
                                <XCircle className="h-4 w-4 mr-2 text-red-600" />
                                Reject
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleUpdate(form)}>
                              <FileText className="h-4 w-4 mr-2 text-blue-600" />
                              Update Notes
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Form</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this form.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Reason for rejection"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={confirmReject}
              className="bg-red-600 hover:bg-red-700"
              disabled={!rejectReason.trim()}
            >
              Reject Form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Update Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Form Notes</DialogTitle>
            <DialogDescription>
              Update the notes for this form submission.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Form notes"
              value={updatedNotes}
              onChange={(e) => setUpdatedNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={confirmUpdate}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Update Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 