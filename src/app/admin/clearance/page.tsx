"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { 
  ChevronRight, FileText, CheckCircle2, 
  XCircle, Upload, Download, Clock, 
  CheckCheck, AlertCircle, Eye
} from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

// Sample clearance requests data - replace with actual API call
const mockClearanceRequests = [
  {
    id: 1,
    studentName: "John Doe",
    studentId: "S12345",
    studentAvatar: "",
    requestDate: "2023-09-20",
    purpose: "Physical Education Class",
    status: "PENDING",
    notes: "Need clearance for joining the basketball team",
    documents: []
  },
  {
    id: 2,
    studentName: "Maria Garcia",
    studentId: "S67890",
    studentAvatar: "",
    requestDate: "2023-09-18",
    purpose: "Internship Requirement",
    status: "APPROVED",
    notes: "Required for hospital internship",
    documents: ["medical_clearance_67890.pdf"]
  },
  {
    id: 3,
    studentName: "Carlos Rivera",
    studentId: "S54321",
    studentAvatar: "",
    requestDate: "2023-09-22",
    purpose: "Sports Competition",
    status: "PENDING",
    notes: "Regional swimming competition",
    documents: []
  },
  {
    id: 4,
    studentName: "Ahmed Khan",
    studentId: "S24680",
    studentAvatar: "",
    requestDate: "2023-09-15",
    purpose: "Overseas Exchange Program",
    status: "REJECTED",
    notes: "Medical records show contraindications for travel",
    documents: []
  },
  {
    id: 5,
    studentName: "Sophia Lee",
    studentId: "S13579",
    studentAvatar: "",
    requestDate: "2023-09-19",
    purpose: "Laboratory Class",
    status: "APPROVED",
    notes: "Chemistry laboratory safety requirement",
    documents: ["medical_clearance_13579.pdf"]
  }
];

// Update the interface to match our database schema
interface ClearanceRequest {
  id: string;
  userId: string;
  departmentId: string;
  reason: string;
  otherReason?: string | null;
  purpose: string;
  dateNeeded: Date;
  additionalInfo?: string | null;
  status: string;
  documentUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
  };
  department?: {
    id: string;
    name: string;
  };
}

// Modified to work with our new interface
interface ClearanceRequestDisplay {
  id: string;
  studentName: string;
  studentId: string; 
  studentAvatar: string;
  requestDate: string;
  purpose: string;
  status: string;
  notes: string;
  documents: string[];
}

