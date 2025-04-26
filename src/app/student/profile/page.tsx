"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Loader2, Save } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function ProfilePage() {
  const { user, login } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || ""
      }))
    }
  }, [user])

  // Input field classes (change to white background)
  const inputClassName = "w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb]";
  const disabledInputClassName = "w-full py-2 pl-3 pr-10 bg-white text-[#5b6779] text-sm rounded-lg border border-[#dde5f0] focus:outline-none focus:ring-1 focus:ring-[#d9e6fb] disabled:opacity-70 disabled:cursor-not-allowed";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    // First and last name are required
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    
    // Password validation
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Current password is required to set a new password"
      }
      
      if (formData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters"
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }
    
    // If confirm password is entered but not new password
    if (formData.confirmPassword && !formData.newPassword) {
      newErrors.newPassword = "New password is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || !user) return

    try {
      setLoading(true)
      
      // Make API call to update the user profile
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          currentPassword: formData.currentPassword || undefined,
          newPassword: formData.newPassword || undefined,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        if (response.status === 401) {
          setErrors({
            currentPassword: data.error || "Current password is incorrect"
          })
          throw new Error(data.error || "Authentication failed")
        } else {
          throw new Error(data.error || "Failed to update profile")
        }
      }
      
      // Update local user state with the new data
      if (data.user) {
        // Update the user locally instead of re-login
        useAuthStore.setState({
          user: {
            ...user,
            firstName: data.user.firstName,
            lastName: data.user.lastName
          }
        })
      }
      
      toast.success("Profile updated successfully")
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }))
    } catch (error) {
      console.error(error)
      if (!(error instanceof Error) || !error.message.includes("Authentication failed")) {
        toast.error(error instanceof Error ? error.message : "Failed to update profile")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Custom Dashboard Header with Breadcrumb */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">Profile Settings</h1>
          <p className="text-gray-500">
            Update your profile information and password
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/student/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Profile</span>
        </nav>
      </div>

      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-700">Account Information</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Account Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[#5b6779] text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  value={user?.username || ""}
                  disabled
                  className={disabledInputClassName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#5b6779] text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className={disabledInputClassName}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber" className="text-[#5b6779] text-sm font-medium">
                ID Number
              </Label>
              <Input
                id="idNumber"
                value={user?.idNumber || ""}
                disabled
                className={disabledInputClassName}
              />
            </div>

            {/* Personal Information */}
            <div>
              <CardTitle className="text-gray-700 mb-4">Personal Information</CardTitle>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#5b6779] text-sm font-medium">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`${inputClassName} ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#5b6779] text-sm font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`${inputClassName} ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                </div>
              </div>
            </div>

            {/* Separator and Password Change */}
            <Separator className="my-4" />
            
            <div>
              <CardTitle className="text-gray-700 mb-4">Change Password</CardTitle>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-[#5b6779] text-sm font-medium">
                    Current Password {formData.newPassword && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className={`${inputClassName} ${errors.currentPassword ? 'border-red-500' : ''}`}
                  />
                  {errors.currentPassword && <p className="text-xs text-red-500 mt-1">{errors.currentPassword}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-[#5b6779] text-sm font-medium">
                      New Password {formData.confirmPassword && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={`${inputClassName} ${errors.newPassword ? 'border-red-500' : ''}`}
                    />
                    {errors.newPassword && <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-[#5b6779] text-sm font-medium">
                      Confirm Password {formData.newPassword && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`${inputClassName} ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end pt-6 border-t">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb] disabled:opacity-70 flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 