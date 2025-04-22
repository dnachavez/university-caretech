"use client"

import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"
import { formatDate } from "@/utils/date-utils"
import { ClearanceRequest } from "@/services/clearance-service"

interface ClearanceRequestTableProps {
  requests: ClearanceRequest[]
  loading: boolean
  downloadPrefix?: string
}

export function ClearanceRequestTable({ 
  requests, 
  loading,
  downloadPrefix = 'Clearance_Request'
}: ClearanceRequestTableProps) {
  // Function to view clearance document in a new tab
  const viewClearanceDocument = (request: ClearanceRequest) => {
    if (request.status === 'APPROVED' && request.documentUrl) {
      window.open(request.documentUrl, '_blank');
    } else {
      alert('No document available for this request yet.');
    }
  };

  // Function to download clearance document
  const downloadClearanceDocument = (request: ClearanceRequest) => {
    if (request.status === 'APPROVED' && request.documentUrl) {
      const link = document.createElement('a');
      link.href = request.documentUrl;
      link.download = `${downloadPrefix}_${request.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No document available for this request yet.');
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Purpose</TableHead>
          <TableHead>Date Needed</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={8} className="h-24 text-center">
              Loading clearance requests...
            </TableCell>
          </TableRow>
        ) : requests.length > 0 ? (
          requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.id.slice(0, 8)}</TableCell>
              <TableCell>{request.department?.name || 'Unknown Department'}</TableCell>
              <TableCell>
                {request.reason === 'other' ? request.otherReason : request.reason}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {request.purpose || 'No purpose specified'}
              </TableCell>
              <TableCell>{formatDate(request.dateNeeded)}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  request.status === "APPROVED" 
                    ? "bg-green-100 text-green-800" 
                    : request.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}>
                  {request.status}
                </span>
              </TableCell>
              <TableCell>{formatDate(request.updatedAt)}</TableCell>
              <TableCell className="space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="View document"
                  className={`text-slate-500 hover:text-blue-600 hover:bg-blue-50 ${
                    request.status !== "APPROVED" || !request.documentUrl ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => viewClearanceDocument(request)}
                  disabled={request.status !== "APPROVED" || !request.documentUrl}
                >
                  <Eye className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Download document"
                  className={`text-slate-500 hover:text-blue-600 hover:bg-blue-50 ${
                    request.status !== "APPROVED" || !request.documentUrl ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => downloadClearanceDocument(request)}
                  disabled={request.status !== "APPROVED" || !request.documentUrl}
                >
                  <Download className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="h-24 text-center">
              No clearance requests found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
} 