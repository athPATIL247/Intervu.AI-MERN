import Hero from "../components/Hero";
import InterviewCard from "../components/InterviewCard";

const Home = () => {
  return (
    <>
        <Hero />
        <section className="mt-20 mx-auto w-[78%]">
            <div>
                <h1 className="font-bold text-3xl my-6">Your Interviews</h1>
                <p className="text-[#cdd5e3] text-xl">You haven't taken any interviews</p>
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InterviewCard/>
                    <InterviewCard/>
                </div> */}
            </div>
        </section>
        <section className="mt-20 mx-auto w-[78%] mb-10">
            <div>
                <h1 className="font-bold text-3xl my-6">Take an Interview</h1>
                {/* <p className="text-[#cdd5e3] text-xl">You haven't taken any interviews</p> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InterviewCard/>
                    <InterviewCard/>
                    <InterviewCard/>
                    <InterviewCard/>
                    <InterviewCard/>
                </div>
            </div>
        </section>
    </>
  );
};

export default Home;
