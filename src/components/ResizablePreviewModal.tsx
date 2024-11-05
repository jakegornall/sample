'use client';

import { useState } from 'react';
import { Resizable } from 're-resizable';
import { X, Minimize2 } from 'lucide-react';

interface ResizablePreviewModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export function ResizablePreviewModal({ onClose, children }: ResizablePreviewModalProps) {
  const [size, setSize] = useState({ width: 800, height: 600 });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl">
        <div className="absolute right-2 top-2 flex gap-2 z-10">
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            aria-label="Close preview"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <Resizable
          size={size}
          onResizeStop={(e, direction, ref, d) => {
            setSize({
              width: size.width + d.width,
              height: size.height + d.height,
            });
          }}
          minWidth={320}
          minHeight={400}
          maxWidth="90vw"
          maxHeight="90vh"
        >
          <div className="w-full h-full overflow-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">
                Current size: {Math.round(size.width)}px × {Math.round(size.height)}px
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border h-[calc(100%-2rem)]">
              {children}
            </div>
          </div>
        </Resizable>
      </div>
    </div>
  );
} 