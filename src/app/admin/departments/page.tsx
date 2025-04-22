"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { 
  ChevronRight, Building, Plus, Pencil, Trash2, 
  MoreHorizontal, Check, X, RefreshCcw
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
import { Input } from "@/components/ui/input"
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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  status: string;
  staff: number;
}

export default function DepartmentsPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [departments, setDepartments] = useState<Department[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null)
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    code: "",
    description: "",
    status: "ACTIVE"
  })
  const [isLoading, setIsLoading] = useState(false)
  
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

    // Load departments
    fetchDepartments()
  }, [isAuthenticated, user, router])
  
  const fetchDepartments = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/departments')
      const data = await response.json()
      
      if (data.departments) {
        setDepartments(data.departments)
      } else {
        toast.error("Failed to load departments")
      }
    } catch (error) {
      console.error("Error fetching departments:", error)
      toast.error("Failed to load departments")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddDepartment = async () => {
    if (!newDepartment.name) {
      toast.error("Department name is required")
      return
    }
    
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDepartment)
      })
      
      if (response.ok) {
        const data = await response.json()
        setDepartments([...departments, data.department])
        setNewDepartment({
          name: "",
          code: "",
          description: "",
          status: "ACTIVE"
        })
        setIsAddDialogOpen(false)
        toast.success("Department created successfully")
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to create department")
      }
    } catch (error) {
      console.error("Error creating department:", error)
      toast.error("Failed to create department")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditDepartment = async () => {
    if (!currentDepartment) return
    
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/departments/${currentDepartment.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: currentDepartment.name,
          code: currentDepartment.code,
          description: currentDepartment.description,
          status: currentDepartment.status
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        const updatedDepartments = departments.map(dept => 
          dept.id === currentDepartment.id ? data.department : dept
        )
        
        setDepartments(updatedDepartments)
        setCurrentDepartment(null)
        setIsEditDialogOpen(false)
        toast.success("Department updated successfully")
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to update department")
      }
    } catch (error) {
      console.error("Error updating department:", error)
      toast.error("Failed to update department")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteDepartment = async () => {
    if (!currentDepartment) return
    
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/departments/${currentDepartment.id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        const updatedDepartments = departments.filter(dept => dept.id !== currentDepartment.id)
        
        setDepartments(updatedDepartments)
        setCurrentDepartment(null)
        setIsDeleteDialogOpen(false)
        toast.success("Department deleted successfully")
      } else {
        const error = await response.json()
        
        if (error.count > 0) {
          toast.error(`Cannot delete department with ${error.count} associated record(s)`)
        } else {
          toast.error(error.error || "Failed to delete department")
        }
      }
    } catch (error) {
      console.error("Error deleting department:", error)
      toast.error("Failed to delete department")
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleStatus = async (id: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/departments/${id}/toggle`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        const data = await response.json()
        const updatedDepartments = departments.map(dept => 
          dept.id === id ? data.department : dept
        )
        
        setDepartments(updatedDepartments)
        toast.success(`Department ${data.department.status === 'ACTIVE' ? 'activated' : 'deactivated'} successfully`)
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to toggle department status")
      }
    } catch (error) {
      console.error("Error toggling department status:", error)
      toast.error("Failed to toggle department status")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Breadcrumb */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">Department Management</h1>
          <p className="text-gray-500">
            Manage university departments
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
          <span className="text-gray-700 font-medium">Departments</span>
        </nav>
      </div>

      {/* Departments Card */}
      <Card className="shadow-sm mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium flex items-center">
                <Building className="h-5 w-5 text-blue-500 mr-2" />
                Departments
              </CardTitle>
              <CardDescription>
                Manage university departments and units
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={fetchDepartments}
                disabled={isLoading}
              >
                <RefreshCcw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Department
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Department</DialogTitle>
                    <DialogDescription>
                      Create a new department or unit in the university
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="name">Department Name</label>
                      <Input 
                        id="name" 
                        placeholder="e.g. Department of Computer Science"
                        value={newDepartment.name}
                        onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="code">Department Code</label>
                      <Input 
                        id="code" 
                        placeholder="e.g. CS"
                        value={newDepartment.code}
                        onChange={(e) => setNewDepartment({...newDepartment, code: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="description">Description</label>
                      <Textarea 
                        id="description" 
                        placeholder="Brief description of the department"
                        value={newDepartment.description}
                        onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isLoading}>Cancel</Button>
                    <Button onClick={handleAddDepartment} disabled={isLoading}>
                      {isLoading ? "Creating..." : "Create Department"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Related Records</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    Loading departments...
                  </TableCell>
                </TableRow>
              ) : departments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    No departments found
                  </TableCell>
                </TableRow>
              ) : (
                departments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell className="font-medium">{department.name}</TableCell>
                    <TableCell>{department.code}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{department.description}</TableCell>
                    <TableCell>
                      <Badge 
                        className={department.status === 'ACTIVE' 
                          ? "bg-green-100 text-green-800 hover:bg-green-200" 
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }
                      >
                        {department.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>{department.staff}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" disabled={isLoading}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-blue-600"
                            onClick={() => {
                              setCurrentDepartment(department);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Department
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className={department.status === 'ACTIVE' ? "text-yellow-600" : "text-green-600"}
                            onClick={() => handleToggleStatus(department.id)}
                          >
                            {department.status === 'ACTIVE' ? (
                              <>
                                <X className="h-4 w-4 mr-2" />
                                Set Inactive
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Set Active
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setCurrentDepartment(department);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Department
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Department Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>
              Update department information
            </DialogDescription>
          </DialogHeader>
          {currentDepartment && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-name">Department Name</label>
                <Input 
                  id="edit-name" 
                  value={currentDepartment.name}
                  onChange={(e) => setCurrentDepartment({
                    ...currentDepartment,
                    name: e.target.value
                  })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-code">Department Code</label>
                <Input 
                  id="edit-code" 
                  value={currentDepartment.code}
                  onChange={(e) => setCurrentDepartment({
                    ...currentDepartment,
                    code: e.target.value
                  })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-description">Description</label>
                <Textarea 
                  id="edit-description" 
                  value={currentDepartment.description}
                  onChange={(e) => setCurrentDepartment({
                    ...currentDepartment,
                    description: e.target.value
                  })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isLoading}>Cancel</Button>
            <Button onClick={handleEditDepartment} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Department Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Department</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this department? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentDepartment && (
            <div className="py-4">
              <p className="font-medium">{currentDepartment.name} ({currentDepartment.code})</p>
              <p className="text-sm text-gray-500 mt-1">{currentDepartment.description}</p>
              
              {currentDepartment.staff > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-yellow-800 text-sm">
                    <strong>Warning:</strong> This department has related records that may be affected.
                    Deletion might fail if there are dependent records.
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteDepartment} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete Department"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 