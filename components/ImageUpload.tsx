import Image from "next/image";

import { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";

import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

// import { useUploadThing } from "../src/utils/uploadthing";

interface ImageUploadProps {
  onChange: (pfp: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  label,
  value,
  disabled,
}) => {
  const [pfp, setBase64] = useState(value);
  const [files, setFiles] = useState<File[]>([]);
  // const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
  //   setFiles(acceptedFiles);
  // }, []);

  //   const [images, setImages] = useState<
  //     {
  //       fileUrl: string;
  //       fileKey: string;
  //     }[]
  //   >([]);

  //   const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
  //     onClientUploadComplete: () => {
  //       //   if (res) {
  //       //     setImages(res);
  //       //     const json = JSON.stringify(res);
  //       //     console.log(`file res is ${json}`);
  //       //     alert("uploaded successfully!");
  //       //   }
  //     },
  //     onUploadError: () => {
  //       alert("error occurred while uploading");
  //     },
  //     onUploadBegin: () => {
  //       alert("upload has begun");
  //     },
  //   });

  //   const fileTypes = permittedFileInfo?.config
  //     ? Object.keys(permittedFileInfo?.config)
  //     : [];

  //   const { getRootProps, getInputProps } = useDropzone({
  //     onDrop,
  //     accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  //   });

  //   const [image, setImage] = useState<
  //     {
  //       fileUrl: string;
  //       fileKey: string;
  //     }[]
  //   >([]);

  const handleChange = useCallback(
    (pfp: string) => {
      onChange(pfp);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />

      {pfp ? (
        <div className="flex items-center justify-center">
          <Image
            src={pfp}
            width="100"
            height="100"
            alt="Uploaded image"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <p className="text-red-600">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
