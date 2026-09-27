import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Jump, don't animate: html has scroll-behavior: smooth for in-page anchors.
    if (hash) {
      // Links like /find-school#classrooms land on that section once it has rendered.
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
        else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
