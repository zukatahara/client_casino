import { createContext, useState } from "react";
import { getAccessTokenFromLS, getProfileFromLS } from "@/utils/auth";
import { User } from "@/types/user.type";

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  reset: () => void;
  auth: string | null;
  setAuth: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
  auth: getAccessTokenFromLS(),
  setAuth: () => null,
  isLoading: false,
  setIsLoading: () => null,
  isOpenModal: false,
  setIsOpenModal: () => null,
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  );
  const [profile, setProfile] = useState<User | null>(
    initialAppContext.profile
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [auth, setAuth] = useState(initialAppContext.auth);

  const reset = () => {
    setIsAuthenticated(false);
    setProfile(null);
    setAuth(null);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        reset,
        auth,
        setAuth,
        isLoading,
        setIsLoading,
        isOpenModal,
        setIsOpenModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
