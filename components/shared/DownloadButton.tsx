"use client";

import React from "react";

interface DownloadButtonProps {
  url: string;
  title: string;
}

export const DownloadButton = ({ url, title }: DownloadButtonProps) => {
  const handleDownload = async () => {
    if (!url) return;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobURL = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = blobURL;
      a.download = `${title || "transformed-image"}.jpg`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      a.remove();
      URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      className="download-btn group flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-lg cursor-pointer"
    >
      Download
    </button>
  );
};