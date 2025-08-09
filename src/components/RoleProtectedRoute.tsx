import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

interface RoleProtectedRouteProps {
  requiredRole: string;
  children: React.ReactNode;
}

const RoleProtectedRoute = ({
  children,
  requiredRole,
}: RoleProtectedRouteProps) => {
  const { user, hasRole } = useAuth();
  if (!user.isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  if (!hasRole(requiredRole)) {
    return <Navigate to={"/unauthorized"} />;
  }
  return <>{children}</>;
};
export default RoleProtectedRoute;
