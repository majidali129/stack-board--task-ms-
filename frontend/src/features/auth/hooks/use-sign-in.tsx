import { signUpUser } from "@/services/user.service";
import type { AuthApiError } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useSignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signUp, isPending: signUpLoading } = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      signUpUser(data.email, data.password),
    onSuccess: (data) => {
      toast.success("User registered 🚀");
      queryClient.setQueryData(["user"], data.user);
      navigate("/");
    },
    onError: (error: AuthApiError) => {
      toast.error(error.message);
    },
  });

  return { signUp, signUpLoading };
};
