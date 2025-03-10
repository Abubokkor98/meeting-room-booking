import React from "react";
import Loader from "./_components/LoadingSpinner/Loader";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader />
    </div>
  );
}
