import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

//can reuse this fetcher hook without fetching it everytime

const usePosts=(userId?: string)=>{
    const url=userId ? `/api/posts?userId=${userId}` : "/api/posts";
    const {data,
        error,
        isLoading,
        mutate
    } = useSWR(url,fetcher)
//use current.ts
    return{
        data,
        error,
        isLoading,
        mutate
    }
}
export default usePosts;
