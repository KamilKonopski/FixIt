import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../common/components/Loader/Loader";

import { roleRedirect } from "./roleRedirect";

import type { RootState } from "../store/store";

const RootRedirect = () => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  if (!token) return <Navigate to="/login" replace />;

  if (!user) {
    return <Loader />;
  }

  return <Navigate to={roleRedirect[user.role]} replace />;
};

export default RootRedirect;
