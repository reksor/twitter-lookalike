import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useImage = (userId?: string) => {
  const url = userId ? `/api/image/${userId}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useImage;
