// app/not-found.tsx
import Link from 'next/link'
import React from 'react';

export default function NotFound() {
  console.error('--- Rendering custom app/not-found.tsx ---'); // Log when this renders
  return (
    <div>
      <h2>Not Found (Custom)</h2>
      <p>Could not find the requested resource.</p>
      <p>pathname: {typeof window !== 'undefined' ? window.location.pathname : 'unknown (server)'}</p> {/* Attempt to show path */}
      <Link href="/">Return Home</Link>
    </div>
  )
}