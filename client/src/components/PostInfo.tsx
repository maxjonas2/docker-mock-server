import { PostData } from "../types";

function getAuthorName(authorId: string) {
  const authors = { "1": "Jonas", "2": "George", "3": "Maria" };
  return authors[authorId];
}

export default function PostInfo({ postData }: { postData: PostData }) {
  if (!postData) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h1>{postData.title}</h1>
      <p>Posted by {getAuthorName(postData.userId)}</p>
      <p>{postData.body}</p>
    </div>
  );
}
