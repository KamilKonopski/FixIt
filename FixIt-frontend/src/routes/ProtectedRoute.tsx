import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../common/components/Loader/Loader";

import type { RootState } from "../store/store";

interface Props {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Loader />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
