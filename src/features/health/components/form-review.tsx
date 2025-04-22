"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Plus, Loader2 } from "lucide-react"
import { CapturedImage } from "../types/form-types"
import { ImageFormItem } from "./image-form-item"

interface FormReviewProps {
  title: string
  capturedImages: CapturedImage[]
  onAddMoreClick: () => void
  onRemoveImage: (id: string) => void
  onUpdateImage: (id: string, updates: Partial<CapturedImage>) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting?: boolean
  isProcessingFile?: boolean
}

export function FormReview({
  title,
  capturedImages,
  onAddMoreClick,
  onRemoveImage,
  onUpdateImage,
  onSubmit,
  onBack,
  isSubmitting = false,
  isProcessingFile = false
}: FormReviewProps) {
  const isValid = capturedImages.length > 0 && 
    capturedImages.every(img => img.formType !== "");

  return (
    <>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-700">
            {title}
          </CardTitle>
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isProcessingFile && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg flex items-center text-blue-800">
            <Loader2 className="h-5 w-5 mr-2 animate-spin text-blue-600" />
            <p>Processing your files, please wait...</p>
          </div>
        )}
        
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-4">Form Images</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capturedImages.map((image) => (
              <ImageFormItem 
                key={image.id}
                image={image}
                onUpdate={onUpdateImage}
                onRemove={onRemoveImage}
              />
            ))}
            
            <div 
              onClick={onAddMoreClick}
              className="flex items-center justify-center h-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-gray-600">Add Another Form</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={onSubmit}
            disabled={!isValid || isSubmitting || isProcessingFile}
            className="py-2 px-6 bg-[#166cbb] text-white font-medium text-sm rounded-lg hover:bg-[#1259a1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d9e6fb] disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Forms
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </>
  )
} 