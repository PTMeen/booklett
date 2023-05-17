"use client";

import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import Heading from "../../Heading";

interface Props {
  imageSrc: string;
  onChange: (value: string) => void;
}

function PhotoStep({ imageSrc, onChange }: Props) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div className="flex flex-col gap-6">
      <Heading
        title="Add a photo your your place"
        subtitle="Show guest what your place look like!"
      />
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          maxFiles: 1,
          folder: "/booklett/listing",
        }}
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open?.()}
              className="relative flex flex-col items-center justify-center gap-4 p-20 overflow-hidden transition border-2 border-dashed rounded-lg cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-600"
            >
              <TbPhotoPlus size={50} />
              <div className="text-lg font-semibold">Click to upload</div>
              {imageSrc && (
                <div className="absolute inset-0 w-full h-full ">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    src={imageSrc}
                    alt="House"
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
export default PhotoStep;
