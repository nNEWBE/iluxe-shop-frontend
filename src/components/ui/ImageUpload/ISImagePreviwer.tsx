import React from "react";
import { X } from "lucide-react";

type TImangePreviewer = {
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreview: string[];
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
};

const ISImagePreviewer = ({
  setImageFiles,
  imagePreview,
  setImagePreview,
  className,
}: TImangePreviewer) => {
  const handleRemove = (index: number) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
    setImagePreview((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className={className}>
      {imagePreview.map((preview, index) => (
        <div
          key={index}
          className="relative size-20 sm:size-36 rounded-md overflow-hidden border-2 border-gray-300"
        >
          <img
            width={500}
            height={500}
            src={preview}
            alt={`Preview ${index + 1}`}
            className="object-cover w-full h-full"
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="bg-primary cursor-pointer hover:bg-secondary absolute top-1 right-1 w-6 h-6 p-1 rounded-full"
          >
            <X className="size-4 text-secondary hover:text-white" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ISImagePreviewer;
