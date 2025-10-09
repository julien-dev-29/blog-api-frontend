import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";

const PostsDetails = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const params = useParams();
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-arrow-big-left-icon lucide-arrow-big-left"
        >
          <path d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z" />
        </svg>
      </NavLink>
      {post && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
};

export default PostsDetails;
