import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

//can reuse this fetcher hook without fetching it everytime

const useCurrentUser=()=>{
    const {data, error, isLoading, mutate} = useSWR('/api/current',fetcher)
//use current.ts
    return{
        data,
        error,
        isLoading,
        mutate
    }
}
export default useCurrentUser;
