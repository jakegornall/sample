import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Component Builder AI API Documentation</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Generate Component Endpoint</h2>
        <p className="text-gray-600 mb-4">
          The <code className="bg-gray-100 px-2 py-1 rounded">/api/generate</code> endpoint 
          creates React components and corresponding unit tests from design screenshots and 
          business logic specifications.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-2">Endpoint Details</h3>
          <ul className="space-y-2">
            <li><strong>URL:</strong> <code className="bg-gray-100 px-2 py-1 rounded">/api/generate</code></li>
            <li><strong>Method:</strong> <code className="bg-gray-100 px-2 py-1 rounded">POST</code></li>
            <li><strong>Content-Type:</strong> <code className="bg-gray-100 px-2 py-1 rounded">multipart/form-data</code></li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Request Parameters</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border px-4 py-2 text-left">Parameter</th>
                  <th className="border px-4 py-2 text-left">Type</th>
                  <th className="border px-4 py-2 text-left">Required</th>
                  <th className="border px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2"><code>desktopImage</code></td>
                  <td className="border px-4 py-2">File</td>
                  <td className="border px-4 py-2">Yes</td>
                  <td className="border px-4 py-2">Screenshot of the desktop design (PNG, JPG)</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2"><code>mobileImage</code></td>
                  <td className="border px-4 py-2">File</td>
                  <td className="border px-4 py-2">Yes</td>
                  <td className="border px-4 py-2">Screenshot of the mobile design (PNG, JPG)</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2"><code>businessLogic</code></td>
                  <td className="border px-4 py-2">String</td>
                  <td className="border px-4 py-2">No</td>
                  <td className="border px-4 py-2">JavaScript/TypeScript code describing component behavior</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Example Usage</h3>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg mb-4">
            <pre className="overflow-x-auto">
              <code>{`const formData = new FormData();
formData.append('desktopImage', desktopImageFile);
formData.append('mobileImage', mobileImageFile);
formData.append('businessLogic', \`
  // Optional business logic
  const handleClick = () => {
    console.log('Button clicked');
  };
\`);

const response = await fetch('/api/generate', {
  method: 'POST',
  body: formData
});

const { component, tests } = await response.json();`}</code>
            </pre>
          </div>

          <h4 className="text-lg font-semibold mb-2">Using CLI</h4>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg">
            <pre className="overflow-x-auto">
              <code>{`# Install the CLI tool
npm install -g component-builder-cli

# Generate a component
component-builder generate \\
  --desktop-image ./desktop.png \\
  --mobile-image ./mobile.png \\
  --logic ./logic.ts`}</code>
            </pre>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Error Responses</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border px-4 py-2 text-left">Status Code</th>
                  <th className="border px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">400</td>
                  <td className="border px-4 py-2">Bad Request - Missing required files or invalid format</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">413</td>
                  <td className="border px-4 py-2">Payload Too Large - Image file size exceeds limit</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">415</td>
                  <td className="border px-4 py-2">Unsupported Media Type - Invalid file format</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">500</td>
                  <td className="border px-4 py-2">Internal Server Error - Processing failed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: 'API Documentation | Component Builder AI',
  description: 'Documentation for the Component Builder AI API endpoints',
}; 