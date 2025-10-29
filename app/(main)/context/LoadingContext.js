"use client"
import { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoadingDashboard, setisLoadingDashboard] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoadingDashboard, setisLoadingDashboard }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
