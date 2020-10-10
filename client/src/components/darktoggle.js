import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Toggle from 'react-toggle'
import { BsMoon } from "react-icons/bs";
import { BsSun } from "react-icons/bs";

   const DARK_CLASS = "dark";

const DarkToggle = () => {
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)"
    },
    undefined,
    prefersDark => {
      setIsDark(prefersDark);
    }
  );

  const [isDark, setIsDark] = useState(systemPrefersDark);

     useEffect(() => {
       if (isDark) {
         document.documentElement.classList.add(DARK_CLASS)
       } else {
         document.documentElement.classList.remove(DARK_CLASS)
       }
     }, [isDark]);

  return (

    <Toggle 
        className="DarkToggle"
        onChange={event => setIsDark(event.target.checked)}
        icons={{checked: <BsMoon color="white" />, unchecked: <BsSun color="yellow"/>}}
        checked={isDark}
        aria-label="Dark mode"
    />
  );
};
export default DarkToggle;