import React from 'react';

interface ErrorMessageProps {
  message: string | undefined | null; 
  
  className?: string; 
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  if (!message) {
    return null;
  }
  return (
    <p className={`error-message ${className || ''}`} role="alert">
      {message}
    </p>
  );
};

export default ErrorMessage;
