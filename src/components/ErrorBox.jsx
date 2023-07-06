import React from "react";

function ErrorBox({ errorName, errorDescription }) {
  return (
    <div role="alert">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Error
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p className="text-lg mb-3">{errorName} </p>
        <p>{errorDescription}</p>
      </div>
    </div>
  );
}

export default ErrorBox;