export default function ClearanceRequestsPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [clearanceRequests, setClearanceRequests] = useState<ClearanceRequestDisplay[]>([])
  const [pendingRequests, setPendingRequests] = useState<ClearanceRequestDisplay[]>([])
  const [approvedRequests, setApprovedRequests] = useState<ClearanceRequestDisplay[]>([])
  const [rejectedRequests, setRejectedRequests] = useState<ClearanceRequestDisplay[]>([])
  
  const [currentRequest, setCurrentRequest] = useState<ClearanceRequestDisplay | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<"APPROVE" | "REJECT" | null>(null)
  const [actionNotes, setActionNotes] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  // Fetch all clearance requests from API
  const fetchClearanceRequests = async () => {
    try {
      setIsLoading(true);
      if (!user) return;
      
      const response = await fetch(`/api/admin/clearance?role=${user.role}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch clearance requests');
      }
      
      const data = await response.json();
      
      // Transform the data to match our display interface
      const formattedRequests: ClearanceRequestDisplay[] = data.clearanceRequests.map((req: ClearanceRequest) => {
        // Split document URLs into array if they exist
        const documents = req.documentUrl ? req.documentUrl.split(',').filter(Boolean) : [];
        
        return {
          id: req.id,
          studentName: `${req.user?.firstName} ${req.user?.lastName}`,
          studentId: req.user?.username || '',
          studentAvatar: '',
          requestDate: new Date(req.createdAt).toLocaleDateString(),
          purpose: req.purpose,
          status: req.status,
          notes: req.additionalInfo || '',
          documents
        };
      });
      
      setClearanceRequests(formattedRequests);
      
      // Filter by status
      setPendingRequests(formattedRequests.filter(req => req.status === 'PENDING'));
      setApprovedRequests(formattedRequests.filter(req => req.status === 'APPROVED'));
      setRejectedRequests(formattedRequests.filter(req => req.status === 'REJECTED'));
      
    } catch (error) {
      console.error('Error fetching clearance requests:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
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

    // Load clearance requests
    fetchClearanceRequests();
  }, [isAuthenticated, user, router])
  
  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }

  // Update file change handler for multiple files to keep previous selections
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Combine with existing selected files instead of replacing them
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  // Update upload document handler to use the API
  const handleUploadDocument = async () => {
    if (!currentRequest || selectedFiles.length === 0 || !user) return;
    
    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('requestId', currentRequest.id);
      
      // Add all files to form data - use the same key name for each file
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }
      
      // If we have notes and are approving, include them in the formData
      if (actionType === "APPROVE" && actionNotes) {
        formData.append('additionalInfo', actionNotes);
      }
      
      const response = await fetch(`/api/admin/clearance/upload?role=${user.role}`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload documents');
      }
      
      // Refresh clearance requests after upload
      await fetchClearanceRequests();
      
      // Close the appropriate dialog and reset state
      if (isActionDialogOpen) {
        setIsActionDialogOpen(false);
        setActionType(null);
        setActionNotes("");
      }
      
      setSelectedFiles([]);
      setCurrentRequest(null);
      
    } catch (error) {
      console.error('Error uploading documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update approve request handler to use the API
  const handleApproveRequest = async () => {
    if (!currentRequest || !user) return;
    
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/admin/clearance?role=${user.role}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: currentRequest.id,
          status: 'APPROVED',
          additionalInfo: actionNotes || undefined
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to approve request');
      }
      
      // Refresh clearance requests after update
      await fetchClearanceRequests();
      
      // Close dialog and reset state
      setIsActionDialogOpen(false);
      setActionType(null);
      setActionNotes("");
      setCurrentRequest(null);
      
    } catch (error) {
      console.error('Error approving request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update reject request handler to use the API
  const handleRejectRequest = async () => {
    if (!currentRequest || !user) return;
    
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/admin/clearance?role=${user.role}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: currentRequest.id,
          status: 'REJECTED',
          additionalInfo: actionNotes || undefined
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to reject request');
      }
      
      // Refresh clearance requests after update
      await fetchClearanceRequests();
      
      // Close dialog and reset state
      setIsActionDialogOpen(false);
      setActionType(null);
      setActionNotes("");
      setCurrentRequest(null);
      
    } catch (error) {
      console.error('Error rejecting request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>
      case 'APPROVED':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>
      case 'REJECTED':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'APPROVED':
        return <CheckCheck className="h-5 w-5 text-green-500" />
      case 'REJECTED':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Breadcrumb */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">Medical Clearance Requests</h1>
          <p className="text-gray-500">
            Manage student medical clearance applications
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/admin/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Clearance Requests</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Pending Requests */}
        <Card className="shadow-sm border-yellow-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="h-5 w-5 text-yellow-500 mr-2" />
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {pendingRequests.length}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <Link href="#pending" className="text-blue-600 hover:underline">Review pending requests</Link>
            </div>
          </CardContent>
        </Card>

        {/* Approved Requests */}
        <Card className="shadow-sm border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <CheckCheck className="h-5 w-5 text-green-500 mr-2" />
              Approved Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {approvedRequests.length}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <Link href="#approved" className="text-blue-600 hover:underline">View approved clearances</Link>
            </div>
          </CardContent>
        </Card>

        {/* Rejected Requests */}
        <Card className="shadow-sm border-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Rejected Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {rejectedRequests.length}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <Link href="#rejected" className="text-blue-600 hover:underline">View rejected requests</Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clearance Requests Tabs */}
      <Card className="shadow-sm mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <FileText className="h-5 w-5 text-blue-500 mr-2" />
            Medical Clearance Applications
          </CardTitle>
          <CardDescription>
            Review and process student medical clearance requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && clearanceRequests.length === 0 ? (
            <div className="py-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 mb-2"></div>
              <p className="text-gray-500">Loading clearance requests...</p>
            </div>
          ) : (
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="pending" id="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved" id="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected" id="rejected">Rejected</TabsTrigger>
                <TabsTrigger value="all">All Requests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="m-0">
                <ClearanceTable 
                  requests={pendingRequests}
                  getStatusBadge={getStatusBadge}
                  onView={(request) => {
                    setCurrentRequest(request);
                    setIsViewDialogOpen(true);
                  }}
                  onApprove={(request) => {
                    setCurrentRequest(request);
                    setSelectedFiles([]);
                    setActionType("APPROVE");
                    setActionNotes("");
                    setIsActionDialogOpen(true);
                  }}
                  onReject={(request) => {
                    setCurrentRequest(request);
                    setActionType("REJECT");
                    setActionNotes("");
                    setIsActionDialogOpen(true);
                  }}
                />
              </TabsContent>

              <TabsContent value="approved" className="m-0">
                <ClearanceTable 
                  requests={approvedRequests}
                  getStatusBadge={getStatusBadge}
                  onView={(request) => {
                    setCurrentRequest(request);
                    setIsViewDialogOpen(true);
                  }}
                />
              </TabsContent>

              <TabsContent value="rejected" className="m-0">
                <ClearanceTable 
                  requests={rejectedRequests}
                  getStatusBadge={getStatusBadge}
                  onView={(request) => {
                    setCurrentRequest(request);
                    setIsViewDialogOpen(true);
                  }}
                />
              </TabsContent>

              <TabsContent value="all" className="m-0">
                <ClearanceTable 
                  requests={clearanceRequests}
                  getStatusBadge={getStatusBadge}
                  onView={(request) => {
                    setCurrentRequest(request);
                    setIsViewDialogOpen(true);
                  }}
                  onApprove={(request) => {
                    if (request.status === 'PENDING') {
                      setCurrentRequest(request);
                      setSelectedFiles([]);
                      setActionType("APPROVE");
                      setActionNotes("");
                      setIsActionDialogOpen(true);
                    }
                  }}
                  onReject={(request) => {
                    if (request.status === 'PENDING') {
                      setCurrentRequest(request);
                      setActionType("REJECT");
                      setActionNotes("");
                      setIsActionDialogOpen(true);
                    }
                  }}
                />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      {/* View Request Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {currentRequest && getStatusIcon(currentRequest.status)}
              <span className="ml-2">Clearance Request Details</span>
            </DialogTitle>
          </DialogHeader>
          {currentRequest && (
            <div className="py-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={currentRequest.studentAvatar} alt={currentRequest.studentName} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                    {currentRequest.studentName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">{currentRequest.studentName}</h3>
                  <p className="text-gray-500">{currentRequest.studentId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Request Date</p>
                  <p className="font-medium">{currentRequest.requestDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(currentRequest.status)}</div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Purpose</p>
                  <p className="font-medium">{currentRequest.purpose}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="border rounded-md p-3 bg-gray-50">{currentRequest.notes || 'No notes provided'}</p>
                </div>
              </div>

              {currentRequest.documents.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Attached Documents</p>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {currentRequest.documents.map((doc, index) => {
                      const fileName = doc.split('/').pop() || '';
                      const fileExt = fileName.split('.').pop()?.toLowerCase() || '';
                      const isPdf = fileExt === 'pdf';
                      const isImage = ['jpg', 'jpeg', 'png'].includes(fileExt);
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md bg-gray-50 hover:bg-gray-100">
                          <div className="flex items-center">
                            <div className="p-2 mr-2 rounded bg-blue-100 text-blue-600">
                              {isPdf ? 
                                <FileText className="h-5 w-5" /> : 
                                isImage ? 
                                  <img 
                                    src={doc} 
                                    alt="Preview" 
                                    className="h-8 w-8 object-cover rounded"
                                    onError={(e) => {
                                      // If image fails to load, show an icon instead
                                      const target = e.target as HTMLImageElement;
                                      target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
                                    }}
                                  /> : 
                                  <FileText className="h-5 w-5" />
                              }
                            </div>
                            <div>
                              <span className="font-medium truncate max-w-[200px] block">
                                {fileName}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(fileName.split('_')[2]).toLocaleDateString() || 'Unknown date'}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-blue-600"
                              onClick={() => window.open(doc, '_blank')}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                const a = document.createElement('a');
                                a.href = doc;
                                a.download = fileName;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                              }}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                {currentRequest.status === 'PENDING' && (
                  <>
                    <Button 
                      className="flex-1" 
                      onClick={() => {
                        setIsViewDialogOpen(false);
                        setCurrentRequest(currentRequest);
                        setSelectedFiles([]);
                        setActionType("APPROVE");
                        setActionNotes("");
                        setIsActionDialogOpen(true);
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 text-red-600 border-red-200 hover:bg-red-50" 
                      onClick={() => {
                        setIsViewDialogOpen(false);
                        setCurrentRequest(currentRequest);
                        setActionType("REJECT");
                        setActionNotes("");
                        setIsActionDialogOpen(true);
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Dialog (Approve/Reject) */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {actionType === "APPROVE" ? "Approve Clearance Request" : "Reject Clearance Request"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "APPROVE" 
                ? "Upload required documents to approve this clearance request" 
                : "Reject this medical clearance request with explanation"
              }
            </DialogDescription>
          </DialogHeader>
          {currentRequest && (
            <div className="py-4">
              <div className="mb-4">
                <p className="text-sm font-medium">Student</p>
                <p>{currentRequest.studentName} ({currentRequest.studentId})</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium">Purpose</p>
                <p>{currentRequest.purpose}</p>
              </div>
              
              {actionType === "APPROVE" && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Upload Documents (Required)</p>
                  <label 
                    htmlFor="approve-document" 
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-3 pb-3">
                      <Upload className="w-6 h-6 mb-1 text-gray-500" />
                      <p className="text-xs text-gray-500">Click to upload documents (PDF, JPG, PNG)</p>
                    </div>
                    <Input
                      id="approve-document"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      multiple
                      className="hidden"
                      required
                    />
                  </label>
                  
                  {selectedFiles.length > 0 && (
                    <div className="mt-2 p-2 border rounded-md">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium">
                          {selectedFiles.length} file(s) selected
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedFiles([])}
                          className="text-red-500 h-6 px-2 py-0 text-xs"
                        >
                          Clear
                        </Button>
                      </div>
                      <div className="max-h-24 overflow-y-auto">
                        <ul className="text-xs space-y-1">
                          {selectedFiles.map((file, index) => (
                            <li key={index} className="truncate max-w-[400px]">
                              {file.name} ({(file.size / 1024).toFixed(0)} KB)
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {selectedFiles.length === 0 && (
                    <p className="mt-2 text-xs text-amber-600">
                      You must upload at least one document to approve this request
                    </p>
                  )}
                </div>
              )}
              
              <div className="grid gap-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  {actionType === "APPROVE" ? "Additional Notes (optional)" : "Reason for Rejection"}
                </label>
                <Textarea
                  id="notes"
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  placeholder={
                    actionType === "APPROVE" 
                      ? "Add any additional information..." 
                      : "Provide reason for rejecting this request..."
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsActionDialogOpen(false);
              setSelectedFiles([]);
              setActionNotes("");
            }}>
              Cancel
            </Button>
            <Button 
              variant={actionType === "APPROVE" ? "default" : "destructive"}
              onClick={actionType === "APPROVE" 
                ? handleUploadDocument
                : handleRejectRequest
              }
              disabled={(actionType === "APPROVE" && selectedFiles.length === 0) || 
                        (actionType === "REJECT" && !actionNotes) || 
                        isLoading}
            >
              {isLoading 
                ? (actionType === "APPROVE" 
                    ? 'Uploading Documents...'
                    : 'Rejecting...')
                : (actionType === "APPROVE" 
                    ? 'Upload & Approve'
                    : 'Reject Request')
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Clearance Table Component
function ClearanceTable({ 
  requests, 
  getStatusBadge,
  onView,
  onApprove,
  onReject
}: { 
  requests: ClearanceRequestDisplay[],
  getStatusBadge: (status: string) => React.ReactNode,
  onView: (request: ClearanceRequestDisplay) => void,
  onApprove?: (request: ClearanceRequestDisplay) => void,
  onReject?: (request: ClearanceRequestDisplay) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Request Date</TableHead>
          <TableHead>Purpose</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Documents</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-gray-500">
              No clearance requests found
            </TableCell>
          </TableRow>
        ) : (
          requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={request.studentAvatar} alt={request.studentName} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {request.studentName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{request.studentName}</div>
                    <div className="text-sm text-gray-500">{request.studentId}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{request.requestDate}</TableCell>
              <TableCell className="max-w-[200px] truncate">{request.purpose}</TableCell>
              <TableCell>{getStatusBadge(request.status)}</TableCell>
              <TableCell>
                {request.documents.length > 0 ? (
                  <Badge className="bg-blue-100 text-blue-800">
                    {request.documents.length} document{request.documents.length > 1 ? 's' : ''}
                  </Badge>
                ) : (
                  <span className="text-gray-500 text-sm">No documents</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-blue-600"
                    onClick={() => onView(request)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  
                  {request.status === 'PENDING' && (
                    <>
                      {onApprove && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => onApprove(request)}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      )}
                      
                      {onReject && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => onReject(request)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
} 