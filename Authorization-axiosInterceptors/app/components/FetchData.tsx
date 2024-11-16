"use client";
import React, { useState } from "react";
import axios from "../lib/axios";
import useAxiosAuth from "../lib/hooks/useAxiosAuth";

const FetchData = () => {
  const [firms, setFirms] = useState([]);
  const { axiosAuth } = useAxiosAuth();

  const fetchFirm = async () => {
    const res = await axiosAuth.get("/firms");
    console.log(res);
  };

  return (
    <div className="flex flex-col gap-2">
      <button onClick={fetchFirm}>Get Firms</button>

      <div>{firms && JSON.stringify(firms)}</div>
    </div>
  );
};

export default FetchData;
