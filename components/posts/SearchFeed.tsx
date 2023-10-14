import useSearch from "@/hooks/useSearch";
import PostItem from "./PostItem";
import usePosts from "@/hooks/usePosts";

interface SearchFeedProps {
  input?: string;
  userId?: string;
}

const SearchPostFeed: React.FC<SearchFeedProps> = ({ input, userId }) => {
  const { data: posts = [] } = usePosts(userId);

  let modPosts: Record<string, any>[] = [];

  posts.filter((post: { body: (string | undefined)[] }) => {
    if (post.body.includes(input)) {
      modPosts.push(post);
    }
  });

  return (
    <>
      {modPosts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
      ;
    </>
  );
};

export default SearchPostFeed;
