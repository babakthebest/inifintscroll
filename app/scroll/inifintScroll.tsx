import React, { ReactNode, useEffect, useRef, useState } from "react";
interface InifintScrollProps<T> {
  children: ReactNode;
  lastItemRef: React.RefObject<HTMLDivElement>;
  fn: () => Promise<void>;
  data: T[];
  loadingComponent?: ReactNode;
}
export default function InifintScroll<T>({
  children,
  lastItemRef,
  fn,
  data,
  loadingComponent,
}: InifintScrollProps<T>) {
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    if (data.length === 0) {
      setLoading(true);
      fn().finally(() => setLoading(false));
    }
  }, []);
  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    if (lastItemRef.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          fn().finally(() => setLoading(false));
        }
      });

      observer.current.observe(lastItemRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [lastItemRef, data]);

  return (
    <>
      {loading && <>{loadingComponent}</>}
      {children}
    </>
  );
}
