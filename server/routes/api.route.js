import Express from "express";
import axios from "axios";

const router = Express.Router();

router.get("/posts", async (req, res) => {
  const { pagination } = req.query;

  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
    {
      responseType: "json",
    }
  );
  const date = new Date();
  const treatedData = data.map((post) => {
    const newPost = {
      ...post,
      createdAt: formatDate(date),
    };

    delete newPost.body;

    return newPost;
  });

  res
    .status(200)
    .json(
      pagination
        ? treatedData.slice(10 * (pagination - 1), 10 * (pagination - 1) + 10)
        : treatedData
    );
});

router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;

  const { data: post } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/" + parseInt(postId),
    {
      responseType: "json",
    }
  );

  res.status(200).json(post);
});

function formatDate(date) {
  return `${date.getDate()}/${(date.getMonth() + 1)
    .toString()
    .padStart("2", "0")}/${date.getFullYear()}`;
}

export default router;
