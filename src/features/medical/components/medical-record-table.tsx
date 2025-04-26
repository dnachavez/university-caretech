"use client"

import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Download, Printer } from "lucide-react"
import { MedicalRecord } from "../types/record-types"
import { formatDate } from "@/utils/date-utils"
import { viewFile, downloadFile, printFile } from "@/utils/file-utils"

interface MedicalRecordTableProps {
  records: MedicalRecord[]
  loading: boolean
  downloadPrefix?: string
}

export function MedicalRecordTable({ 
  records, 
  loading,
  downloadPrefix = 'Record'
}: MedicalRecordTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Form Type</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              Loading records...
            </TableCell>
          </TableRow>
        ) : records.length > 0 ? (
          records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.id.slice(0, 8)}</TableCell>
              <TableCell>{record.formType}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {record.notes || 'No notes'}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  record.status === "APPROVED" 
                    ? "bg-green-100 text-green-800" 
                    : record.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}>
                  {record.status}
                </span>
              </TableCell>
              <TableCell>{formatDate(record.updatedAt)}</TableCell>
              <TableCell className="space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="View record"
                  className="text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => viewFile(record)}
                >
                  <Eye className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Download record"
                  className="text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => downloadFile(record, downloadPrefix)}
                >
                  <Download className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Print record"
                  className="text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => printFile(record)}
                >
                  <Printer className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              No records found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
} 