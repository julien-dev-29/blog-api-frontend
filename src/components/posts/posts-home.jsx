import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const PostsHome = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts");
        const data = await res.json();
        if (!res.ok) throw new Error(data);
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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

  if (isLoading)
    return <span className="loading loading-spinner loading-xl"></span>;

  return (
    <div className="p-5">
      <h1>Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {posts.map((post) => {
          return (
            <div className="card bg-base-100 w-96 shadow-sm" key={post.id}>
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p>{post.content}</p>
                <div className="card-actions justify-end">
                  <NavLink className="btn btn-primary" to={`/posts/${post.id}`}>
                    See more
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostsHome;
