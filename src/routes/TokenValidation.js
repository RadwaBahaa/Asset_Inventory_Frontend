import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateToken } from "../store/Slices/login";

const TokenValidation = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      dispatch(validateToken(token))
        .unwrap()
        .then(() => {
          console.log("Token is valid");
        })
        .catch(() => {
          navigate("/login");
          console.log("Token is invalid");
        });
    } else {
      navigate("/login");
      console.log("No token found");
    }
  }, [dispatch, navigate]);

  return children;
};

export default TokenValidation;
