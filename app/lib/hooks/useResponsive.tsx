import { useEffect, useState } from "react";

const useResponsive = (width?: number, height?: number) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (width && height)
      setIsMobile(window.innerWidth <= width || window.innerHeight <= height);
    else setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only add event listener on the client-side
      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [width, height]);

  return isMobile;
};

export default useResponsive;
