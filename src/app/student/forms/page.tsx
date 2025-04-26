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
import { Button } from "@/components/ui/button"
import { ChevronRight, FileText, Plus, ExternalLink, Loader2, Download, Printer } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface UploadedForm {
  id: string
  formType: string
  filePath: string
  notes: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function FormsPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [forms, setForms] = useState<UploadedForm[]>([])
  const [loading, setLoading] = useState(true)
  
  // Protect this route
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth')
      return
    }
    
    // Verify this is a student
    if (user.role !== 'STUDENT') {
      router.push(user.role === 'ADMIN' ? '/admin/dashboard' : '/fs/dashboard')
    }
  }, [isAuthenticated, user, router])
  
  // Fetch forms data
  useEffect(() => {
    if (user?.id) {
      fetchForms()
    }
  }, [user])
  
  const fetchForms = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/forms/user?userId=${user?.id}`)
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
  
  const getStatusBadge = (status: string) => {
    switch (status) {
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
  
  const handleDownloadFile = (filePath: string) => {
    const fileName = filePath.split('/').pop() || 'form.pdf';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handlePrintFile = (filePath: string) => {
    const printWindow = window.open(filePath, '_blank');
    printWindow?.addEventListener('load', () => {
      printWindow.print();
    });
  };

  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Custom Header with Breadcrumb */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">My Forms</h1>
          <p className="text-gray-500">
            View and manage your submitted health forms
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/student/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">My Forms</span>
        </nav>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end mb-6 gap-2">
        <Link href="/student/forms/new">
          <Button variant="outline" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Fill Form
          </Button>
        </Link>
        <Link href="/student/forms/upload">
          <Button className="flex items-center gap-1 bg-[#166cbb] hover:bg-[#12579a]">
            <Plus className="h-4 w-4" />
            Upload Forms
          </Button>
        </Link>
      </div>

      {/* Forms List */}
      <Card>
        <CardHeader>
          <CardTitle>Submitted Forms</CardTitle>
          <CardDescription>
            View all your form submissions and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : forms.length === 0 ? (
            <div className="text-center py-8 border border-dashed rounded-md bg-gray-50">
              <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No forms submitted yet</h3>
              <p className="text-gray-500 mb-4">Start by filling out or uploading your health forms</p>
              <div className="flex gap-2 justify-center">
                <Link href="/student/forms/new">
                  <Button variant="outline" size="sm">Fill Form</Button>
                </Link>
                <Link href="/student/forms/upload">
                  <Button size="sm" className="bg-[#166cbb] hover:bg-[#12579a]">Upload Forms</Button>
                </Link>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Form Type</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forms.map((form) => (
                  <TableRow key={form.id}>
                    <TableCell className="font-medium">{getFormTypeLabel(form.formType)}</TableCell>
                    <TableCell>{format(new Date(form.createdAt), 'MMM d, yyyy')}</TableCell>
                    <TableCell>{getStatusBadge(form.status)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{form.notes || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <a 
                          href={form.filePath} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </a>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600"
                          onClick={() => handleDownloadFile(form.filePath)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600"
                          onClick={() => handlePrintFile(form.filePath)}
                        >
                          <Printer className="h-4 w-4 mr-1" />
                          Print
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 