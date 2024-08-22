import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateToken } from "../store/Slices/login";
import FullPageLoader from "../Components/FullPageLoader/FullPageLoader";

const TokenValidation = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false); // Start with loading true

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setLoading(true);
      dispatch(validateToken(token))
        .unwrap()
        .then(() => {
          setLoading(false); // Set loading to false after successful validation
          navigate("/");
        })
        .catch((error) => {
          console.error("API error:", error);
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          setLoading(false); // Set loading to false after redirection
          navigate("/login");
        });
    } else {
      setLoading(false); // Set loading to false if no token is found
      navigate("/login");
    }
  }, [dispatch, navigate]);

  // Show loading spinner if loading is true
  return loading ? <FullPageLoader /> : children;
};

export default TokenValidation;
