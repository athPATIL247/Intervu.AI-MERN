import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { verifyUser } from "./api/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleCheck = async () => {
    try {
      const isAuthenticated = await verifyUser();
      
    } catch (error) {
      toast.warning("You must sign in to access the portal");
      navigate("/sign-in");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCheck();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
