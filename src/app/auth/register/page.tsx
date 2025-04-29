"use client"

import Link from "next/link"
import { SignUpForm } from "@/features/auth/components/sign-up-form"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
 
export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("sign-up")
  
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Create an Account</h1>
            <p className="text-gray-600 mt-2">Sign up to access medical services</p>
          </div>
          
          <SignUpForm onTabChange={setActiveTab} />

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 