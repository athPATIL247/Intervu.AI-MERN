import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="m-auto w-[78%] px-6 lg:px-20 py-12 bg-gradient-to-b from-[#151530] to-[#08090d] text-white rounded-3xl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-2xl sm:text-4xl lg:text-3xl font-bold leading-tight text-white mb-6">
            Get Interview-Ready with AI - <br />
            Powered Practice & Feedback
          </h1>
          <p className="text-[#cfd3f6] text-lg mb-8">
            Practice on real interview questions & get instant feedback
          </p>
          <button onClick={() => navigate('/interview')} className="bg-[#cfc1ff] text-black font-semibold py-3 px-6 rounded-full hover:bg-[#dfd4ff] transition">
            Start an Interview
          </button>
        </div>

        {/* Robot + badges */}
        <div className="mt-10 lg:mt-0 relative">
          <img src="/robot.png" alt="" width={400} height={400} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
