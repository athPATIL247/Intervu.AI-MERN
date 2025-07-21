import { useParams } from "react-router-dom";
import Agent from "../components/Agent";

export interface AgentProps {
  type: "generate" | "conduct";
  interviewId?: string;
}

const InterviewPage = () => {
  const interviewId = useParams().id;
  const type = interviewId!==undefined && interviewId.length>0 ? "conduct" : "generate";
  return (
    <>
      <div className="mx-auto w-[78%] flex flex-row gap-6 items-center">
        <div>
          <img src="/adobe.png" alt="react-logo" width={40} height={40} />
        </div>
        <h1 className="text-2xl font-semibold">
          {type === "generate"
            ? "Interview Geneation"
            : "Front end developer Interview"}
        </h1>
        <div className="flex flex-row items-center">
          <div className="bg-[#262539] p-2 rounded-full w-10 h-10 flex items-center justify-center z-10">
            <img
              src="/react.svg"
              alt="react-logo"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div className="bg-[#262539] p-2 rounded-full w-10 h-10 flex items-center justify-center -ml-2.5 z-0">
            <img
              src="/tailwind.svg"
              alt="tailwind-logo"
              className="w-6 h-6 object-contain"
            />
          </div>
        </div>
        <div className="px-4 py-2 text-[#cde0fe] bg-[#26282e] rounded-xl">
          Mixed
        </div>
      </div>

      <Agent type={type} interviewId={interviewId}/>
    </>
  );
};

export default InterviewPage;
