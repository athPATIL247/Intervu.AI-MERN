import "@fontsource/plus-jakarta-sans/600.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { signin, signup, verifyUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
}

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleCheck = async () => {
    const isAuthenticated = await verifyUser();
    if (isAuthenticated.data.success) {
      toast.warning("You are already logged in");
      navigate("/");
    }
  };

  useEffect(() => {
    handleCheck();
  }, []); 

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const cleanedData = {
      ...formData,
      email: formData.email.trim(),
      name: formData.name.trim(),
      password: formData.password.trim(),
    };

    try {
      const res = await (isSignUp ? signup(cleanedData) : signin(cleanedData));
      if (res.data.success) {
        // console.log(res.data);
        setUser(res.data.user);
        toast.success(res.data.message);
        isSignUp ? setIsSignUp(false) : navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message || error.message}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="bg-gradient-to-b from-[#18191d] to-[#090a0e] border border-[#4c4d4f] rounded-2xl p-10 w-full max-w-lg shadow-md">
        <div className="flex items-center justify-center mb-6">
          {/* <img src="/logo.svg" alt="LOGO" className="h-6 mr-2" /> */}
          <h1 className="text-[#dfe0fd] text-3xl font-semibold tracking-wider">
            Intervu.AI
          </h1>
        </div>

        <h2
          className="text-white text-[20px]  font-bold mb-6"
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        >
          Practice job interviews with AI
        </h2>

        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col space-y-4 text-[#b4cfec]"
        >
          {isSignUp && (
            <div>
              <label htmlFor="name" className="text-[17px] px-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Your Name"
                className="mt-1 w-full px-4 py-3 bg-[#1c1d22] text-white rounded-full outline-none"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="text-[17px] px-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Your Email"
              className="mt-1 w-full px-4 py-3 bg-[#1c1d22] text-white rounded-full outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-[17px] px-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              autoComplete="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Your Password"
              className="mt-1 w-full px-4 py-3 bg-[#1c1d22] text-white rounded-full outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 font-semibold py-2 rounded-full transition cursor-pointer ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#cfc1ff] text-black hover:bg-[#dcd1ff]"
            }`}
          >
            {loading
              ? "Processing..."
              : isSignUp
              ? "Create an Account"
              : "Sign In"}
          </button>
        </form>

        <p className="text-center text-[15px] text-[#d9dff9] mt-6 tracking-wide">
          {isSignUp ? `Have an account already? ` : `No account yet? `}
          <span
            className="font-semibold cursor-pointer"
            onClick={() => setIsSignUp((prev) => !prev)}
          >
            {!isSignUp ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </section>
  );
};

export default RegistrationPage;
