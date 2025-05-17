import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/");
    }
  }, []);

  return <div>Logging in...</div>;
}

export default LoginRedirect;
