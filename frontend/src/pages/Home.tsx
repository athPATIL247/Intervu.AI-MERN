import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { useUser } from "../context/UserContext";
import InterviewCard, { type InterviewCardProps } from "../components/InterviewCard";
import { fetchLatestInterviews } from "../api/api";

const Home = () => {
    const {user} = useUser();
    const myInterviews = user?.interviews;
    const [latestInterviews, setLatestInterviews] = useState<InterviewCardProps[]>();

    const handleLoadLatestInterviews = async () => {
        const res = await fetchLatestInterviews();
        setLatestInterviews(res.data?.latestInterviews);
    } 

    useEffect(()=> {
        handleLoadLatestInterviews();
    })
    
  return (
    <>
        <Hero />
        <section className="mt-20 mx-auto w-[78%]">
            <div>
                <h1 className="font-bold text-3xl my-6">Your Interviews</h1>
                {
                    myInterviews!==undefined &&  myInterviews?.length>0 
                    ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {myInterviews?.map((interview,index) => (<InterviewCard key={index} details={interview}/>))}
                    </div>
                    :
                    <p className="text-[#cdd5e3] text-xl">You haven't taken any interviews</p>
                }
            </div>
        </section>
        <section className="mt-20 mx-auto w-[78%] mb-10">
            <div>
                <h1 className="font-bold text-3xl my-6">Take an Interview</h1>
                {
                    latestInterviews!==undefined &&  latestInterviews?.length>0 
                    ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {latestInterviews?.map((interview,index) => (<InterviewCard key={index} details={interview}/>))}
                    </div>
                    :
                    <p className="text-[#cdd5e3] text-xl">You haven't taken any interviews</p>
                }
            </div>
        </section>
    </>
  );
};

export default Home;
