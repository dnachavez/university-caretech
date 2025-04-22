"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { ChevronRight, Building, User, Briefcase, GraduationCap, FileText, Search, UserPlus } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  status: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  healthForm?: {
    id: string;
    departmentId: string;
    yearLevel?: string;
  }
}

export default function DepartmentDetailPage({ params }: { params: { id: string } }) {
  const { user: currentUser, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [department, setDepartment] = useState<Department | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [studentSearchTerm, setStudentSearchTerm] = useState("")
  const [facultySearchTerm, setFacultySearchTerm] = useState("")
  const [addMemberDialog, setAddMemberDialog] = useState(false)
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    role: 'STUDENT',
    yearLevel: '1st Year'
  })
  
  // Protect this route
  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      router.push('/auth')
      return
    }
    
    // Verify this is an admin
    if (currentUser.role !== 'ADMIN') {
      router.push(currentUser.role === 'STUDENT' ? '/student/dashboard' : '/fs/dashboard')
    }

    // Load department
    fetchDepartment()
    
    // Load users with health forms
    fetchUsers()
  }, [isAuthenticated, currentUser, router, params.id])
  
  const fetchDepartment = async () => {
    try {
      const response = await fetch(`/api/admin/departments/${params.id}`)
      if (!response.ok) {
        throw new Error('Department not found')
      }
      
      const data = await response.json()
      setDepartment(data.department)
    } catch (error) {
      console.error("Error fetching department:", error)
      toast.error("Failed to load department information")
      router.push('/admin/departments')
    }
  }
  
  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      
      const data = await response.json()
      setUsers(data.users)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Failed to load users")
    } finally {
      setIsLoading(false)
    }
  }
  
  // Filter for department members
  const filteredUsers = users.filter(user => 
    user.healthForm?.departmentId === params.id
  )
  
  // Group students by year level with search filter
  const firstYearStudents = filteredUsers.filter(user => 
    user.role === 'STUDENT' && 
    user.healthForm?.yearLevel === '1st Year' &&
    (user.firstName.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
     user.lastName.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(studentSearchTerm.toLowerCase()))
  )
  
  const secondYearStudents = filteredUsers.filter(user => 
    user.role === 'STUDENT' && 
    user.healthForm?.yearLevel === '2nd Year' &&
    (user.firstName.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
     user.lastName.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(studentSearchTerm.toLowerCase()))
  )
  
  const thirdYearStudents = filteredUsers.filter(user => 
    user.role === 'STUDENT' && 
    user.healthForm?.yearLevel === '3rd Year' &&
    (user.firstName.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
     user.lastName.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(studentSearchTerm.toLowerCase()))
  )
  
  const fourthYearStudents = filteredUsers.filter(user => 
    user.role === 'STUDENT' && 
    user.healthForm?.yearLevel === '4th Year' &&
    (user.firstName.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
     user.lastName.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(studentSearchTerm.toLowerCase()))
  )
  
  // Get faculty and staff with search filter
  const facultyStaff = filteredUsers.filter(user => 
    (user.role === 'FACULTY' || user.role === 'STAFF') &&
    (user.firstName.toLowerCase().includes(facultySearchTerm.toLowerCase()) ||
     user.lastName.toLowerCase().includes(facultySearchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(facultySearchTerm.toLowerCase()))
  )
  
  const handleAddMember = async () => {
    try {
      // Validate inputs
      if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.username) {
        toast.error("Please fill in all required fields")
        return
      }
      
      const userData = {
        ...newUser,
        departmentId: params.id
      }
      
      const response = await fetch('/api/admin/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      
      if (response.ok) {
        const data = await response.json()
        
        // Show success message with temporary password
        toast.success(
          <div>
            <p>User added successfully with temporary password: <strong>{data.temporaryPassword}</strong></p>
            <p className="text-xs mt-1">Note: User needs to complete their health form information.</p>
          </div>,
          { duration: 6000 }
        )
        
        setAddMemberDialog(false)
        setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          role: 'STUDENT',
          yearLevel: '1st Year'
        })
        fetchUsers()
      } else {
        const data = await response.json()
        toast.error(data.error || "Failed to add user")
      }
    } catch (error) {
      console.error("Error adding user to department:", error)
      toast.error("Failed to add user")
    }
  }
  
  if (!isAuthenticated || !currentUser) {
    return null // Don't render anything while checking auth
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Breadcrumb */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">
            {department?.name || 'Department Details'}
          </h1>
          <p className="text-gray-500">
            View and manage members of this department
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
          <Link href="/admin/departments" className="hover:text-blue-600">
            Departments
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">
            {department?.name || 'Details'}
          </span>
        </nav>
      </div>

      {/* Department Info Card */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Building className="h-5 w-5 text-blue-500 mr-2" />
              <CardTitle>
                {department?.name || 'Department'} <Badge className="ml-2">{department?.code}</Badge>
              </CardTitle>
            </div>
            <Button 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setAddMemberDialog(true)}
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Add Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="text-gray-900">{department?.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Code</h3>
              <p className="text-gray-900">{department?.code}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <Badge variant={department?.status === 'ACTIVE' ? 'default' : 'destructive'}>
                {department?.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Tab */}
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="students" className="flex items-center">
            <GraduationCap className="h-4 w-4 mr-2" />
            Students
          </TabsTrigger>
          <TabsTrigger value="facultyStaff" className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            Faculty/Staff
          </TabsTrigger>
        </TabsList>
        
        {/* Students Content */}
        <TabsContent value="students">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">
                  Students by Year Level
                </CardTitle>
                <div className="relative w-64">
                  <Input
                    placeholder="Search students..."
                    value={studentSearchTerm}
                    onChange={(e) => setStudentSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="first-year" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="first-year">1st Year</TabsTrigger>
                  <TabsTrigger value="second-year">2nd Year</TabsTrigger>
                  <TabsTrigger value="third-year">3rd Year</TabsTrigger>
                  <TabsTrigger value="fourth-year">4th Year</TabsTrigger>
                </TabsList>
                
                {/* 1st Year Students */}
                <TabsContent value="first-year">
                  {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : firstYearStudents.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {firstYearStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">
                              {student.firstName} {student.lastName}
                            </TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/departments/${params.id}/members/${student.id}`}>
                                  View Profile
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No 1st year students found in this department
                    </div>
                  )}
                </TabsContent>
                
                {/* 2nd Year Students */}
                <TabsContent value="second-year">
                  {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : secondYearStudents.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {secondYearStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">
                              {student.firstName} {student.lastName}
                            </TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/departments/${params.id}/members/${student.id}`}>
                                  View Profile
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No 2nd year students found in this department
                    </div>
                  )}
                </TabsContent>
                
                {/* 3rd Year Students */}
                <TabsContent value="third-year">
                  {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : thirdYearStudents.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {thirdYearStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">
                              {student.firstName} {student.lastName}
                            </TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/departments/${params.id}/members/${student.id}`}>
                                  View Profile
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No 3rd year students found in this department
                    </div>
                  )}
                </TabsContent>
                
                {/* 4th Year Students */}
                <TabsContent value="fourth-year">
                  {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : fourthYearStudents.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fourthYearStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">
                              {student.firstName} {student.lastName}
                            </TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/departments/${params.id}/members/${student.id}`}>
                                  View Profile
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No 4th year students found in this department
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Faculty/Staff Content */}
        <TabsContent value="facultyStaff">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">
                  Faculty and Staff Members
                </CardTitle>
                <div className="relative w-64">
                  <Input
                    placeholder="Search faculty/staff..."
                    value={facultySearchTerm}
                    onChange={(e) => setFacultySearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : facultyStaff.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facultyStaff.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">
                          {member.firstName} {member.lastName}
                        </TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {member.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/departments/${params.id}/members/${member.id}`}>
                              View Profile
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No faculty or staff members found in this department
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Member Dialog */}
      <Dialog open={addMemberDialog} onOpenChange={setAddMemberDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Member to {department?.name}</DialogTitle>
            <DialogDescription>
              Create a new user account and assign them directly to this department.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                <Input 
                  id="firstName" 
                  placeholder="Enter first name"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                <Input 
                  id="lastName" 
                  placeholder="Enter last name"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <Input 
                id="email" 
                type="email"
                placeholder="Enter email address"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
              <Input 
                id="username" 
                placeholder="Enter username"
                value={newUser.username}
                onChange={(e) => setNewUser({...newUser, username: e.target.value})}
              />
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
              <select 
                id="role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              >
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
                <option value="STAFF">Staff</option>
              </select>
            </div>
            
            {newUser.role === 'STUDENT' && (
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="yearLevel" className="text-sm font-medium text-gray-700">Year Level</label>
                <select 
                  id="yearLevel"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newUser.yearLevel}
                  onChange={(e) => setNewUser({...newUser, yearLevel: e.target.value})}
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddMemberDialog(false)}>Cancel</Button>
            <Button onClick={handleAddMember}>Add to {department?.name}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 