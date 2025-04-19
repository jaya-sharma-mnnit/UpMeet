import Image from "next/image";
import React, { ReactNode } from "react";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  buttonIcon?: string;
  image?: string;
}
const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  handleClick,
  children,
  buttonText,
  image,
  buttonIcon,
}: MeetingModalProps) => {
    if (!isOpen) return null;
  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55">
       
      <div
        className={`relative  flex flex-col gap-6 border-none bg-black rounded-2xl p-6 w-full max-w-[520px]  ${className} text-white`}
      >
        <div className="flex flex-col gap-6">
        <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>

          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <h1
            className={`text-center text-3xl font-bold leading-[42px] ${className}`}
          >
            {title}
          </h1>
        </div>

        <button className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-sm"
        onClick={handleClick}>
            {buttonIcon&&(<Image src={buttonIcon} alt='button icon' width={13} height={13}/>)}
            {buttonText||'Schedule Meeting'}
        </button>
      </div>
    </div>
  );
};

export default MeetingModal;
