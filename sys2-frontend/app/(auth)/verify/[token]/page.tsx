'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { verifyEmail } from '@/lib/api/auth'; // Adjust the import path as necessary

function VerifyEmailContent() {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('Verifying your email...');

  const token = params?.token as string | undefined;

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Verification token missing.');
      return;
    }

    const performVerification = async () => {
      setStatus('loading');
      try {
        const response = await verifyEmail(token);
        setStatus('success');
        setMessage(response.message + ' Redirecting...');

        // Redirect after a short delay
        // TODO: Determine the correct redirect path based on user status/role or backend response
        setTimeout(() => {
          router.push('/login'); // Example redirect to login
        }, 3000); // 3-second delay

      } catch (error: any) {
        setStatus('error');
        setMessage(error.message || 'An unexpected error occurred during verification.');
      }
    };

    performVerification();
  }, [token, router]);

  // Basic styling
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    textAlign: 'center',
    padding: '20px'
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'green';
      case 'error': return 'red';
      default: return 'inherit';
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Email Verification</h1>
      <p style={{ color: getStatusColor() }}>{message}</p>
      {status === 'loading' && <p>Please wait...</p>}
    </div>
  );
}

// Wrap the client component in Suspense for Next.js App Router
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
