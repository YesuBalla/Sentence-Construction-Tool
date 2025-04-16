import { useNavigate } from 'react-router-dom';
import { MoreVertical} from "lucide-react";
import PencilIcon from '../../assets/PencilIcon.png'

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col flex-grow">

      {/* Navbar */}
      <header className="w-full px-15 py-3 shadow-md flex justify-between items-center">
        <div></div>
        <h2 className="text-[18px] font-medium text-center text-[#414343] leading-[28px] tracking-[-0.01em]">
            Sentence Construction
        </h2>
        <MoreVertical className="h-5 w-5 text-gray-700" />
      </header>

      {/* Content */}
      <main className="w-full flex-1 flex flex-col items-center justify-center px-4 text-center">
        <img 
            src={PencilIcon} 
            alt="Pencil Icon" 
            className="h-13 w-13 mb-6" 
        />
        <h2 className="font-inter text-[40px] font-semibold leading-[46px] tracking-normal text-center mb-2">
            Sentence Construction
        </h2>
        <p className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.01em] text-center text-gray-500 max-w-md mb-10">
            Select the correct words to complete the sentence by arranging the provided options in the right order.
        </p>

        <div className="grid grid-cols-3 gap-8 mb-10 divide-x-3 divide-[#DFE3E3]">
          <div className="px-4">
            <p className="font-medium text-[20px] leading-[28px] text-center text-gray-700 tracking-normal">Time Per Question</p>
            <p className="text-[18px] font-medium leading-[28px] tracking-[-0.01em] text-center text-gray-500 mt-1">30 sec</p>
          </div>
          <div className="px-4">
            <p className="font-medium text-[20px] leading-[28px] text-center text-gray-700 tracking-normal">Total Questions</p>
            <p className="text-[18px] font-medium leading-[28px] tracking-[-0.01em] text-center text-gray-500 mt-1">10</p>
          </div>
          <div className="px-4">
            <p className="font-medium text-[20px] leading-[28px] text-center text-gray-700 tracking-normal">Coins</p>
            <p className="text-[18px] font-medium leading-[28px] tracking-[-0.01em] text-center text-gray-500 mt-1">
                <span className="h-4 w-4 rounded-full bg-yellow-400 inline-block animate-spin-slow"></span> 0
            </p>
          </div>
        </div>

        <div className="flex gap-4">
        <button className="
        w-40
        bg-white 
    text-blue-600 
    border border-blue-600 
    px-6 py-2 
    rounded-lg 
    font-medium 
    hover:bg-blue-50 
    transition-colors duration-200"
        >
        Back
        </button>
        <button
          className="
          w-40
            bg-blue-600 
    text-white 
    px-6 py-2 
    rounded-lg 
    font-medium 
    hover:bg-blue-700 
    transition-colors duration-200
          "
          onClick={() => navigate('/sentense-construction')}
        >
          Start
        </button>
        
        </div>
      </main>
    </div>
  );
}
