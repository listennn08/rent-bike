import { useContext } from "react";
import { HomeContext } from "~/routes/home";

import type { MouseEvent, ReactElement } from "react";

interface Props {
  children: ReactElement[];
}

function BaseNav({ children }: Props) {
  const { mode, setMode } = useContext(HomeContext);
  const handlerClick = (e: MouseEvent, value: boolean) => {
    e.preventDefault();
    setMode(value);
  };

  return (
    <nav
      className="
      rounded-full
      relative
      h-full
      bg-white 
      hidden lg:flex
      items-center
    "
    >
      <button
        className={`
          flex-1 flex items-center justify-center
          rounded-full 
          px-5 py-3
          tracking-10px
          ${mode ? "bg-black text-primary" : ""}
        `}
        onClick={($e) => handlerClick($e, true)}
      >
        {children[0]}
      </button>
      <button
        className={`
          flex-1 flex items-center justify-center
          rounded-full 
          px-5 py-3
          tracking-10px
          ${mode ? "" : "bg-black text-primary"}
        `}
        onClick={($e) => handlerClick($e, false)}
      >
        {children[1]}
      </button>
    </nav>
  );
}

export default BaseNav;
