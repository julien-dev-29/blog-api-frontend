import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import Comments from "./posts-comments";
import { getToken, getUserId } from "../../authentication/auth";
import { ArrowBigLeft } from "lucide-react";

const PostsDetails = () => {
  const [post, setPost] = useState({
    Comment: [],
  });
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const params = useParams();

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/comments", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        method: "POST",
        body: JSON.stringify({
          userId: getUserId(),
          postId: params.postId,
          content: comment,
        }),
      });
      if (!res.ok) throw new Error(await res.json());
      const data = await res.json();
      const newComment = data.comment;
      setPost((prev) => ({
        ...prev,
        Comment: [...prev.Comment, newComment],
      }));
      setComment("");
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/posts/${params.postId}`
        );
        if (!res.ok) throw new Error(await res.json());
        const data = await res.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.postId]);

  if (error)
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! Task failed successfully.</span>
      </div>
    );

  if (loading)
    return <span className="loading loading-spinner loading-xl"></span>;

  return (
    <div className="p-5 flex-1">
      <NavLink to="/posts" className="btn btn-info mb-5">
        <ArrowBigLeft />
      </NavLink>
      {post && (
        <div>
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      )}

      <Comments
        postId={params.postId}
        comments={post.Comment}
        comment={comment}
        setComment={setComment}
        handleAddComment={handleAddComment}
      />
    </div>
  );
};

export default PostsDetails;
