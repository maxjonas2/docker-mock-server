import useSwr from "swr";
import { useState, MouseEvent } from "react";
import { apiDomain, fetcher } from "../config";
import { PostData } from "../types";

export default function PostsTable({
  onPostClick,
}: {
  onPostClick: (id: string) => void;
}) {
  const [pagination, setPagination] = useState(1);

  const {
    data: postsData,
    isLoading,
    error,
  } = useSwr<PostData[]>(
    apiDomain + `/posts?pagination=${pagination}`,
    fetcher,
    {
      fallbackData: [],
    }
  );

  function handleTitleClick(e: MouseEvent, postId: string) {
    e.preventDefault();
    onPostClick(postId);
  }

  return (
    <div className='min-h-[400px] grid place-items-center'>
      {error && <div>Error...</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && postsData ? (
        <table>
          <thead>
            <tr>
              <th className='w-24'>Post ID</th>
              <th className='w-[400px]'>title</th>
              <th className='w-40'>Data Created</th>
            </tr>
          </thead>
          <tbody>
            {postsData &&
              postsData.map((post) => (
                <tr key={post.id}>
                  <td className='text-center'>{post.id}</td>
                  <td className='text-ellipsis whitespace-nowrap overflow-hidden max-w-xs'>
                    <a href='' onClick={(e) => handleTitleClick(e, post.id)}>
                      {post.title}
                    </a>
                  </td>
                  <td className='text-center'>{post.createdAt}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null}
      <div className='mt-auto'>
        <button className='btn' onClick={() => setPagination(pagination + 1)}>
          Next
        </button>
        <button
          className='btn ml-2'
          onClick={() => setPagination(pagination === 1 ? 1 : pagination - 1)}
          disabled={pagination === 1}
        >
          Previous
        </button>
      </div>
    </div>
  );
}
