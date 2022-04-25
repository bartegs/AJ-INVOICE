import * as React from "react";

interface WindowWidth {
  width: number;
}

function useWindowWidth(): WindowWidth {
  const [windowWidth, setWindowWidth] = React.useState<WindowWidth>({
    width: 0,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth({
        width: window.innerWidth,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}

export default useWindowWidth;
