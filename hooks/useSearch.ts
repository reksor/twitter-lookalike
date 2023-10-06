import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useSearch = (input?: string) => {
  const url = input ? `/api/search/${input}` : "/api/posts";
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
export default useSearch;
