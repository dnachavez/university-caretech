"use client"

import type React from "react"
import { ChevronDown, User, Mail, Phone, Lock, Loader2, Building, GraduationCap } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface Department {
  id: string
  name: string
}

interface SignUpFormProps {
  onTabChange: (tab: string) => void
}

export function SignUpForm({ onTabChange }: SignUpFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    departmentId: "",
    yearLevel: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [departments, setDepartments] = useState<Department[]>([])
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false)

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoadingDepartments(true)
      try {
        const response = await fetch('/api/departments')
        const data = await response.json()
        
        if (data.departments) {
          setDepartments(data.departments)
        } else {
          console.error("Failed to load departments")
        }
      } catch (error) {
        console.error("Error fetching departments:", error)
      } finally {
        setIsLoadingDepartments(false)
      }
    }

    fetchDepartments()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }))
    }
  }

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: value,
      // Reset dependent fields when role changes
      departmentId: "",
      yearLevel: ""
    }))
    
    if (errors.role) {
      setErrors(prev => ({
        ...prev,
        role: ""
      }))
    }
  }

  const handleDepartmentChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      departmentId: value
    }))
    
    if (errors.departmentId) {
      setErrors(prev => ({
        ...prev,
        departmentId: ""
      }))
    }
  }

  const handleYearLevelChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      yearLevel: value
    }))
    
    if (errors.yearLevel) {
      setErrors(prev => ({
        ...prev,
        yearLevel: ""
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    
    if (!formData.username.trim()) newErrors.username = "Username is required"
    
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    
    if (!formData.role) newErrors.role = "Please select a role"

    // Validate department for faculty, staff, and student
    if (formData.role && (formData.role === "faculty" || formData.role === "staff" || formData.role === "student")) {
      if (!formData.departmentId) {
        newErrors.departmentId = "Please select a department"
      }
    }

    // Validate year level for students
    if (formData.role === "student" && !formData.yearLevel) {
      newErrors.yearLevel = "Please select a year level"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const requestBody: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role: formData.role
      }

      // Add departmentId for faculty, staff, and student
      if (formData.role && (formData.role === "faculty" || formData.role === "staff" || formData.role === "student")) {
        requestBody.departmentId = formData.departmentId
      }

      // Add yearLevel for student
      if (formData.role === "student") {
        requestBody.yearLevel = formData.yearLevel
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }
      
      setRegistrationSuccess(true)
      toast.success(
        "Registration successful! Please check your email to verify your account."
      )
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",
        role: "",
        departmentId: "",
        yearLevel: ""
      })
      
    } catch (error) {
      console.error("Registration error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to register. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-[#5b6779] text-sm font-medium">
                First Name
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  className={`w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-[#5b6779] text-sm font-medium">
                Last Name
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  className={`w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
              {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#5b6779] text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border ${errors.email ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                  value={formData.email}
                  onChange={handleChange}
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#5b6779] text-sm font-medium">
                Phone
              </Label>
              <div className="relative">
                <Input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-[#5b6779] text-sm font-medium">
              Username
            </Label>
            <div className="relative">
              <Input
                type="text"
                id="username"
                placeholder="Create a username"
                className={`w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border ${errors.username ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                value={formData.username}
                onChange={handleChange}
              />
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
            </div>
            {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#5b6779] text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  className={`w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border ${errors.password ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
              {errors.password ? (
                <p className="text-xs text-red-500">{errors.password}</p>
              ) : (
                <p className="text-xs text-[#5b6779]">Min. 8 characters</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#5b6779] text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className={`w-full py-2 pl-3 pr-10 bg-[#f5f5ff] text-[#5b6779] text-sm rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5b6779] pointer-events-none" />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-[#5b6779] text-sm font-medium">
              Role
            </Label>
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger id="role" className={`w-full bg-[#f5f5ff] text-[#5b6779] rounded-lg border ${errors.role ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
          </div>

          {/* Department selection for faculty, staff and student */}
          {formData.role && (formData.role === "faculty" || formData.role === "staff" || formData.role === "student") && (
            <div className="space-y-2">
              <Label htmlFor="department" className="text-[#5b6779] text-sm font-medium flex items-center">
                <Building className="h-4 w-4 mr-1 text-[#5b6779]" /> Department
              </Label>
              <Select value={formData.departmentId} onValueChange={handleDepartmentChange}>
                <SelectTrigger id="department" className={`w-full bg-[#f5f5ff] text-[#5b6779] rounded-lg border ${errors.departmentId ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}>
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingDepartments ? (
                    <SelectItem value="loading" disabled>Loading departments...</SelectItem>
                  ) : departments.length > 0 ? (
                    departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>No departments found</SelectItem>
                  )}
                </SelectContent>
              </Select>
              {errors.departmentId && <p className="text-xs text-red-500">{errors.departmentId}</p>}
            </div>
          )}

          {/* Year Level selection for students */}
          {formData.role === "student" && (
            <div className="space-y-2">
              <Label htmlFor="yearLevel" className="text-[#5b6779] text-sm font-medium flex items-center">
                <GraduationCap className="h-4 w-4 mr-1 text-[#5b6779]" /> Year Level
              </Label>
              <Select value={formData.yearLevel} onValueChange={handleYearLevelChange}>
                <SelectTrigger id="yearLevel" className={`w-full bg-[#f5f5ff] text-[#5b6779] rounded-lg border ${errors.yearLevel ? 'border-red-500' : 'border-[#dde5f0]'} focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]`}>
                  <SelectValue placeholder="Select year level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                </SelectContent>
              </Select>
              {errors.yearLevel && <p className="text-xs text-red-500">{errors.yearLevel}</p>}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-3 mt-4 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb] disabled:opacity-70 flex justify-center items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          <div className="relative flex items-center justify-center mt-4">
            <Separator className="absolute w-full" />
            <span className="bg-[#f5f5ff] px-2 text-sm text-[#5b6779] relative">OR</span>
          </div>

          <Button
            variant="outline"
            type="button"
            onClick={() => onTabChange("signin")}
            className="w-full py-2 px-3 mt-4 bg-[#f5f5ff] text-[#5b6779] font-medium text-sm rounded-lg border border-[#dde5f0] hover:bg-[#eef2fb] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb]"
          >
            Already have an account? Sign in
          </Button>
        </div>
      </form>
    </div>
  )
} 