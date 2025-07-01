import { signInPath } from "@/paths";
import { useNavigate } from "react-router";
import { Spinner } from "./spinner";
import { useEffect, type ReactNode } from "react";
import { useUser } from "@/features/auth/hooks/use-user";

type ProtectedRouteProps = {
  children: ReactNode;
};
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  const { user, loadingUser, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !loadingUser) {
      navigate(signInPath());
    }
  }, [loadingUser, navigate, isAuthenticated]);

  if (loadingUser) return <Spinner />;

  if (user) return children;
};
