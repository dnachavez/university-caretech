"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GraduationCap, Users, Building, Search, ChevronRight, User, Eye } from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"

// Define types
interface Department {
  id: string
  name: string
  code: string
  description: string
}

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  yearLevel?: string
  healthForm?: {
    id: string
    middleInitial?: string
    gender: string
    birthdate: string
  }
}

interface DirectoryData {
  department: Department
  students: {
    firstYear: UserProfile[]
    secondYear: UserProfile[]
    thirdYear: UserProfile[]
    fourthYear: UserProfile[]
  }
  faculty: UserProfile[]
  staff: UserProfile[]
}

export default function DirectoryPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [departments, setDepartments] = useState<Department[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState<string>("")
  const [directoryData, setDirectoryData] = useState<DirectoryData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true)
  const [selectedTab, setSelectedTab] = useState("students")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoadingDepartments(true)
      try {
        const response = await fetch('/api/departments')
        const data = await response.json()
        
        if (data.departments) {
          setDepartments(data.departments)
          // Auto-select first department if available
          if (data.departments.length > 0 && !selectedDepartment) {
            setSelectedDepartment(data.departments[0].id)
          }
        } else {
          toast.error("Failed to load departments")
        }
      } catch (error) {
        console.error("Error fetching departments:", error)
        toast.error("Failed to load departments")
      } finally {
        setIsLoadingDepartments(false)
      }
    }

    fetchDepartments()
  }, [])

  // Fetch directory data when department changes
  useEffect(() => {
    if (selectedDepartment) {
      fetchDirectoryData(selectedDepartment)
    }
  }, [selectedDepartment])

  const fetchDirectoryData = async (departmentId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/directory?departmentId=${departmentId}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch directory data")
      }
      
      const data = await response.json()
      setDirectoryData(data)
    } catch (error) {
      console.error("Error fetching directory:", error)
      toast.error("Failed to load directory data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDepartmentChange = (departmentId: string) => {
    setSelectedDepartment(departmentId)
  }

  // Filter faculty and staff by search query
  const filteredFaculty = directoryData?.faculty.filter(member => 
    member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (member.healthForm?.middleInitial && 
     member.healthForm.middleInitial.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || []

  const filteredStaff = directoryData?.staff.filter(member => 
    member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (member.healthForm?.middleInitial && 
     member.healthForm.middleInitial.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || []

  // Filter students by search query
  const filteredFirstYear = directoryData?.students.firstYear.filter(student => 
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (student.healthForm?.middleInitial && 
     student.healthForm.middleInitial.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || []

  const filteredSecondYear = directoryData?.students.secondYear.filter(student => 
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (student.healthForm?.middleInitial && 
     student.healthForm.middleInitial.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || []

  const filteredThirdYear = directoryData?.students.thirdYear.filter(student => 
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (student.healthForm?.middleInitial && 
     student.healthForm.middleInitial.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || []

  const filteredFourthYear = directoryData?.students.fourthYear.filter(student => 
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (student.healthForm?.middleInitial && 
     student.healthForm.middleInitial.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || []

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">Directory</h1>
          <p className="text-gray-500">Browse users by department</p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Directory</span>
        </nav>
      </div>

      {/* Department Selection */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Select Department</CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedDepartment} 
            onValueChange={handleDepartmentChange} 
            disabled={isLoadingDepartments}
          >
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Directory Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : directoryData ? (
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3 flex flex-col sm:flex-row justify-between">
              <div>
                <CardTitle className="text-xl font-semibold">
                  {directoryData.department.name}
                </CardTitle>
                <CardDescription>
                  {directoryData.department.description || 'Department directory'}
                </CardDescription>
              </div>
              <div className="mt-2 sm:mt-0 relative w-full sm:w-64">
                <Input
                  placeholder="Search directory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="students" className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Students
                  </TabsTrigger>
                  <TabsTrigger value="faculty-staff" className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Faculty & Staff
                  </TabsTrigger>
                </TabsList>
                
                {/* Students Tab */}
                <TabsContent value="students">
                  <div className="space-y-4">
                    <Accordion type="single" collapsible className="w-full" defaultValue="first-year">
                      {/* First Year */}
                      <AccordionItem value="first-year">
                        <AccordionTrigger className="text-lg font-medium flex items-center">
                          <span className="flex items-center">
                            <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
                            1st Year
                            <span className="ml-2 text-sm text-gray-500">
                              ({filteredFirstYear.length})
                            </span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          {filteredFirstYear.length > 0 ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead className="hidden md:table-cell">Email</TableHead>
                                  <TableHead className="text-right">Profile</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredFirstYear.map(student => (
                                  <TableRow key={student.id}>
                                    <TableCell className="font-medium">
                                      {student.lastName}, {student.firstName} {student.healthForm?.middleInitial || ''}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                      {student.email}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/profile/${student.id}`}>
                                          <Eye className="h-4 w-4 mr-2" />
                                          View
                                        </Link>
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <div className="text-center py-4 text-gray-500">
                              No 1st year students found
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>

                      {/* Second Year */}
                      <AccordionItem value="second-year">
                        <AccordionTrigger className="text-lg font-medium flex items-center">
                          <span className="flex items-center">
                            <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
                            2nd Year
                            <span className="ml-2 text-sm text-gray-500">
                              ({filteredSecondYear.length})
                            </span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          {filteredSecondYear.length > 0 ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead className="hidden md:table-cell">Email</TableHead>
                                  <TableHead className="text-right">Profile</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredSecondYear.map(student => (
                                  <TableRow key={student.id}>
                                    <TableCell className="font-medium">
                                      {student.lastName}, {student.firstName} {student.healthForm?.middleInitial || ''}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                      {student.email}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/profile/${student.id}`}>
                                          <Eye className="h-4 w-4 mr-2" />
                                          View
                                        </Link>
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <div className="text-center py-4 text-gray-500">
                              No 2nd year students found
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>

                      {/* Third Year */}
                      <AccordionItem value="third-year">
                        <AccordionTrigger className="text-lg font-medium flex items-center">
                          <span className="flex items-center">
                            <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
                            3rd Year
                            <span className="ml-2 text-sm text-gray-500">
                              ({filteredThirdYear.length})
                            </span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          {filteredThirdYear.length > 0 ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead className="hidden md:table-cell">Email</TableHead>
                                  <TableHead className="text-right">Profile</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredThirdYear.map(student => (
                                  <TableRow key={student.id}>
                                    <TableCell className="font-medium">
                                      {student.lastName}, {student.firstName} {student.healthForm?.middleInitial || ''}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                      {student.email}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/profile/${student.id}`}>
                                          <Eye className="h-4 w-4 mr-2" />
                                          View
                                        </Link>
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <div className="text-center py-4 text-gray-500">
                              No 3rd year students found
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>

                      {/* Fourth Year */}
                      <AccordionItem value="fourth-year">
                        <AccordionTrigger className="text-lg font-medium flex items-center">
                          <span className="flex items-center">
                            <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
                            4th Year
                            <span className="ml-2 text-sm text-gray-500">
                              ({filteredFourthYear.length})
                            </span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          {filteredFourthYear.length > 0 ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead className="hidden md:table-cell">Email</TableHead>
                                  <TableHead className="text-right">Profile</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredFourthYear.map(student => (
                                  <TableRow key={student.id}>
                                    <TableCell className="font-medium">
                                      {student.lastName}, {student.firstName} {student.healthForm?.middleInitial || ''}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                      {student.email}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/profile/${student.id}`}>
                                          <Eye className="h-4 w-4 mr-2" />
                                          View
                                        </Link>
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <div className="text-center py-4 text-gray-500">
                              No 4th year students found
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </TabsContent>
                
                {/* Faculty & Staff Tab */}
                <TabsContent value="faculty-staff">
                  <div className="space-y-6">
                    {/* Faculty */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-500" />
                        Faculty
                        <span className="ml-2 text-sm text-gray-500">
                          ({filteredFaculty.length})
                        </span>
                      </h3>
                      {filteredFaculty.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead className="hidden md:table-cell">Email</TableHead>
                              <TableHead className="text-right">Profile</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredFaculty.map(faculty => (
                              <TableRow key={faculty.id}>
                                <TableCell className="font-medium">
                                  {faculty.lastName}, {faculty.firstName} {faculty.healthForm?.middleInitial || ''}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {faculty.email}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/profile/${faculty.id}`}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View
                                    </Link>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-4 text-gray-500 border rounded-md">
                          No faculty members found
                        </div>
                      )}
                    </div>
                    
                    {/* Staff */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <Building className="h-5 w-5 mr-2 text-blue-500" />
                        Staff
                        <span className="ml-2 text-sm text-gray-500">
                          ({filteredStaff.length})
                        </span>
                      </h3>
                      {filteredStaff.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead className="hidden md:table-cell">Email</TableHead>
                              <TableHead className="text-right">Profile</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredStaff.map(staff => (
                              <TableRow key={staff.id}>
                                <TableCell className="font-medium">
                                  {staff.lastName}, {staff.firstName} {staff.healthForm?.middleInitial || ''}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {staff.email}
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/profile/${staff.id}`}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View
                                    </Link>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-4 text-gray-500 border rounded-md">
                          No staff members found
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <Building className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No Department Selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Please select a department to view its directory
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 