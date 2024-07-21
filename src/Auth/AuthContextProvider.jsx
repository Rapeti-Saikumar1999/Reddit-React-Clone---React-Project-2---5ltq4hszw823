import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  let isUserLoggiedIn = sessionStorage.getItem("token") ? true : false;
  let [isLoggedIn, setIsLoggedIn] = useState(isUserLoggiedIn);

  const [searchValue, setSearchValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [SignUpModalOpen, setSignUpModalOpen] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        searchValue,
        setSearchValue,
        modalOpen,
        setModalOpen,
        SignUpModalOpen,
        setSignUpModalOpen,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
