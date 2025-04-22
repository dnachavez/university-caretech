"use client"

import { RefObject } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, RotateCcw, Plus, Loader2 } from "lucide-react"
import { CameraState, CapturedImage } from "../types/form-types"

interface CameraCaptureProps {
  videoRef: RefObject<HTMLVideoElement | null>
  canvasRef: RefObject<HTMLCanvasElement | null>
  cameraState: CameraState
  onCapture: () => void
  onRetake: () => void
  onUseImage: () => void
  onBack: () => void
  capturedImages: CapturedImage[]
  isUploading?: boolean
}

export function CameraCapture({
  videoRef,
  canvasRef,
  cameraState,
  onCapture,
  onRetake,
  onUseImage,
  onBack,
  capturedImages,
  isUploading = false
}: CameraCaptureProps) {
  return (
    <>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-700">
            {cameraState === CameraState.REVIEWING ? "Review Captured Images" : "Capture Form"}
          </CardTitle>
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {cameraState === CameraState.READY && (
          <>
            <div className="bg-black rounded-lg overflow-hidden mb-4 aspect-video">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              ></video>
            </div>
            
            <div className="flex justify-center mb-4">
              <Button
                onClick={onCapture}
                className="w-full max-w-xs py-2 px-6 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb]"
              >
                Capture Image
              </Button>
            </div>
            
            <div className="text-gray-600 p-4 bg-blue-50 rounded-lg">
              <p className="font-medium text-blue-800 mb-2">Tips for best results:</p>
              <ul className="list-disc pl-5 space-y-1 text-blue-700">
                <li>Ensure good lighting</li>
                <li>Place the form on a flat surface</li>
                <li>Keep the camera steady</li>
                <li>Make sure all corners are visible</li>
              </ul>
            </div>
            
            <canvas ref={canvasRef} className="hidden"></canvas>
          </>
        )}
        
        {cameraState === CameraState.CAPTURED && (
          <>
            <div className="bg-black rounded-lg overflow-hidden mb-4">
              <img 
                src={capturedImages[capturedImages.length - 1]?.dataUrl} 
                alt="Captured form" 
                className="w-full object-contain max-h-[400px]" 
              />
            </div>
            
            <div className="flex justify-center gap-4 mb-4">
              <Button
                variant="outline"
                onClick={onRetake}
                disabled={isUploading}
                className="py-2 px-6 bg-[#f5f5ff] text-[#5b6779] font-medium text-sm rounded-lg border border-[#dde5f0] hover:bg-[#eef2fb] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb]"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake
              </Button>
              
              <Button
                onClick={onUseImage}
                disabled={isUploading}
                className="py-2 px-6 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb]"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Use this image
                  </>
                )}
              </Button>
            </div>
          </>
        )}
        
        {cameraState === CameraState.REVIEWING && (
          <>
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {capturedImages.map((img) => (
                  <div key={img.id} className="relative group border rounded overflow-hidden">
                    <img 
                      src={img.dataUrl}
                      alt="Captured form"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
                
                <button 
                  className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded hover:border-blue-500 transition-colors"
                  onClick={() => onRetake()}
                >
                  <Plus className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500 mt-1">Add Another</span>
                </button>
              </div>
              
              <div className="flex flex-col items-center mt-6">
                <p className="text-gray-600 mb-4 text-center">
                  If you've captured all your forms, proceed to the next step to add form details
                </p>
                <Button
                  onClick={onUseImage}
                  disabled={isUploading}
                  className="py-2 px-6 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb]"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Continue to Form Details
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </>
  )
} 