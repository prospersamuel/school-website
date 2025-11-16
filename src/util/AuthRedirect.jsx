import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import AuthLoader from "../components/AuthLoader";

  // Redirect if not authenticated
  export function AuthRedirect () {
    
    const navigate = useNavigate()
    const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <AuthLoader/>
    );
  }

  if (!user) {
    return null;
  }
}