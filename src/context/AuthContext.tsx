import { createContext } from "react";

interface User {
  isAuthenticated: boolean;
  role?: string;
}
interface AuthContextType {
  user: User;
  login: (token: string, role: string) => void;
  logout: () => void;
  hasRole: (requiredRole: string) => boolean;
  isAuthenticated: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default AuthContext;
