
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string) => void;
  currentImage?: string;
}

export default function ImageUploader({ onImageUpload, currentImage }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onImageUpload(result);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreviewUrl(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onImageUpload("");
  };

  return (
    <div className="space-y-3">
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="cursor-pointer"
      />

      {previewUrl && (
        <div className="relative mt-2">
          <img src={previewUrl} alt="Preview" className="max-h-48 rounded-md" />
          <Button
            variant="outline"
            size="icon"
            onClick={clearImage}
            className="absolute top-1 right-1 bg-white bg-opacity-75 hover:bg-white hover:bg-opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
