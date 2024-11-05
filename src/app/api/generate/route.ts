import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Mock response
  const mockResponse = {
    component: `
function ExampleComponent() {
  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h2 className="text-xl font-bold">Hello World</h2>
      <p className="mt-2">This is a generated component</p>
    </div>
  );
}`,
    tests: `
import { render, screen } from '@testing-library/react';
import { ExampleComponent } from './ExampleComponent';

describe('ExampleComponent', () => {
  it('renders the heading', () => {
    render(<ExampleComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});`
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return NextResponse.json(mockResponse);
} 