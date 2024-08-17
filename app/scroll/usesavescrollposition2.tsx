import { useEffect } from "react";

export default function useSaveScrollPosition2(
  scrollContainerRef: React.RefObject<HTMLDivElement>,
  setScrollPosition: (position: number) => void,
  initialScrollPosition: number // Add this to set the scroll position on mount
) {
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    // Scroll to the saved position when the component mounts
    if (scrollContainer) {
      scrollContainer.scrollTop = initialScrollPosition;
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
  }, [scrollContainerRef, setScrollPosition, initialScrollPosition]);
}
