import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 loading-gradient rounded-full blur-xl opacity-50" />
        <Loader className="w-16 h-16 animate-spin text-primary relative" />
      </div>
    </div>
  );
}
