// src/components/ui/loader.tsx

"use client";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-white border-opacity-75"></div>
    </div>
  );
};

export default Loader;
