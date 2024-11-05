'use client';

import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { CodeBlock } from "@/components/CodeBlock";
import { DynamicComponent } from "@/components/DynamicComponent";

interface FormState {
  desktopImage: string | null;
  mobileImage: string | null;
  businessLogic: string;
}

interface GeneratedCode {
  component: string;
  tests: string;
}

export default function Home() {
  const [formState, setFormState] = useState<FormState>({
    desktopImage: null,
    mobileImage: null,
    businessLogic: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      
      if (!response.ok) throw new Error('Failed to generate component');
      
      const data = await response.json();
      setGeneratedCode(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <main className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Component Builder AI</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Design Screenshots</h2>
            <ImageUpload 
              label="Desktop Design" 
              onImageSelect={(image) => setFormState(prev => ({ ...prev, desktopImage: image }))}
              value={formState.desktopImage}
            />
            <ImageUpload 
              label="Mobile Design" 
              onImageSelect={(image) => setFormState(prev => ({ ...prev, mobileImage: image }))}
              value={formState.mobileImage}
            />
          </div>

          {/* Code Input Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Business Logic</h2>
            <textarea 
              className="w-full h-64 p-4 rounded-lg border bg-white dark:bg-gray-800 font-mono text-sm"
              placeholder="Paste your existing component code here..."
              value={formState.businessLogic}
              onChange={(e) => setFormState(prev => ({ ...prev, businessLogic: e.target.value }))}
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <button 
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isLoading || !formState.desktopImage || !formState.mobileImage}
        >
          {isLoading ? 'Generating...' : 'Generate Component'}
        </button>

        {/* Results Section */}
        {generatedCode && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Source Code Preview */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Generated Component</h2>
                <CodeBlock code={generatedCode.component} language="tsx" />
              </div>

              {/* Live Preview */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Live Preview</h2>
                <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border min-h-[200px]">
                  <DynamicComponent code={generatedCode.component} />
                </div>
              </div>
            </div>

            {/* Unit Tests */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Unit Tests</h2>
              <CodeBlock code={generatedCode.tests} language="tsx" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
