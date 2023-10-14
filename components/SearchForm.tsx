import { useCallback, useState } from "react";

import Button from "./Button";
import SearchPostFeed from "./posts/SearchFeed";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar";
import useUsers from "@/hooks/useUsers";

interface SearchProps {
  placeholder?: string;
  postId?: string;
  value?: string;
}

const SearchForm: React.FC<SearchProps> = ({ placeholder, postId, value }) => {
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: users = [] } = useUsers();
  const router = useRouter();

  let modUsers: Record<string, any>[] = [];

  users.filter((user: { username: string | string[] }) => {
    if (body === "") {
      return;
    }
    if (modUsers.length >= 3) {
      return;
    }
    if (user.username.includes(body)) {
      modUsers.push(user);
    }
  });

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
      <div className="flex flex-col gap-6 mt-4">
        {modUsers.map((user: Record<string, any>) => (
          <div
            key={user.id}
            className="flex felx-row gap-4 hover:opacity-90 cursor-pointer"
            onClick={() => {
              const url = `/users/${user.id}`;
              router.push(url);
            }}
          >
            <Avatar userId={user.id} />
            <div className="flex flex-col">
              <p className="text-white font-semibold text-sm">{user.name}</p>
              <p className="text-red-600 text-sm">@{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchForm;
