import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#1a1a1a] text-white text-center px-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl my-6">Oops! The page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate("/")}
        className="px-5 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
