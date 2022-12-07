import { useRef, useState, useEffect, memo } from "react";
// import { IMapSlice, setSearchKeyword, setSearchStation } from '@/store/feature/map'
// import { RootState } from '@/store'

import type {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";

interface IProps<T> {
  onChange: any;
  value?: T;
  options: T[];
}

const BaseAutoComplete = <T extends IBikeStation>({
  onChange,
  value,
  options,
}: IProps<T>) => {
  const listRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isShow, setIsShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<T[]>([]);

  const handleFocus = (v: boolean) => setIsShow(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.currentTarget.value);

  const handleKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      const el = listRef.current!.children[0] as HTMLLIElement;
      el.focus();
    }
  };

  const handleListKeydown = (e: KeyboardEvent<HTMLLIElement>) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLLIElement;
    if (e.key === "ArrowDown") {
      const next = target.nextSibling as HTMLLIElement;
      next.focus();
      listRef.current?.scrollTo({
        top: next.offsetTop,
        behavior: "smooth",
      });
    } else if (e.key === "ArrowUp") {
      const prev = target.previousSibling as HTMLLIElement;
      if (!prev?.tabIndex) {
        inputRef.current?.focus();
        return;
      }

      prev.focus();
      listRef.current?.scrollTo({
        top: prev.offsetTop,
        behavior: "smooth",
      });
    } else if (e.key === "Tab" || e.key === "Enter") {
      onChange(searchResult[e.currentTarget.tabIndex]);
      setIsShow(false);
    }
  };

  const handleListHover = (e: ReactMouseEvent<HTMLLIElement>) => {
    const el = listRef.current?.children[
      e.currentTarget.tabIndex
    ] as HTMLLIElement;
    el.focus();
  };

  const handleListClick = (e: ReactMouseEvent<HTMLLIElement>) => {
    onChange(searchResult[e.currentTarget.tabIndex]);
    setIsShow(false);
  };

  // const handleEnter = () => onEnter();

  function handleClickOutside(e: MouseEvent): any {
    if (wrapperRef && !wrapperRef.current?.contains(e.target as Node))
      setIsShow(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSearchResult(
      options.filter(
        (el) =>
          el.StationName?.Zh_tw?.includes(keyword) ||
          el.StationAddress?.Zh_tw?.includes(keyword),
      ),
    );
  }, [options, keyword]);

  useEffect(() => {
    if (value?.StationName?.Zh_tw) setKeyword(value?.StationName.Zh_tw);
  }, [value]);

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        ref={inputRef}
        value={keyword}
        onChange={handleChange}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
        onKeyUp={handleKeyup}
        placeholder="尋找站點"
        className="
          pl-4 py-2.5
          mr-1.5
          rounded-lg
          border-none focus:border-1
          min-w-[256px] md:min-w-[452px]
          shadow focus:shadow-lg
          focus:outline-none
          h-full
        "
      />
      <div
        className={`
        absolute top-12 inset-x-0
        mr-1.5
        bg-white
        rounded-lg
        shadow
        px-2 py-1
        max-h-[200px]
        overflow-hidden
        ${isShow ? "" : "hidden"}
      `}
      >
        <ul
          ref={listRef}
          onScroll={(e) => e.stopPropagation()}
          className="max-h-[192px] overflow-y-scroll hide-scrollbar"
        >
          {searchResult.length ? (
            searchResult.map((el, index) => (
              <li
                key={"search" + el.StationUID + Math.random()}
                tabIndex={index}
                className="
                  pl-2 py-1
                  hover:bg-primary  focus:bg-primary
                  focus:outline-none
                  rounded-lg
                  cursor-pointer
                "
                onKeyDown={handleListKeydown}
                onMouseOver={handleListHover}
                onClick={handleListClick}
              >
                {el.StationName?.Zh_tw}
              </li>
            ))
          ) : (
            <li className="pl-2 py-1 text-secondary">找不到相關站點</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default memo(BaseAutoComplete);
