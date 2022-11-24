import { useRef } from "react";

export const useScrollChat = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const scrollToChatBottom = () => {
    if (window.innerWidth <= 375) {
      return;
    }
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return { chatRef, scrollToChatBottom };
};
