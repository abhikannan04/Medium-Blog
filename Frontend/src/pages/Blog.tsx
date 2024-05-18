import Appbar from "../components/Appbar.tsx";
import FullBlog from "../components/FullBlog";
import { Spinner } from "../components/Spinner.tsx";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
export default function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: Number(id),
  });

  if (loading || !blog) {
    return (
      <div>
          <Appbar></Appbar>
        <div className="h-screen flex justify-center flex-col">
          <div className="flex justify-center"><Spinner></Spinner></div>
        </div>
      </div>
    );
  }

  const defaultBlog = {
    id: 0,
    title: "",
    content: "",
    author: { name: "Anonymous" },
    publisheddate: "N/A",
  };

  return (
    <div>
      <FullBlog blog={blog || defaultBlog} />
    </div>
  );
}
