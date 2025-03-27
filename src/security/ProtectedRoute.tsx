import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (user) {
    return <>{children}</>;
  }

  return <Navigate state={{ from: location.pathname }} to="/login" replace />;
};

export default ProtectedRoute;
