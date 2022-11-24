import { useRef } from "react";

export const useScrollList = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollToListBottom = () => {
    if (window.innerWidth <= 375) {
      return;
    }
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return { listRef, scrollToListBottom };
};
