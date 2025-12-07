import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypeWriter() {
  const typedEl = useRef(null);

  useEffect(() => {
    let typedInstance;
    if (typedEl.current) {
      typedInstance = new Typed(typedEl.current, {
        strings: [
          "Talokar Coding Academy",
          "Zubair Pro Coder",
          "Fronted Developer",
          "Web Developer",
          "Chat Bot Developer",
          "Software Engineer",
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        backDelay: 1500,
        showCursor: true,
        cursorChar: "|",
      });
    }

    return () => {
      if (typedInstance) typedInstance.destroy();
    };
  }, []);

  return <span ref={typedEl}></span>;
}
