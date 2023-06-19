import React from "react";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="bg-red-500 text-white rounded-md p-4">
      <h2 className="text-lg font-bold mb-2">Error</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;
