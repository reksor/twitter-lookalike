import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import SearchPostFeed from "@/components/posts/SearchFeed";
// import PostFeed from "@/components/posts/PostFeed";
// import useSearch from "@/hooks/useSearch";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

const Search = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;

  // const { input } = router.query;

  // const { data: fetchedPosts, isLoading } = useSearch(input as string);

  // console.log(input);

  // if (isLoading || !fetchedPosts) {
  //   return (
  //     <div className="flex justify-center items-center h-full">
  //       <ClipLoader color="red" size={80} />
  //     </div>
  //   );
  // }
  return (
    <>
      <Header label="Search for a post" showBackArrow />
      <SearchForm placeholder="Search.." />

      <SearchPostFeed input={searchQuery as string} />
    </>
  );
};
export default Search;
