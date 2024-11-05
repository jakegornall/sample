'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  label: string;
  onImageSelect: (image: string | null) => void;
  value: string | null;
}

export function ImageUpload({ label, onImageSelect, value }: ImageUploadProps) {
  const uploaderRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelect(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      if (!uploaderRef.current?.contains(document.activeElement)) {
        return;
      }

      const items = e.clipboardData?.items;
      
      if (items) {
        for (const item of Array.from(items)) {
          if (item.type.indexOf('image') !== -1) {
            const file = item.getAsFile();
            if (file) {
              handleFile(file);
              e.preventDefault();
              break;
            }
          }
        }
      }
    };

    document.addEventListener('paste', handleGlobalPaste);
    
    return () => {
      document.removeEventListener('paste', handleGlobalPaste);
    };
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div 
        ref={uploaderRef}
        className="border-2 border-dashed rounded-lg p-4 text-center"
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
            return;
          }
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            const input = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
            input?.click();
          }
        }}
      >
        {value ? (
          <div className="relative h-48">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-contain"
            />
            <button 
              onClick={() => onImageSelect(null)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ) : (
          <label className="cursor-pointer">
            <div className="py-8">
              <p className="text-sm text-gray-500">
                Click to upload, drag and drop, or paste an image
              </p>
              <p className="text-xs text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    </div>
  );
} 