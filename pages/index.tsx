import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import { FixedSizeList as List } from "react-window";

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's up Sweets?" />
      <PostFeed />
    </>
  );
}
