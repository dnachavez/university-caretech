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
  // Collapsible state for year sections
  const [yearSectionState, setYearSectionState] = useState({
    'first': true,
    'second': true,
    'third': true,
    'fourth': true
  })
  // Pagination state for year sections
  const [paginationState, setPaginationState] = useState({
    'first': 1,
    'second': 1,
    'third': 1,
    'fourth': 1
  })
  const studentsPerPage = 20
  
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
  
  // Get faculty and staff with search filter, sorted alphabetically by last name, then first name
  const facultyStaff = filteredUsers
    .filter(user => 
      (user.role === 'FACULTY' || user.role === 'STAFF') &&
      (user.firstName.toLowerCase().includes(facultySearchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(facultySearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(facultySearchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      // Sort alphabetically by last name, then first name
      const lastNameCompare = a.lastName.localeCompare(b.lastName);
      if (lastNameCompare !== 0) return lastNameCompare;
      return a.firstName.localeCompare(b.firstName);
    });
  
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
  
  // Helper function to toggle year section collapse state
  const toggleYearSection = (year: 'first' | 'second' | 'third' | 'fourth') => {
    setYearSectionState(prev => ({
      ...prev,
      [year]: !prev[year]
    }))
  }

  // Helper function to paginate student data
  const getPaginatedStudents = (students: User[], year: 'first' | 'second' | 'third' | 'fourth') => {
    const currentPage = paginationState[year]
    const startIndex = (currentPage - 1) * studentsPerPage
    const endIndex = startIndex + studentsPerPage
    return students.slice(startIndex, endIndex)
  }

  // Helper function to handle page changes
  const handlePageChange = (year: 'first' | 'second' | 'third' | 'fourth', page: number) => {
    setPaginationState(prev => ({
      ...prev,
      [year]: page
    }))
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
              {isLoading ? (
                <div className="text-center py-4">Loading students...</div>
              ) : (
                <div className="space-y-6">
                  {/* 1st Year Students */}
                  <div className="border rounded-md overflow-hidden">
                    <div 
                      className="bg-gray-50 p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleYearSection('first')}
                    >
                      <h3 className="text-lg font-medium text-blue-700 flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2" />
                        1st Year Students
                        <Badge className="ml-2 bg-blue-100 text-blue-800">
                          {firstYearStudents.length}
                        </Badge>
                      </h3>
                      <ChevronRight 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${yearSectionState.first ? 'rotate-90' : ''}`} 
                      />
                    </div>
                    
                    {yearSectionState.first && (
                      <div className="p-2">
                        {firstYearStudents.length > 0 ? (
                          <>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Email</TableHead>
                                  <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {getPaginatedStudents(firstYearStudents, 'first').map((student) => (
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
                            
                            {/* Pagination for 1st year */}
                            {firstYearStudents.length > studentsPerPage && (
                              <div className="flex justify-center items-center space-x-2 mt-4">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handlePageChange('first', paginationState.first - 1)}
                                  disabled={paginationState.first === 1}
                                >
                                  Previous
                                </Button>
                                <span className="text-sm text-gray-600">
                                  Page {paginationState.first} of {Math.ceil(firstYearStudents.length / studentsPerPage)}
                                </span>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handlePageChange('first', paginationState.first + 1)}
                                  disabled={paginationState.first >= Math.ceil(firstYearStudents.length / studentsPerPage)}
                                >
                                  Next
                                </Button>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md">
                            No 1st year students found in this department
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 2nd Year Students */}
                  <div className="border rounded-md overflow-hidden">
                    <div 
                      className="bg-gray-50 p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleYearSection('second')}
                    >
                      <h3 className="text-lg font-medium text-blue-700 flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2" />
                        2nd Year Students
                        <Badge className="ml-2 bg-blue-100 text-blue-800">
                          {secondYearStudents.length}
                        </Badge>
                      </h3>
                      <ChevronRight 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${yearSectionState.second ? 'rotate-90' : ''}`} 
                      />
                    </div>
                    
                    {yearSectionState.second && (
                      <div className="p-2">
                        {secondYearStudents.length > 0 ? (
                          <>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Email</TableHead>
                                  <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {getPaginatedStudents(secondYearStudents, 'second').map((student) => (
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
                            
                            {/* Pagination for 2nd year */}
                            {secondYearStudents.length > studentsPerPage && (
                              <div className="flex justify-center items-center space-x-2 mt-4">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handlePageChange('second', paginationState.second - 1)}
                                  disabled={paginationState.second === 1}
                                >
                                  Previous
                                </Button>
                                <span className="text-sm text-gray-600">
                                  Page {paginationState.second} of {Math.ceil(secondYearStudents.length / studentsPerPage)}
                                </span>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handlePageChange('second', paginationState.second + 1)}
                                  disabled={paginationState.second >= Math.ceil(secondYearStudents.length / studentsPerPage)}
                                >
                                  Next
                                </Button>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md">
                            No 2nd year students found in this department
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 3rd Year Students */}
                  <div className="border rounded-md overflow-hidden">
                    <div 
                      className="bg-gray-50 p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleYearSection('third')}
                    >
                      <h3 className="text-lg font-medium text-blue-700 flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2" />
                        3rd Year Students
                        <Badge className="ml-2 bg-blue-100 text-blue-800">
                          {thirdYearStudents.length}
                        </Badge>
                      </h3>
                      <ChevronRight 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${yearSectionState.third ? 'rotate-90' : ''}`} 
                      />
                    </div>
                    
                    {yearSectionState.third && (
                      <div className="p-2">
                        {thirdYearStudents.length > 0 ? (
                          <>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Email</TableHead>
                                  <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {getPaginatedStudents(thirdYearStudents, 'third').map((student) => (
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
                            
                            {/* Pagination for 3rd year */}
                            {thirdYearStudents.length > studentsPerPage && (
                              <div className="flex justify-center items-center space-x-2 mt-4">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handlePageChange('third', paginationState.third - 1)}
                                  disabled={paginationState.third === 1}
                                >
                                  Previous
                                </Button>
                                <span className="text-sm text-gray-600">
                                  Page {paginationState.third} of {Math.ceil(thirdYearStudents.length / studentsPerPage)}
                                </span>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handlePageChange('third', paginationState.third + 1)}
                                  disabled={paginationState.third >= Math.ceil(thirdYearStudents.length / studentsPerPage)}
                                >
                                  Next
                                </Button>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md">
                            No 3rd year students found in this department
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 4th Year Students */}
                  <div className="border rounded-md overflow-hidden">
                    <div 
                      className="bg-gray-50 p-3 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleYearSection('fourth')}
                    >
                      <h3 className="text-lg font-medium text-blue-700 flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2" />
                        4th Year Students
                        <Badge className="ml-2 bg-blue-100 text-blue-800">
                          {fourthYearStudents.length}
                        </Badge>
                      </h3>
                      <ChevronRight 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${yearSectionState.fourth ? 'rotate-90' : ''}`} 
                      />
                    </div>
                    
                    {yearSectionState.fourth && (
                      <div className="p-2">
                        {fourthYearStudents.length > 0 ? (
                          <>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Email</TableHead>
                                  <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {getPaginatedStudents(fourthYearStudents, 'fourth').map((student) => (
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
                            
                            {/* Pagination for 4th year */}
                            {fourthYearStudents.length > studentsPerPage && (
                              <div className="flex justify-center items-center space-x-2 mt-4">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handlePageChange('fourth', paginationState.fourth - 1)}
                                  disabled={paginationState.fourth === 1}
                                >
                                  Previous
                                </Button>
                                <span className="text-sm text-gray-600">
                                  Page {paginationState.fourth} of {Math.ceil(fourthYearStudents.length / studentsPerPage)}
                                </span>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handlePageChange('fourth', paginationState.fourth + 1)}
                                  disabled={paginationState.fourth >= Math.ceil(fourthYearStudents.length / studentsPerPage)}
                                >
                                  Next
                                </Button>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md">
                            No 4th year students found in this department
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
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