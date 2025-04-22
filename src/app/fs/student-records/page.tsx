"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, Search } from "lucide-react"
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/features/medical/components/page-header"
import { useAuthStore } from "@/store/auth-store"

// Define student type
interface Student {
  id: string
  lastName: string
  firstName: string
  middleInitial: string
  birthdate: string
  gender: string
}

// Define form input state
interface SearchFormState {
  lastName: string
  firstName: string
  middleInitial: string
}

// Storage key constants
const STORAGE_KEY_RESULTS = "studentSearchResults"
const STORAGE_KEY_FORM = "studentSearchForm"
const STORAGE_KEY_QUERY = "studentSearchFilterQuery"

export default function StudentRecordsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [lastName, setLastName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [middleInitial, setMiddleInitial] = useState("")
  const [searchResults, setSearchResults] = useState<Student[] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Protect this route
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth')
      return
    }
    
    // Verify this is a faculty or staff
    if (user.role !== 'FACULTY' && user.role !== 'STAFF') {
      router.push(user.role === 'STUDENT' ? '/student/dashboard' : '/admin/dashboard')
    }
  }, [isAuthenticated, user, router])
  
  // Load saved state from sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Restore search results
        const savedResults = sessionStorage.getItem(STORAGE_KEY_RESULTS)
        if (savedResults) {
          setSearchResults(JSON.parse(savedResults))
        }
        
        // Restore form state
        const savedForm = sessionStorage.getItem(STORAGE_KEY_FORM)
        if (savedForm) {
          const formState = JSON.parse(savedForm) as SearchFormState
          setLastName(formState.lastName)
          setFirstName(formState.firstName)
          setMiddleInitial(formState.middleInitial)
        }
        
        // Restore filter query
        const savedQuery = sessionStorage.getItem(STORAGE_KEY_QUERY)
        if (savedQuery) {
          setSearchQuery(savedQuery)
        }
      } catch (err) {
        console.error("Error restoring saved state:", err)
        // If there's an error, clear the storage
        sessionStorage.removeItem(STORAGE_KEY_RESULTS)
        sessionStorage.removeItem(STORAGE_KEY_FORM)
        sessionStorage.removeItem(STORAGE_KEY_QUERY)
      }
    }
  }, [])
  
  // Save state to sessionStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && searchResults) {
      // Save search results
      sessionStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(searchResults))
      
      // Save form state
      const formState: SearchFormState = {
        lastName,
        firstName,
        middleInitial
      }
      sessionStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(formState))
    }
  }, [searchResults, lastName, firstName, middleInitial])
  
  // Save filter query when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY_QUERY, searchQuery)
    }
  }, [searchQuery])
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!lastName && !firstName && !middleInitial) {
      setError("Please enter at least one search criteria")
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams()
      if (lastName) params.append("lastName", lastName)
      if (firstName) params.append("firstName", firstName)
      if (middleInitial) params.append("middleInitial", middleInitial)
      
      const response = await fetch(`/api/fs/search-students?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to search for students')
      }
      
      const data = await response.json()
      setSearchResults(data)
      
      // Save to sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(data))
        
        // Save form state
        const formState: SearchFormState = {
          lastName,
          firstName,
          middleInitial
        }
        sessionStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(formState))
      }
    } catch (err) {
      console.error("Error searching for students:", err)
      setError("Failed to search for students. Please try again.")
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }
  
  // Clear all saved search data
  const handleClearSearch = () => {
    setSearchResults(null)
    setLastName("")
    setFirstName("")
    setMiddleInitial("")
    setSearchQuery("")
    setError(null)
    
    // Clear sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY_RESULTS)
      sessionStorage.removeItem(STORAGE_KEY_FORM)
      sessionStorage.removeItem(STORAGE_KEY_QUERY)
    }
  }
  
  // Filter the search results based on the search query in the results table
  const filteredSearchResults = searchResults ? 
    searchResults.filter(student => 
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.middleInitial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.gender.toLowerCase().includes(searchQuery.toLowerCase())
    ) : null
  
  const viewStudentRecords = (studentId: string) => {
    router.push(`/fs/student-records/${studentId}`)
  }
  
  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Student Records" 
        description="Search and access student health forms and medical records" 
        currentPage="Student Records"
        baseUrl="/fs"
      />
      
      <div className="grid grid-cols-1 gap-6">
        {/* Search Form Card */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-700">Student Search</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[#5b6779] text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter student's last name"
                      className="w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[#5b6779] text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter student's first name"
                      className="w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="middleInitial" className="text-[#5b6779] text-sm font-medium">
                      Middle Initial
                    </Label>
                    <Input
                      id="middleInitial"
                      value={middleInitial}
                      onChange={(e) => setMiddleInitial(e.target.value)}
                      placeholder="M.I."
                      className="w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                      maxLength={2}
                    />
                  </div>
                </div>
                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {searchResults && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClearSearch}
                className="text-gray-500"
              >
                Clear Search
              </Button>
            )}
            <Button
              type="submit"
              onClick={handleSearch}
              disabled={isLoading}
              className="w-auto py-2 px-6 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb]"
            >
              {isLoading ? "Searching..." : "Search Student"}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Results Table */}
        {searchResults && (
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-gray-700">Search Results</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Filter results..."
                  className="pl-8 text-sm h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500">Searching...</p>
                </div>
              ) : filteredSearchResults && filteredSearchResults.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>M.I.</TableHead>
                      <TableHead>Birthdate</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSearchResults.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.id.slice(0, 8)}</TableCell>
                        <TableCell>{student.lastName}</TableCell>
                        <TableCell>{student.firstName}</TableCell>
                        <TableCell>{student.middleInitial}</TableCell>
                        <TableCell>{student.birthdate}</TableCell>
                        <TableCell>{student.gender}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="View record"
                            className="text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                            onClick={() => viewStudentRecords(student.id)}
                          >
                            <Eye className="h-5 w-5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {searchResults.length === 0 
                    ? "No students found matching your search criteria."
                    : "No results match your filter criteria."
                  }
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 