import dayjs from "dayjs"
import { useNavigate } from "react-router-dom";

export interface InterviewCardProps {
  coverImage: string,
  createdAt?: string,
  finalized: boolean,
  level: string,
  role: string;
  techstack: string[];
  type: string;
  _id?: string;
  questions?: string[];
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function capitalizeSentence(sentence: string) {
  return sentence
    .split(" ")
    .map(word => capitalize(word))
    .join(" ");
}

const InterviewCard = (props: InterviewCardProps) => {
  const navigate = useNavigate();
  const {coverImage, createdAt, finalized, level, role, techstack, type, _id} = props.details!;

  const handleViewInterviewClick = (_id: string) => {
    navigate(`/interview/${_id}`);
  }

  return (
    <div className="relative bg-gradient-to-b from-[#1b1c20] to-[#08090d] text-white rounded-2xl p-6 w-full max-w-sm border-2 border-[#4c4d4f] shadow-lg">
      {/* Tag */}
      <div className="absolute top-0 right-0 bg-[#4f557e] text-white text-sm px-4 py-2.5 rounded-bl-xl rounded-tr-xl tracking-wide">
        {capitalize(type)}
      </div>

      {/* Company Logo */}
      <img
        src={coverImage}
        alt="Pinterest Logo"
        className="w-16 h-16 rounded-full mb-4"
      />

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2 leading-tight">
        {capitalizeSentence(role) } Interview
      </h2>

      {/* Date & Score */}
      <div className="flex items-center text-md text-gray-300 mb-4 space-x-4">
        <div className="flex items-center">
          <span className="mr-1">📅</span>
          <span>{dayjs(createdAt || Date.now()).format('MMM D, YYYY')}</span>
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
        <button onClick={() => handleViewInterviewClick(_id)} className="bg-[#cfc1ff] text-black font-semibold px-4 py-2 rounded-full text-sm hover:bg-[#dfd4ff] transition cursor-pointer">
          View Interview
        </button>
      </div>
    </div>
  );
};

export default InterviewCard;
