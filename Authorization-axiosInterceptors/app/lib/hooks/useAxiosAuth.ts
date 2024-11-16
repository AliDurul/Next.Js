"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "../axios";

const useAxiosAuth = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post("/auth/refresh", {
      refresh: session?.refreshToken,
    });

    console.log("refreshed");
    console.log(session?.accessToken);
    if (session) session.accessToken = res.data.Token.access;
    console.log('updated one');
    console.log(session?.accessToken);
  };

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${session?.accessToken}`;
          return axios(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [session]);

  const axiosAuth = axios;

  return { axiosAuth };
};

export default useAxiosAuth;
