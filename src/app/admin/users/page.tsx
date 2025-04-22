"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { 
  ChevronRight, Users, Search, CheckCircle2, 
  XCircle, Clock, RefreshCcw, Trash2, ShieldAlert, Eye
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

// Types for user data
interface HealthForm {
  id: string
  firstName: string
  lastName: string
  middleInitial?: string
  birthdate: string
  gender: string
  birthPlace: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  guardianName?: string
  guardianContact?: string
  emergencyContact: string
  relationship: string
  emergencyNumber: string
  bloodType?: string
  dateSigned: string
  pastIllnesses?: string
  hospitalization?: string
  medications?: string
  allergies: boolean
  immunized: boolean
  communicableDisease: boolean
  asthmatic: boolean
  chronicIllness: boolean
  [key: string]: any
}

interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  role: string
  status: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
  healthForm?: HealthForm
  [key: string]: any
}

export default function UsersPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [pendingUsers, setPendingUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: '', userId: '' })
  
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

    // Fetch users from the database
    fetchUsers()
  }, [isAuthenticated, user, router])
  
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      
      if (data.users) {
        setUsers(data.users)
        // Filter pending users that are faculty or staff
        setPendingUsers(data.users.filter((user: User) => 
          (user.role === 'FACULTY' || user.role === 'STAFF') && 
          user.status === 'PENDING'))
      }
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>
      case 'SUSPENDED':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Suspended</Badge>
      case 'REJECTED':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Rejected</Badge>
      case 'UNVERIFIED':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Unverified</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Admin</Badge>
      case 'FACULTY':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Faculty</Badge>
      case 'STAFF':
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Staff</Badge>
      case 'STUDENT':
        return <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200">Student</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const handleViewDetails = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`)
      const data = await response.json()
      
      if (data.user) {
        setSelectedUser(data.user)
        setViewDetailsOpen(true)
      }
    } catch (error) {
      console.error("Error fetching user details:", error)
      toast.error("Failed to load user details")
    }
  }

  const handleApproveUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/approve`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        toast.success("User approved successfully")
        fetchUsers()
      } else {
        toast.error("Failed to approve user")
      }
    } catch (error) {
      console.error("Error approving user:", error)
      toast.error("Failed to approve user")
    }
  }

  const handleRejectUser = async (userId: string) => {
    setConfirmDialog({ open: false, type: '', userId: '' })
    
    try {
      const response = await fetch(`/api/admin/users/${userId}/reject`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        toast.success("User status set to Rejected")
        fetchUsers()
      } else {
        toast.error("Failed to reject user")
      }
    } catch (error) {
      console.error("Error rejecting user:", error)
      toast.error("Failed to reject user")
    }
  }

  const handleSuspendUser = async (userId: string) => {
    setConfirmDialog({ open: false, type: '', userId: '' })
    
    try {
      const response = await fetch(`/api/admin/users/${userId}/suspend`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        toast.success("User suspended successfully")
        fetchUsers()
      } else {
        toast.error("Failed to suspend user")
      }
    } catch (error) {
      console.error("Error suspending user:", error)
      toast.error("Failed to suspend user")
    }
  }

  const handleDeleteUser = async (userId: string) => {
    setConfirmDialog({ open: false, type: '', userId: '' })
    
    try {
      const response = await fetch(`/api/admin/users/${userId}/delete`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        toast.success("User deleted successfully")
        fetchUsers()
        setViewDetailsOpen(false) // Close details dialog if open
      } else {
        toast.error("Failed to delete user")
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Failed to delete user")
    }
  }

  const handleActivateUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/approve`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        toast.success("User activated successfully")
        fetchUsers()
      } else {
        toast.error("Failed to activate user")
      }
    } catch (error) {
      console.error("Error activating user:", error)
      toast.error("Failed to activate user")
    }
  }

  const handleUnrejectUser = async (userId: string) => {
    setConfirmDialog({ open: false, type: '', userId: '' })
    
    try {
      const response = await fetch(`/api/admin/users/${userId}/unreject`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        toast.success("User has been unrejected and moved to pending status")
        fetchUsers()
      } else {
        toast.error("Failed to unreject user")
      }
    } catch (error) {
      console.error("Error unrejecting user:", error)
      toast.error("Failed to unreject user")
    }
  }

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Breadcrumb */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">User Management</h1>
          <p className="text-gray-500">
            View and manage all user accounts
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
          <span className="text-gray-700 font-medium">Users</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Pending Approval Card */}
        {pendingUsers.length > 0 && (
          <Card className="shadow-sm border-yellow-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                Pending Approval
              </CardTitle>
              <CardDescription>
                Faculty and staff accounts awaiting approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{`${user.firstName} ${user.lastName}`}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => handleApproveUser(user.id)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => setConfirmDialog({ 
                              open: true, 
                              type: 'reject', 
                              userId: user.id 
                            })}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* All Users Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                All Users
              </CardTitle>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={fetchUsers}
                className="text-gray-600"
              >
                <RefreshCcw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
            <CardDescription>
              View and manage system users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative max-w-sm">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  className="max-w-sm pl-8"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mt-2">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <UserTable 
                  users={filteredUsers}
                  getStatusBadge={getStatusBadge}
                  getRoleBadge={getRoleBadge}
                  onViewDetails={handleViewDetails}
                  onApprove={(userId) => handleApproveUser(userId)}
                  onReject={(userId) => setConfirmDialog({ open: true, type: 'reject', userId })}
                  onUnreject={(userId) => setConfirmDialog({ open: true, type: 'unreject', userId })}
                  onSuspend={(userId) => setConfirmDialog({ open: true, type: 'suspend', userId })}
                  onActivate={(userId) => handleActivateUser(userId)}
                  onDelete={(userId) => setConfirmDialog({ open: true, type: 'delete', userId })}
                />
              </TabsContent>
              
              <TabsContent value="students">
                <UserTable 
                  users={filteredUsers.filter(user => user.role === 'STUDENT')}
                  getStatusBadge={getStatusBadge}
                  getRoleBadge={getRoleBadge}
                  onViewDetails={handleViewDetails}
                  onApprove={(userId) => handleApproveUser(userId)}
                  onReject={(userId) => setConfirmDialog({ open: true, type: 'reject', userId })}
                  onUnreject={(userId) => setConfirmDialog({ open: true, type: 'unreject', userId })}
                  onSuspend={(userId) => setConfirmDialog({ open: true, type: 'suspend', userId })}
                  onActivate={(userId) => handleActivateUser(userId)}
                  onDelete={(userId) => setConfirmDialog({ open: true, type: 'delete', userId })}
                />
              </TabsContent>
              
              <TabsContent value="faculty">
                <UserTable 
                  users={filteredUsers.filter(user => user.role === 'FACULTY')}
                  getStatusBadge={getStatusBadge}
                  getRoleBadge={getRoleBadge}
                  onViewDetails={handleViewDetails}
                  onApprove={(userId) => handleApproveUser(userId)}
                  onReject={(userId) => setConfirmDialog({ open: true, type: 'reject', userId })}
                  onUnreject={(userId) => setConfirmDialog({ open: true, type: 'unreject', userId })}
                  onSuspend={(userId) => setConfirmDialog({ open: true, type: 'suspend', userId })}
                  onActivate={(userId) => handleActivateUser(userId)}
                  onDelete={(userId) => setConfirmDialog({ open: true, type: 'delete', userId })}
                />
              </TabsContent>
              
              <TabsContent value="staff">
                <UserTable 
                  users={filteredUsers.filter(user => user.role === 'STAFF')}
                  getStatusBadge={getStatusBadge}
                  getRoleBadge={getRoleBadge}
                  onViewDetails={handleViewDetails}
                  onApprove={(userId) => handleApproveUser(userId)}
                  onReject={(userId) => setConfirmDialog({ open: true, type: 'reject', userId })}
                  onUnreject={(userId) => setConfirmDialog({ open: true, type: 'unreject', userId })}
                  onSuspend={(userId) => setConfirmDialog({ open: true, type: 'suspend', userId })}
                  onActivate={(userId) => handleActivateUser(userId)}
                  onDelete={(userId) => setConfirmDialog({ open: true, type: 'delete', userId })}
                />
              </TabsContent>
              
              <TabsContent value="pending">
                <UserTable 
                  users={filteredUsers.filter(user => user.status === 'PENDING')}
                  getStatusBadge={getStatusBadge}
                  getRoleBadge={getRoleBadge}
                  onViewDetails={handleViewDetails}
                  onApprove={(userId) => handleApproveUser(userId)}
                  onReject={(userId) => setConfirmDialog({ open: true, type: 'reject', userId })}
                  onUnreject={(userId) => setConfirmDialog({ open: true, type: 'unreject', userId })}
                  onSuspend={(userId) => setConfirmDialog({ open: true, type: 'suspend', userId })}
                  onActivate={(userId) => handleActivateUser(userId)}
                  onDelete={(userId) => setConfirmDialog({ open: true, type: 'delete', userId })}
                />
              </TabsContent>
              
              <TabsContent value="rejected">
                <UserTable 
                  users={filteredUsers.filter(user => user.status === 'REJECTED')}
                  getStatusBadge={getStatusBadge}
                  getRoleBadge={getRoleBadge}
                  onViewDetails={handleViewDetails}
                  onApprove={(userId) => handleApproveUser(userId)}
                  onReject={(userId) => setConfirmDialog({ open: true, type: 'reject', userId })}
                  onUnreject={(userId) => setConfirmDialog({ open: true, type: 'unreject', userId })}
                  onSuspend={(userId) => setConfirmDialog({ open: true, type: 'suspend', userId })}
                  onActivate={(userId) => handleActivateUser(userId)}
                  onDelete={(userId) => setConfirmDialog({ open: true, type: 'delete', userId })}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedUser.firstName} {selectedUser.lastName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{selectedUser.firstName} {selectedUser.lastName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Username</h3>
                  <p>{selectedUser.username}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Role</h3>
                  <p>{getRoleBadge(selectedUser.role)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p>{getStatusBadge(selectedUser.status)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email Verified</h3>
                  <p>{selectedUser.emailVerified ? "Yes" : "No"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date Registered</h3>
                  <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              {/* Health Form Information if available */}
              {selectedUser.healthForm && (
                <div className="mt-4">
                  <h3 className="text-md font-medium mb-2">Health Form Information</h3>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                      <p>{selectedUser.healthForm.firstName} {selectedUser.healthForm.middleInitial ? selectedUser.healthForm.middleInitial + '. ' : ''}{selectedUser.healthForm.lastName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Birth Date</h3>
                      <p>{new Date(selectedUser.healthForm.birthdate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                      <p>{selectedUser.healthForm.gender}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Birth Place</h3>
                      <p>{selectedUser.healthForm.birthPlace}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Address</h3>
                      <p>
                        {selectedUser.healthForm.addressLine1}
                        {selectedUser.healthForm.addressLine2 && <span>, {selectedUser.healthForm.addressLine2}</span>}
                        <br />
                        {selectedUser.healthForm.city}, {selectedUser.healthForm.state} {selectedUser.healthForm.postalCode}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Emergency Contact</h3>
                      <p>{selectedUser.healthForm.emergencyContact} ({selectedUser.healthForm.relationship})<br />{selectedUser.healthForm.emergencyNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Blood Type</h3>
                      <p>{selectedUser.healthForm.bloodType || "Not specified"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Guardian</h3>
                      <p>{selectedUser.healthForm.guardianName || "Not specified"} {selectedUser.healthForm.guardianContact ? `(${selectedUser.healthForm.guardianContact})` : ""}</p>
                    </div>
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-gray-500">Health Information</h3>
                      <ul className="list-disc ml-5 text-sm">
                        {selectedUser.healthForm.pastIllnesses && <li>Past Illnesses: {selectedUser.healthForm.pastIllnesses}</li>}
                        {selectedUser.healthForm.hospitalization && <li>Hospitalizations: {selectedUser.healthForm.hospitalization}</li>}
                        {selectedUser.healthForm.medications && <li>Medications: {selectedUser.healthForm.medications}</li>}
                        {selectedUser.healthForm.allergies && <li>Has allergies</li>}
                        {selectedUser.healthForm.immunized && <li>Immunized</li>}
                        {selectedUser.healthForm.communicableDisease && <li>Has had communicable disease</li>}
                        {selectedUser.healthForm.asthmatic && <li>Asthmatic</li>}
                        {selectedUser.healthForm.chronicIllness && <li>Has chronic illness</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              {selectedUser.status === 'SUSPENDED' ? (
                <Button 
                  variant="outline" 
                  className="text-green-600 border-green-200 hover:bg-green-50"
                  onClick={() => handleActivateUser(selectedUser.id)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Activate Account
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="text-orange-600 border-orange-200 hover:bg-orange-50"
                  onClick={() => setConfirmDialog({ 
                    open: true, 
                    type: 'suspend', 
                    userId: selectedUser.id 
                  })}
                >
                  <ShieldAlert className="h-4 w-4 mr-1" />
                  Suspend Account
                </Button>
              )}
              <Button 
                variant="destructive"
                onClick={() => setConfirmDialog({ 
                  open: true, 
                  type: 'delete', 
                  userId: selectedUser.id 
                })}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onOpenChange={(open) => !open && setConfirmDialog({ open, type: '', userId: '' })}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {confirmDialog.type === 'reject' && "Reject User"}
              {confirmDialog.type === 'unreject' && "Unreject User"}
              {confirmDialog.type === 'suspend' && "Suspend User"}
              {confirmDialog.type === 'delete' && "Delete User"}
            </DialogTitle>
            <DialogDescription>
              {confirmDialog.type === 'reject' && "Are you sure you want to reject this user? Their status will be set to Rejected."}
              {confirmDialog.type === 'unreject' && "Are you sure you want to unreject this user? This will restore their account to pending status."}
              {confirmDialog.type === 'suspend' && "Are you sure you want to suspend this user? They will not be able to log in until reactivated."}
              {confirmDialog.type === 'delete' && "Are you sure you want to permanently delete this user? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialog({ open: false, type: '', userId: '' })}>
              Cancel
            </Button>
            <Button 
              variant={confirmDialog.type === 'reject' || confirmDialog.type === 'delete' ? "destructive" : "default"}
              className={confirmDialog.type === 'unreject' ? "bg-green-600 hover:bg-green-700" : ""}
              onClick={() => {
                if (confirmDialog.type === 'reject') handleRejectUser(confirmDialog.userId)
                if (confirmDialog.type === 'unreject') handleUnrejectUser(confirmDialog.userId)
                if (confirmDialog.type === 'suspend') handleSuspendUser(confirmDialog.userId)
                if (confirmDialog.type === 'delete') handleDeleteUser(confirmDialog.userId)
              }}
            >
              {confirmDialog.type === 'reject' && "Reject"}
              {confirmDialog.type === 'unreject' && "Unreject"}
              {confirmDialog.type === 'suspend' && "Suspend"}
              {confirmDialog.type === 'delete' && "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface UserTableProps {
  users: User[]
  getStatusBadge: (status: string) => React.ReactNode
  getRoleBadge: (role: string) => React.ReactNode
  onViewDetails: (userId: string) => void
  onApprove?: (userId: string) => void
  onReject?: (userId: string) => void
  onUnreject?: (userId: string) => void
  onSuspend?: (userId: string) => void
  onActivate?: (userId: string) => void
  onDelete?: (userId: string) => void
}

function UserTable({ 
  users, 
  getStatusBadge, 
  getRoleBadge, 
  onViewDetails,
  onApprove = () => {},
  onReject = () => {},
  onUnreject = () => {},
  onSuspend = () => {},
  onActivate = () => {},
  onDelete = () => {}
}: UserTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500 py-6">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>
                  {user.emailVerified ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <div className="h-4 w-4">⋯</div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewDetails(user.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        
                        {/* Only show approve option if user is PENDING */}
                        {user.status === 'PENDING' && (
                          <DropdownMenuItem 
                            onClick={() => onApprove(user.id)}
                            className="text-green-600"
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        
                        {/* Only show unreject option if user is REJECTED */}
                        {user.status === 'REJECTED' && (
                          <DropdownMenuItem 
                            onClick={() => onUnreject(user.id)}
                            className="text-blue-600"
                          >
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Unreject
                          </DropdownMenuItem>
                        )}
                        
                        {/* Only show reject option if user is PENDING or ACTIVE */}
                        {(user.status === 'PENDING' || user.status === 'ACTIVE') && (
                          <DropdownMenuItem 
                            onClick={() => onReject(user.id)}
                            className="text-red-600"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        )}
                        
                        {/* Only show suspend/activate options for ACTIVE/SUSPENDED users */}
                        {user.status === 'ACTIVE' && (
                          <DropdownMenuItem 
                            onClick={() => onSuspend(user.id)}
                            className="text-yellow-600"
                          >
                            <ShieldAlert className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                        )}
                        
                        {user.status === 'SUSPENDED' && (
                          <DropdownMenuItem 
                            onClick={() => onActivate(user.id)}
                            className="text-green-600"
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuItem 
                          onClick={() => onDelete(user.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
} 