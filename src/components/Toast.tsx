"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer = () => {
  const { toasts } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success" || !toast.type;
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
              isSuccess
                ? "bg-stone-900/95 text-stone-100 border-stone-800 shadow-stone-950/40"
                : isError
                ? "bg-rose-950/95 text-rose-100 border-rose-800 shadow-rose-950/40"
                : "bg-zinc-900/95 text-zinc-100 border-zinc-800 shadow-zinc-950/40"
            }`}
          >
            <div className="flex items-center gap-3">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
              <span className="text-sm font-medium tracking-wide">{toast.message}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
