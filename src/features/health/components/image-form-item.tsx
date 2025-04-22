"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { CapturedImage, FormType } from "../types/form-types"

interface ImageFormItemProps {
  image: CapturedImage
  onUpdate: (id: string, updates: Partial<CapturedImage>) => void
  onRemove: (id: string) => void
}

export function ImageFormItem({ image, onUpdate, onRemove }: ImageFormItemProps) {
  const handleFormTypeChange = (value: string) => {
    onUpdate(image.id, { formType: value as FormType })
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate(image.id, { notes: e.target.value })
  }

  return (
    <Card className="p-4 relative">
      <button
        className="absolute top-2 right-2 bg-red-100 p-1 rounded-full hover:bg-red-200 transition-colors z-10"
        onClick={() => onRemove(image.id)}
      >
        <X className="h-4 w-4 text-red-600" />
      </button>
      
      <div className="space-y-4">
        <div className="relative">
          <img 
            src={image.dataUrl}
            alt="Form image"
            className="w-full h-48 object-contain mb-4 rounded border border-gray-200" 
          />
        </div>
        
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor={`formType-${image.id}`}>Form Type</Label>
            <Select value={image.formType} onValueChange={handleFormTypeChange}>
              <SelectTrigger id={`formType-${image.id}`}>
                <SelectValue placeholder="Select form type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="health">Health Form</SelectItem>
                <SelectItem value="medical">Medical Certificate</SelectItem>
                <SelectItem value="vaccination">Vaccination Record</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor={`notes-${image.id}`}>Notes</Label>
            <Textarea 
              id={`notes-${image.id}`}
              placeholder="Add notes about this form"
              value={image.notes}
              onChange={handleNotesChange}
              className="min-h-[80px]"
            />
          </div>
        </div>
      </div>
    </Card>
  )
} 