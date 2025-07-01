import { signInUser } from "@/services/user.service";
import type { AuthApiError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate: signIn, isPending: signInLoading } = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      signInUser(data.email, data.password),
    onSuccess: () => {
      toast.success("Logged in successfully 🚀");
      navigate("/");
    },
    onError: (error: AuthApiError) => {
      toast.error(error.message);
    },
  });

  return { signIn, signInLoading };
};
