import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { interviewer, vapi } from "../api/vapi.sdk";
import type { AgentProps } from "../pages/InterviewPage";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";

type CallStatus = "INACTIVE" | "CONNECTING" | "ACTIVE" | "FINISHED";

interface SavedMessage {
  role: string;
  content: string;
}

const Agent = (props: AgentProps) => {
  const { user } = useUser();
  const { type, interviewId, currInterview } = props;
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>("INACTIVE");
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => setCallStatus("ACTIVE");
    const onCallEnd = () => setCallStatus("FINISHED");

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log("Error ", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", (newMessage) => {
      if (newMessage.type === "transcript") {
        setMessages((prev) => [
          ...prev,
          {
            role: newMessage.role || "assistant",
            content: newMessage.transcript,
          },
        ]);
      } else if (
        newMessage.type === "conversation-update" &&
        Array.isArray(newMessage.messages)
      ) {
        // Get the last message in the array
        const last = newMessage.messages[newMessage.messages.length - 1];
        if (last && last.message) {
          setMessages((prev) => [
            ...prev,
            {
              role: last.role === "bot" ? "assistant" : last.role,
              content: last.message,
            },
          ]);
        }
      }
    });
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      // vapi.stop();
      vapi.removeAllListeners();
    };
  }, []);

  const handleGenerateFeedback = async (messages: SavedMessage[]) => {
    const response = await fetch(`/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        interviewId: interviewId!,
        userId: user?._id!,
        transcript: messages,
      }),
    });

    const result = await response.json();
    if (result.success && result.feedbackId)
      navigate(`/interview/${interviewId}/feedback`);
    else {
      toast.error("Error saving feedback");
      navigate("/");
    }
  };

  useEffect(() => {
    if (callStatus === "FINISHED") {
      if (type === "generate") {
        navigate("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, type, user?._id]);

  const handleCall = async () => {
    setCallStatus("CONNECTING");

    if (type == "generate") {
      const workflowId = import.meta.env.VITE_PUBLIC_VAPI_WORKFLOW_ID;
      await vapi.start(undefined, undefined, undefined, workflowId, {
        variableValues: {
          name: user?.name,
          userid: user?._id,
        },
      });
    } else {
      let formattedQuestions = "";
      if (currInterview?.questions)
        formattedQuestions = currInterview.questions
          .map((q) => `- ${q}`)
          .join(`\n`);

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = async () => {
    setCallStatus("FINISHED");

    vapi.stop();
  };

  const lastMessage = messages[messages.length - 1]?.content;

  const renderButton = () => {
    if (callStatus === "INACTIVE" || callStatus === "FINISHED") {
      return (
        <button
          onClick={handleCall}
          className="bg-[#49de4e] px-10 py-2.5 font-bold rounded-4xl"
        >
          Call
        </button>
      );
    } else if (callStatus === "CONNECTING") {
      return (
        <button className="bg-[#49de4e] px-10 py-2.5 font-bold rounded-4xl">
          ...
        </button>
      );
    } else {
      return (
        <button
          onClick={handleDisconnect}
          className="bg-[#e03434] px-10 py-2.5 font-bold rounded-4xl"
        >
          End
        </button>
      );
    }
  };

  // console.log("user: ",user);

  return (
    <>
      <style>
        {`
                @keyframes scalePulse {
                    0%, 100% {
                    transform: scale(1);
                    }
                    50% {
                    transform: scale(1.15);
                    }
                }
                `}
      </style>

      <div className="mx-auto w-[77%] my-12 flex flex-col gap-10 items-center">
        <div className="flex flex-row gap-10 w-full h-[380px] justify-center">
          <div className="w-[50%] h-full bg-gradient-to-b from-[#151530] to-[#07090d] border-2 border-[#6c6584] rounded-2xl flex flex-col items-center justify-center gap-6 ">
            {isSpeaking ? (
              <div
                className="z-- w-[200px] h-[200px] flex items-center justify-center bg-[rgba(202,196,222,0.2)] rounded-full"
                style={{ animation: "scalePulse 1.5s infinite ease-in-out" }}
              >
                <div>
                  <img
                    src="/av-2.png"
                    alt=""
                    height={140}
                    width={140}
                    className="z-10"
                  />
                </div>
              </div>
            ) : (
              <div>
                <img
                  src="/av-2.png"
                  alt=""
                  height={140}
                  width={140}
                  className="z-10"
                />
              </div>
            )}

            <h1 className="text-2xl font-bold text-[#f0d3d9]">
              AI Interviewer
            </h1>
          </div>

          <div className="hidden sm:flex w-[50%] h-full bg-gradient-to-b from-[#151530] to-[#07090d] border border-gray-800 rounded-2xl flex-col items-center justify-center gap-6">
            <div>
              <img src="/user-avatar.png" alt="" height={140} width={140} />
            </div>
            <h1 className="text-2xl font-bold text-[#f0d3d9]">{user?.name}</h1>
          </div>
        </div>

        {messages.length > 0 && (
          <div className="m-auto w-full text-center text-xl bg-gradient-to-b from-[#151530] to-[#07090d] min-h-14 border border-gray-800 rounded-2xl py-2">
            {/* Hello Atharva, Let's prepare your interview. */}
            {lastMessage}
          </div>
        )}
        {renderButton()}
      </div>
    </>
  );
};

export default Agent;
