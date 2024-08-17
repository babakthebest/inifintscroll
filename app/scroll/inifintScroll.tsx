import React, { ReactNode, useCallback, useRef } from "react";

export default function InifintScroll({ children }: { children: ReactNode }) {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastDataCallbackRef = useCallback((node: Element | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log(entries[0]);
      }
    });
    if (node) observer.current.observe(node);
  }, []);
  return <>{children}</>;
}
