import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton.tsx";

import useBlogs from "../hooks";

export default function Blogs() {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <Appbar></Appbar>
        <div className="flex justify-center">
          <div>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar></Appbar>
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
              authorname={blog.author.name || "Anonymous"}
              publisheddate={"12/12/2021"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
