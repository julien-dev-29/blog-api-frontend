import type { Post } from "@/types/types";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { NavLink } from "react-router";

export default function PostsHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchPosts() {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/posts?p=1");
      const data = await res.json();
      setPosts(data.posts);
      console.log(data);
    } catch (error) {
      setError("Failed to fetch posts");
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="w-full max-w-6xl container flex-1 grid grid-cols-1 lg:grid-cols-3 gap-5 pt-5">
      {posts.map((post) => (
        <NavLink to={"/categories/" + post.id} key={post.id}>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
            <CardFooter>
              <p className="text-muted-foreground">{Intl.DateTimeFormat('en', {
                year: "numeric",
                month: "long",
                day: "numeric"
              }).format(new Date(post.createdAt))}</p>
            </CardFooter>
          </Card>
        </NavLink>
      ))}
    </div>
  );
}
