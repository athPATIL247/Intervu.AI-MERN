import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vapi } from "../api/vapi.sdk";
import type { AgentProps } from "../pages/InterviewPage";

const style = `
  @keyframes scalePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

type CallStatus = 'INACTIVE' | 'CONNECTING' | 'ACTIVE' | 'FINISHED';


interface SavedMessage {
    role: 'user' | 'system' | 'assistant';
    content: string;
}

const Agent = (props: AgentProps) => {
    const {type} =  props;
    const navigate = useNavigate();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>('INACTIVE');
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    useEffect(() => {
        const onCallStart = () => setCallStatus("ACTIVE");
        const onCallEnd = () => setCallStatus("FINISHED");

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log('Error ',error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', (newMessage) => {
            if(newMessage.type==='transcipt'){
                setMessages((prev) => [...prev, newMessage]);
            }
        });
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('error', onError);

        return () => {
            vapi.stop();
            vapi.removeAllListeners();
        }
    }, []);

    useEffect(() => {
        if(callStatus === "FINISHED"){
            if(type === 'generate') {
                navigate('/');
            }
            else {
                // handleGenerateFeedback(messages);
            }
        }
    }, [messages, callStatus, type]);

    // const handleCall = async () => {
    //     setCallStatus("CONNECTING");

    //     if(type=='generate'){
    //         const workflowId = import.meta.env.VITE_PUBLIC_VAPI_WORKFLOW_ID;
    //         await vapi.start(
    //             undefined,
    //             undefined,
    //             undefined,
    //             workflowId,
    //             {
    //                 variableValues: {
    //                     username: 
    //                 }
    //             }
    //         )
    //     }
    // }

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
                        {/* <div className="z-- w-[200px] h-[200px] flex items-center justify-center bg-[rgba(202,196,222,0.2)] rounded-full" style={{animation: 'scalePulse 1.5s infinite ease-in-out'}}> */}
                            <div><img src="/av-2.png" alt="" height={140} width={140} className="z-10"/></div>
                        {/* </div> */}
                        <h1 className="text-2xl font-bold text-[#f0d3d9]">AI Interviewer</h1>
                    </div>

                    <div className="w-[50%] h-full bg-gradient-to-b from-[#151530] to-[#07090d] border border-gray-800 rounded-2xl flex flex-col items-center justify-center gap-6">
                        <div><img src="/user-avatar.png" alt="" height={140} width={140}/></div>
                        <h1 className="text-2xl font-bold text-[#f0d3d9]">Atharva</h1>
                    </div>
                </div>
                <div className="m-auto w-full text-center text-xl bg-gradient-to-b from-[#151530] to-[#07090d] min-h-14 border border-gray-800 rounded-2xl py-2">Hello Atharva, Let's prepare your interview.</div>
                <button className="bg-[#49de4e] px-10 py-2.5 font-bold rounded-4xl">Call</button>
            </div>
        </>
        
    );
}

export default Agent