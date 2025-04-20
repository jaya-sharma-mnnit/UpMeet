import React, {useState} from "react";

type CallLayoutType='grid'|'speaker-left' |'speaker-right';
import { LayoutList } from 'lucide-react';

const LayoutDropdown = ({ onSelect }: { onSelect: (option: CallLayoutType) => void }) => {
    const [open, setOpen] = useState(false);
    const options: CallLayoutType[] = ['grid', 'speaker-left', 'speaker-right'];
  
    const handleClick = (opt: CallLayoutType) => {
      onSelect(opt);
      setOpen(false);
    };
   
    return (
      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="bg-dark-2 px-2 py-2 rounded-md hover:bg-gray-700 transition"
        >
          <LayoutList width={20} className="text-white"/>
        </button>
  
        {open && (
          <div className="absolute bottom-12 left-0 bg-dark-1 text-white rounded-md shadow-lg py-2 w-32 z-50 border border-gray-700">
            {options.map((opt) => (
              <div
                key={opt}
                className="px-4 py-2 hover:bg-dark-3 cursor-pointer"
                onClick={() => handleClick(opt)}
              >
                {opt} 
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default LayoutDropdown