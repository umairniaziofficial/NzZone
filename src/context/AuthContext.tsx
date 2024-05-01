import { getCurrentAccount } from "@/lib/appwriter/api";
import { IContextType, IUser } from "@/types";
import { createContext, ReactNode } from "react";

export const INITIAL_USER = {
  id: " ",
  name: " ",
  username: " ",
  email: " ",
  imageUrl: " ",
  bio: " ",
};

export const INTIAIL_STATE = {
  user: INITIAL_USER,
  isPending: false,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INTIAIL_STATE);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isPending, setisPending] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentAccount();
      if (currentAccount) {
        setUser({
          Id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    setUser,
    isPending,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  };

  return <AuthProvider value={value}></AuthProvider>;
};
