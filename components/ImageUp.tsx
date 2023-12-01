import Image from "next/image";
import { UploadDropzone } from "@/src/utils/uploadthing";
import { useCallback, useState } from "react";

interface ImageUpProps {
  onChange: (pfp: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const ImageUp: React.FC<ImageUpProps> = ({
  onChange,
  label,
  value,
  disabled,
}) => {
  //   const [imageUrl, setImageUrl] = useState(value);

  const handleChange = useCallback(
    (pfp: string) => {
      onChange(pfp);
    },
    [onChange]
  );
  return (
    <div
      className="
          w-full p-2 text-red-600 text-center border-2 border-dotted rounded-md border-neutral-700"
    >
      <label
        htmlFor="course-image"
        className="block text-sm font-medium leading-6 text-red-900"
      >
        {label}
      </label>
      {value && (
        <div className="flex items-center justify-center">
          <button
            onClick={() => handleChange("")}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md text-slate-600"
          >
            {/* <Pencil className="w-5 h-5"/> */}
            <span>Change Image</span>
          </button>
        </div>
      )}
      {value ? (
        <div className="flex items-center justify-center">
          <Image src={value} alt="course image" width={100} height={100} />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res) {
                handleChange(res[0].url);
                // setProfileImage(profileImage);
              }
              console.log("Files", res);
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      )}
    </div>
  );
};
export default ImageUp;
