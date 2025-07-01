import { Loader } from "lucide-react";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-200/80">
      <Loader className="animate-spin size-10" />
    </div>
  );
};
