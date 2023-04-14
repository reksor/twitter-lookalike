import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

//can reuse this fetcher hook without fetching it everytime

const usePost=(postId?: string)=>{
    const url=postId ? `/api/posts/${postId}` : null;
    const {
        data,
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
export default usePost;
