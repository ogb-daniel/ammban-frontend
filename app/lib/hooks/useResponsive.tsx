import { useEffect, useState } from "react";

const useResponsive = (width?: number, height?: number) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    if (width && height)
      setIsMobile(window.innerWidth <= width || window.innerHeight <= height);
    else setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isMobile;
};

export default useResponsive;
