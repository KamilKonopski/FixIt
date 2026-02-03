import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { roleRedirect } from "./roleRedirect";

const RootRedirect = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  if (!token) return <Navigate to="/login" replace />;

  const path = roleRedirect[user?.role ?? "User"];
  return <Navigate to={path} replace />;
};

export default RootRedirect;
