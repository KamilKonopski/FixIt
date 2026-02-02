import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../store/store";

const RootRedirect = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  if (!token) return <Navigate to="/login" replace />;

  if (user?.role === "Admin") return <Navigate to="/admin/dashboard" replace />;
  if (user?.role === "Technician")
    return <Navigate to="/tech/dashboard" replace />;

  return <Navigate to="/dashboard" replace />;
};

export default RootRedirect;
