import React from "react";
import { PulseLoader } from "react-spinners";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <PulseLoader color="#fff" />
    </div>
  );
}

export default LoadingScreen;
