import React from 'react';

const VerifyEmailPage = () => {
  return (
    <div style={{ /* Basic styling for centering */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        padding: '20px'
    }}>
      <h1>Check Your Email</h1>
      <p>
        We&apos;ve sent a verification link to your email address.
      </p>
      <p>
        Please check your inbox (and spam folder, just in case!) and click the link to activate your account.
      </p>
      <p>
        If you haven&apos;t received the email within a few minutes, please contact support.
      </p>
    </div>
  );
};

export default VerifyEmailPage;
