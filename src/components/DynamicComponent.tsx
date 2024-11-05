'use client';

import { useEffect, useState } from 'react';

interface DynamicComponentProps {
  code: string;
}

export function DynamicComponent({ code }: DynamicComponentProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    async function transformAndCreateComponent() {
      try {
        // Transform JSX to JS using the API route
        const response = await fetch('/api/transform', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });
        
        const { code: transformedCode } = await response.json();
        
        const func = new Function(
          'React',
          'createElement',
          `return ${transformedCode}`
        );

        const ComponentFunc = func(
          require('react'),
          require('react').createElement
        );

        setComponent(() => ComponentFunc);
      } catch (error) {
        console.error('Failed to render component:', error);
      }
    }

    transformAndCreateComponent();
  }, [code]);

  if (!Component) return null;
  
  return <Component />;
} 