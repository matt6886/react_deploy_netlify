import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleReize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleReize();

    window.addEventListener("resize", handleReize);

    return () => window.removeEventListener("resize", handleReize);
  }, []);

  return windowSize;
};

export default useWindowSize;
