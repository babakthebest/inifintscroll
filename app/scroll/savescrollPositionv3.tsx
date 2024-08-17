import { useEffect } from "react";
import { create, StoreApi } from "zustand";

export interface ScrollStore {
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
}
const storeMap = new Map<
  string,
  ReturnType<typeof create<StoreApi<ScrollStore>>>
>();

export function getStore(pageName: string) {
  if (!storeMap.has(pageName)) {
    const useStore = create<ScrollStore>((set) => ({
      scrollPosition: 0,
      setScrollPosition: (position: number) =>
        set({ scrollPosition: position }),
    }));
    storeMap.set(pageName, useStore);
  }
  return storeMap.get(pageName)!; // Return the zustand hook
}
export default function useSaveScrollPositionV3(
  pageName: string,
  scrollContainerRef: React.RefObject<HTMLDivElement>
) {
  const useStore = getStore(pageName); // Get the store for the specific page
  console.log("useStore", useStore);
  const { scrollPosition, setScrollPosition } = useStore();

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    // Scroll to the saved position when the component mounts
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollPosition;
    }

    const handleScroll = () => {
      if (scrollContainer) {
        setScrollPosition(scrollContainer.scrollTop);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollContainerRef, scrollPosition, setScrollPosition]);
}
