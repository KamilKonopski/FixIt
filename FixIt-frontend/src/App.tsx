import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";

import Login from "./components/Authentication/Login/Login";
import MainLayout from "./components/Layout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./components/Authentication/Register/Register";
import RootRedirect from "./routes/RootRedirect";
import UserDashboard from "./components/User/UserDashboard/UserDashboard";
import UserTicketList from "./components/User/UserTickets/UserTicketList/UserTicketList";

import { useGetMeQuery } from "./store/auth/authApi";
import { logout, setCredentials } from "./store/slices/authSlice";
import type { RootState } from "./store/store";

import { theme } from "./common/theme/theme";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    data: userData,
    error,
    isLoading,
  } = useGetMeQuery(undefined, {
    skip: !token || !!user,
  });

  useEffect(() => {
    if (userData) {
      dispatch(setCredentials({ token: token!, ...userData }));
    }

    if (error) {
      dispatch(logout());
    }
  }, [userData, error, dispatch, token]);

  if (isLoading) {
    return <div>Ładowanie sesji...</div>;
  }

  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      forceColorScheme="dark"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              {/* DOSTĘPNE DLA WSZYSTKICH ZALOGOWANYCH (np. profil) */}
              <Route path="/settings" element={<div>Ustawienia</div>} />
              {/* TYLKO DLA USERA */}
              <Route element={<ProtectedRoute allowedRoles={["User"]} />}>
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/tickets" element={<UserTicketList />} />
              </Route>
              {/* TYLKO DLA TECHNIKA */}
              <Route element={<ProtectedRoute allowedRoles={["Technician"]} />}>
                <Route path="/tech/dashboard" element={<div>Tech Dash</div>} />
              </Route>
              {/* TYLKO DLA ADMINA */}
              <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
                <Route
                  path="/admin/dashboard"
                  element={<div>Admin Dash</div>}
                />
              </Route>
            </Route>
          </Route>
          <Route>
            <Route path="/" element={<RootRedirect />} />
            <Route path="*" element={<RootRedirect />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
