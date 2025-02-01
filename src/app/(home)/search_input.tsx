"use client";
import { Button } from "@/components/ui/button";
import { useSearchParam } from "../../../hooks/use-search-param";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

export const SearchInput = () => {
  const [search, setSearch] = useSearchParam("search");
  const [value, setValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleClear = () => {
    setValue("");
    inputRef.current?.blur();
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
        <Input
          value={value}
          ref={inputRef}
          onChange={handleChange}
          placeholder="Search"
          className="md:text-base px-12 w-full border-transparent placeholder:text-gray-800 dark:placeholder:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full h-[48px] focus-visible:shadow-[0_1px_2px_0_rgba(65, 69, 73,0.2), 0_2px_6px_1px_rgba(65, 69, 73,0.1)] focus-visible:ring-0 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-700"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            onClick={handleClear}
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
};
