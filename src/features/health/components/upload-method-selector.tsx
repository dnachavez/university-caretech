"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Upload } from "lucide-react"
import { UploadMethod } from "../types/form-types"

interface UploadMethodSelectorProps {
  onSelectMethod: (method: UploadMethod) => void
  onOpenFilePicker: () => void
}

export function UploadMethodSelector({ onSelectMethod, onOpenFilePicker }: UploadMethodSelectorProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700">Choose Upload Method</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className="cursor-pointer border-2 hover:border-blue-500 transition-all"
            onClick={() => onSelectMethod(UploadMethod.CAMERA)}
          >
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Use Camera</h3>
              <p className="text-gray-600 text-center">Scan form using your device's camera</p>
            </CardContent>
          </Card>
          
          <Card
            className="cursor-pointer border-2 hover:border-blue-500 transition-all"
            onClick={onOpenFilePicker}
          >
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Upload File</h3>
              <p className="text-gray-600 text-center">Upload an existing file from your device</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </>
  )
} 