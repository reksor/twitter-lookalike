import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import { FixedSizeList as List } from "react-window";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {/* <List height={150} itemCount={posts.length} itemSize={35} width={300}> */}
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
      {/* </List> */}
    </>
  );
};

export default PostFeed;
