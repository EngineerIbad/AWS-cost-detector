"use client";

import { useEffect, useRef, useState } from "react";

const EVENT = "aecc:toast";

/** Show a short confirmation, e.g. "Copied." Safe to call from anywhere in the browser. */
export function showToast(message: string, tone: "success" | "error" = "success") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { message, tone } }));
}

/**
 * Renders toasts sent with showToast(). One at a time, auto-dismissed after a
 * few seconds, announced politely to screen readers, and never shifts layout.
 */
export default function ToastHost() {
  const [toast, setToast] = useState<{ message: string; tone: "success" | "error"; id: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onToast = (e: Event) => {
      const { message, tone } = (e as CustomEvent<{ message: string; tone: "success" | "error" }>).detail;
      setToast({ message, tone, id: Date.now() });
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(null), 3500);
    };
    window.addEventListener(EVENT, onToast);
    return () => {
      window.removeEventListener(EVENT, onToast);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="toast-region" role="status" aria-live="polite" aria-atomic="true">
      {toast && (
        <div key={toast.id} className={`toast toast-${toast.tone}`}>
          <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
            {toast.tone === "success" ? (
              <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M8 4.5v4.2M8 10.8v.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
          <span>{toast.message}</span>
          <button type="button" className="toast-close" onClick={() => setToast(null)} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}
    </div>
  );
}
