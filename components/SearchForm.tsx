import { useCallback, useState } from "react";

import useSearch from "@/hooks/useSearch";
import Button from "./Button";
import SearchPostFeed from "./posts/SearchFeed";
import { useRouter } from "next/navigation";

interface SearchProps {
  placeholder?: string;
  postId?: string;
  value?: string;
}

const SearchForm: React.FC<SearchProps> = ({ placeholder, postId, value }) => {
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSearch = () => {
    const encodedSearchQuery = encodeURI(body);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-1">
      <div className="flex flex-row gap-2">
        <div className="w-full">
          <textarea
            disabled={isLoading}
            onChange={(event) => setBody(event.target.value)}
            value={body}
            className="
                      disabled:opacity-80
                      peer
                      resize-none
                      mt-2
                      w-full
                      bg-black
                      ring-0
                      outline-none
                      text-[20px]
                      placeholder-red-300
                      text-white
                      "
            placeholder={placeholder}
          ></textarea>
          <hr
            className="
                      opacity-0
                      peer-focus:opacity-100
                      h-[1px]
                      w-full
                      hover:opacity-100
                      border-neutral-800
                      transition
                      "
          ></hr>
          <div className="mt-4 flex flex-row justify-end">
            <Button
              label="Search"
              secondary
              disabled={isLoading || !body}
              onClick={onSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
