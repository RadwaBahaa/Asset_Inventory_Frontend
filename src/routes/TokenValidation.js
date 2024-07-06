import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateToken } from "../store/Slices/login";
import LoadingPage from "../Components/LoadingPage";

const TokenValidation = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      dispatch(validateToken(token))
        .unwrap()
        .then(() => {
          console.log("Token is valid");
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          navigate("/login");
          setLoading(false);
        });
    } else {
      navigate("/login");
      setLoading(false);
    }
  }, [dispatch, navigate]);

  return loading ? <LoadingPage /> : children;
};

export default TokenValidation;
