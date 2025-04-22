"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { useCamera } from "@/hooks/useCamera"
import { UploadMethod, CameraState, CapturedImage } from "@/features/health/types/form-types"
import { UploadMethodSelector } from "@/features/health/components/upload-method-selector"
import { CameraCapture } from "@/features/health/components/camera-capture"
import { FormReview } from "@/features/health/components/form-review"
import { filesToCapturedImages, uploadFile, uploadDataUrl } from "@/utils/file-utils"
import { submitHealthForm } from "@/services/form-service"
import { toast } from "sonner"
import { useAuthStore } from "@/store/auth-store"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function UploadPage() {
  // State
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>(UploadMethod.SELECT)
  const [cameraState, setCameraState] = useState<CameraState>(CameraState.READY)
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false)
  const [isUploadingCaptured, setIsUploadingCaptured] = useState<boolean>(false)
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Hooks
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const { 
    videoRef, 
    canvasRef, 
    startCamera, 
    stopCamera,
    captureImage,
    captureAndUploadImage,
    isUploading,
    lastError
  } = useCamera()

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated || !user) {
      toast.error("Please login to submit forms")
      router.push("/auth")
      return
    }
    
    // Verify this is a faculty or staff
    if (user.role !== 'FACULTY' && user.role !== 'STAFF') {
      router.push(user.role === 'STUDENT' ? '/student/dashboard' : '/admin/dashboard')
    }
  }, [isAuthenticated, user, router])

  // React when there's a new camera error
  useEffect(() => {
    if (lastError) {
      toast.error(`Camera error: ${lastError}`)
    }
  }, [lastError])
  
  // Handlers
  const handleSelectMethod = (method: UploadMethod) => {
    setUploadMethod(method)
    if (method === UploadMethod.CAMERA) {
      setCameraState(CameraState.READY)
      startCamera()
    }
  }
  
  const handleOpenFilePicker = () => {
    fileInputRef.current?.click()
  }
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    
    if (files && files.length > 0) {
      setIsProcessingFile(true)
      try {
        console.log("Processing", files.length, "files")
        const newImages = await filesToCapturedImages(files)
        if (newImages.length > 0) {
          setCapturedImages(prev => [...prev, ...newImages])
          setUploadMethod(UploadMethod.REVIEWING)
          toast.success(`Successfully uploaded ${newImages.length} file(s)`)
        } else {
          toast.error("No files were processed successfully. Please try again.")
        }
      } catch (error) {
        toast.error(`Error processing files: ${error instanceof Error ? error.message : 'Unknown error'}`)
        console.error("File upload error:", error)
      } finally {
        setIsProcessingFile(false)
        // Reset the file input to allow re-uploading the same file if needed
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    }
  }
  
  const handleCaptureImage = async () => {
    setCameraState(CameraState.CAPTURED)
    const newImage = captureImage()
    if (newImage) {
      setCapturedImages(prev => [...prev, newImage])
      console.log("Image captured and added to state", newImage.id)
    } else {
      if (!lastError) {
        toast.error("Failed to capture image. Please try again.")
      }
    }
  }
  
  const handleRetakeImage = () => {
    setCameraState(CameraState.READY)
  }
  
  const handleUseImage = async () => {
    try {
      if (capturedImages.length === 0) {
        toast.error("No image to upload. Please capture an image first.")
        return
      }

      // Get the last captured image
      const lastImage = capturedImages[capturedImages.length - 1]
      if (!lastImage) {
        toast.error("No captured image found.")
        return
      }
      
      console.log("Uploading image, current state:", { 
        capturedImages: capturedImages.length,
        cameraState,
      })
      
      // Remove the last image that was just captured (without fileUrl)
      setCapturedImages(prev => prev.filter(img => img.id !== lastImage.id))
      
      // Use the existing dataUrl from the captured image instead of capturing again
      setIsUploadingCaptured(true)
      try {
        const fileUrl = await uploadDataUrl(lastImage.dataUrl)
        
        // Create the uploaded image with fileUrl
        const uploadedImage = {
          ...lastImage,
          fileUrl
        }
        
        setCapturedImages(prev => [...prev, uploadedImage])
        toast.success("Image uploaded successfully!")
        console.log("Image upload success:", fileUrl)
        
        if (cameraState === CameraState.REVIEWING) {
          setUploadMethod(UploadMethod.REVIEWING)
        } else {
          setCameraState(CameraState.REVIEWING)
        }
      } catch (uploadError) {
        console.error("Error uploading image data:", uploadError)
        // Add back the original image so user can try again
        setCapturedImages(prev => [...prev, lastImage])
        toast.error(`Upload failed: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`)
      } finally {
        setIsUploadingCaptured(false)
      }
    } catch (error) {
      toast.error(`Error processing image: ${error instanceof Error ? error.message : 'Unknown error'}`)
      console.error("Image upload error:", error)
    }
  }
  
  const handleBackToSelect = () => {
    setUploadMethod(UploadMethod.SELECT)
    stopCamera()
  }
  
  const handleAddMoreImage = () => {
    if (uploadMethod === UploadMethod.CAMERA) {
      setCameraState(CameraState.READY)
    } else {
      handleOpenFilePicker()
    }
  }
  
  const handleRemoveImage = (id: string) => {
    setCapturedImages(prev => prev.filter(img => img.id !== id))
  }
  
  const handleUpdateImage = (id: string, updates: Partial<CapturedImage>) => {
    setCapturedImages(prev => 
      prev.map(img => img.id === id ? { ...img, ...updates } : img)
    )
  }
  
  const handleSubmit = async () => {
    // Check user is logged in
    if (!user || !user.id) {
      toast.error("Please login to submit forms")
      router.push("/auth")
      return
    }

    // Check if any images don't have a form type
    const invalidImages = capturedImages.filter(img => !img.formType);
    if (invalidImages.length > 0) {
      toast.error("Please select a form type for all images")
      return
    }
    
    if (capturedImages.length === 0) {
      toast.error("Please capture or upload at least one image")
      return
    }
    
    // Check if all images have a fileUrl
    const notUploadedImages = capturedImages.filter(img => !img.fileUrl);
    if (notUploadedImages.length > 0) {
      toast.error("Some images haven't been fully processed, please wait or try again")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      console.log("Submitting forms to database with user ID:", user.id)
      const result = await submitHealthForm({
        userId: user.id,
        images: capturedImages
      })
      
      if (result.success) {
        toast.success(result.message)
        console.log("Form submission result:", result)
        // Reset form
        setCapturedImages([])
        setUploadMethod(UploadMethod.SELECT)
        setCameraState(CameraState.READY)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error(`Error submitting form: ${error instanceof Error ? error.message : 'Unknown error'}`)
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (!isAuthenticated || !user) {
    return null // Don't render anything while checking auth
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">Faculty/Staff Health Form</h1>
          <p className="text-gray-500">
            Upload your health forms to provide important health information
          </p>
        </div>
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/fs/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link href="/fs/forms" className="hover:text-blue-600">
            My Forms
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-700 font-medium">Upload</span>
        </nav>
      </div>
      
      <Card className="bg-white shadow-sm">
        {uploadMethod === UploadMethod.SELECT && (
          <UploadMethodSelector 
            onSelectMethod={handleSelectMethod}
            onOpenFilePicker={handleOpenFilePicker}
          />
        )}
        
        {uploadMethod === UploadMethod.CAMERA && (
          <CameraCapture
            videoRef={videoRef}
            canvasRef={canvasRef}
            cameraState={cameraState}
            onCapture={handleCaptureImage}
            onRetake={handleRetakeImage}
            onUseImage={handleUseImage}
            onBack={handleBackToSelect}
            capturedImages={capturedImages}
            isUploading={isUploading || isUploadingCaptured}
          />
        )}
        
        {uploadMethod === UploadMethod.REVIEWING && (
          <FormReview
            title="Review Upload Forms"
            capturedImages={capturedImages}
            onAddMoreClick={handleAddMoreImage}
            onRemoveImage={handleRemoveImage}
            onUpdateImage={handleUpdateImage}
            onSubmit={handleSubmit}
            onBack={handleBackToSelect}
            isSubmitting={isSubmitting}
            isProcessingFile={isProcessingFile}
          />
        )}
      </Card>
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx"
        onChange={handleFileUpload}
        multiple
      />
    </div>
  )
} 