import { useState } from "react";
import PostInfo from "./components/PostInfo";
import PostsTable from "./components/PostsTable";
import useSwr from "swr";
import { apiDomain, fetcher } from "./config";
import { PostData } from "./types";

export default function App() {
  const [currentPost, setCurrentPost] = useState<string>("1");

  function handleTablePostClick(postId: string) {
    setCurrentPost(postId);
  }

  const { data } = useSwr<PostData>(
    apiDomain + `/posts/${currentPost}`,
    fetcher
  );

  return (
    <div className='flex'>
      <div className='flex-1'>
        <h1>Info</h1>
        <PostInfo postData={data} />
      </div>
      <div className='flex-1'>
        <h1>Table</h1>
        <PostsTable onPostClick={handleTablePostClick} />
      </div>
    </div>
  );
}
