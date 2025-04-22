import { useState, useEffect, useRef, RefObject } from "react"
import { CapturedImage, FormType } from "@/features/health/types/form-types"
import { uploadDataUrl } from "@/utils/file-utils"

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [lastError, setLastError] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setVideoStream(stream)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setLastError("Failed to access camera")
    }
  }

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop())
      setVideoStream(null)
    }
  }

  const captureImage = (): CapturedImage | null => {
    try {
      if (!videoRef.current || !canvasRef.current) {
        console.error("Video or canvas ref is null")
        setLastError("Video capture not initialized")
        return null
      }
      
      const canvas = canvasRef.current
      const video = videoRef.current
      
      // Check if video is playing
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.error("Video dimensions are zero, video might not be playing")
        setLastError("Camera not ready yet")
        return null
      }
      
      console.log("Video dimensions:", video.videoWidth, "x", video.videoHeight)
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Draw video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        
        // Get data URL
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9) // Set quality to 0.9 (90%)
        console.log("Generated dataUrl length:", dataUrl.length)
        
        if (!dataUrl || dataUrl === 'data:,') {
          console.error("Empty or invalid data URL generated")
          setLastError("Failed to capture image data")
          return null
        }
        
        return {
          id: Date.now().toString(),
          dataUrl,
          formType: "",
          notes: ""
        }
      } else {
        console.error("Could not get canvas 2D context")
        setLastError("Failed to initialize canvas")
        return null
      }
    } catch (error) {
      console.error("Error in captureImage:", error)
      setLastError(`Capture error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return null
    }
  }

  const captureAndUploadImage = async (): Promise<CapturedImage | null> => {
    setLastError(null)
    setIsUploading(true)
    try {
      const capturedImage = captureImage()
      
      if (!capturedImage) {
        const errorMsg = lastError || "Failed to capture image"
        console.error(errorMsg)
        return null
      }
      
      // Check if we have a valid data URL to upload
      if (!capturedImage.dataUrl || capturedImage.dataUrl.length < 22) {
        console.error("Invalid data URL to upload:", capturedImage.dataUrl?.substring(0, 30))
        setLastError("Invalid image data captured")
        return null
      }
      
      // Wrap upload in a try/catch to handle errors specifically from upload
      try {
        // Set a timeout for the upload operation
        const uploadPromise = uploadDataUrl(capturedImage.dataUrl)
        const timeoutPromise = new Promise<string>((_, reject) => {
          setTimeout(() => reject(new Error("Upload timeout after 15 seconds")), 15000)
        })
        
        // Use Promise.race to handle timeouts
        const fileUrl = await Promise.race([uploadPromise, timeoutPromise])
        
        console.log("Upload successful, fileUrl:", fileUrl)
        
        return {
          ...capturedImage,
          fileUrl
        }
      } catch (uploadError) {
        console.error("Upload specific error:", uploadError)
        setLastError(`Upload failed: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`)
        return null
      }
    } catch (error) {
      console.error("Error in captureAndUploadImage:", error)
      setLastError(`Process error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return null
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return {
    videoRef,
    canvasRef,
    videoStream,
    isUploading,
    lastError,
    startCamera,
    stopCamera,
    captureImage,
    captureAndUploadImage
  }
} 