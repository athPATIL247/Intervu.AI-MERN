interface InterviewCardProps {
  id?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

const InterviewCard = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#1b1c20] to-[#08090d] text-white rounded-2xl p-6 w-full max-w-sm border-2 border-[#4c4d4f] shadow-lg">
      {/* Tag */}
      <div className="absolute top-0 right-0 bg-[#4f557e] text-white text-sm px-4 py-2.5 rounded-bl-xl rounded-tr-xl tracking-wide">
        Mixed
      </div>

      {/* Company Logo */}
      <img
        src="/adobe.png"
        alt="Pinterest Logo"
        className="w-16 h-16 rounded-full mb-4"
      />

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2 leading-tight">
        Frontend Interview
      </h2>

      {/* Date & Score */}
      <div className="flex items-center text-md text-gray-300 mb-4 space-x-4">
        <div className="flex items-center">
          <span className="mr-1">📅</span>
          <span>Jul 17, 2025</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1">⭐</span>
          <span>---/100</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-md mb-15">
        You haven't taken the interview yet. Take it now to improve your skills.
      </p>

      {/* Footer icons + button */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center">
            {/* Replace with an actual icon if needed */}
            <span className="text-sm">N</span>
          </div>
        </div>
        <button className="bg-[#cfc1ff] text-black font-semibold px-4 py-2 rounded-full text-sm hover:bg-[#dfd4ff] transition">
          View Interview
        </button>
      </div>
    </div>
  );
};

export default InterviewCard;
