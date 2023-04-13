import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

//can reuse this fetcher hook without fetching it everytime

const useUser=(userId: string)=>{
    const {data,
        error,
        isLoading,
        mutate
    } = useSWR(userId? `/api/users/${userId}`: null ,fetcher)
//use current.ts
    return{
        data,
        error,
        isLoading,
        mutate
    }
}
export default useUser;
