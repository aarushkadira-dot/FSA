import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// How long to wait for a #hash target on a page that loads on demand.
const HASH_TIMEOUT_MS = 3000;

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Jump, don't animate: html has scroll-behavior: smooth for in-page anchors.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (!hash) return;

    // Links like /find-school#classrooms land on that section once it has rendered.
    const id = decodeURIComponent(hash.slice(1));
    const started = performance.now();
    let frame = 0;
    const tryScroll = () => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
      else if (performance.now() - started < HASH_TIMEOUT_MS) frame = requestAnimationFrame(tryScroll);
    };
    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
