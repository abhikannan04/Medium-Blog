import { Link } from "react-router-dom";

interface BlogCardProp {
  id: number;
  authorname: string;
  title: string;
  content: string;
  publisheddate: string;
}
export default function BlogCard({
  id,
  authorname,
  title,
  content,
  publisheddate,
}: BlogCardProp) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-300 p-4 w-screen max-w-screen-md cursor-pointer">
        {/* <div>{id}</div> */}
        <div className="flex">
          <div className="flex justify-center flex-col ">
            <Avatar size={"small"} name={authorname} />
          </div>
          <div className="font-light pl-2 text-sm flex justify-center flex-col ">
            {authorname}
          </div>
          <div className="flex justify-center flex-col pl-2 pt-1  ">
            <Circle />
          </div>
          <div className="pl-2 font-light text-slate-400 flex justify-center flex-col text-sm">
            {" "}
            {publisheddate}
          </div>
        </div>

        <div className="text-xl font-semibold pt-2">{title}</div>

        <div className="text-md font-thin">
          {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </div>

        <div className="text-slate-800 text-sm font-thin pt-5">
          {`${Math.ceil(content.length / 100)} minutes read`}
        </div>
      </div>
    </Link>
  );
}

export function Circle() {
  return <div className="h-1 w-1 rounded full bg-slate-500"></div>;
}
export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`text-xs text-gray-600 dark:text-gray-300 font-thin ${
          size === "small" ? "text-xs" : "text-md"
        }`}
      >
        {name[0] + name[1] || "Anonymous"}
      </span>
    </div>
  );
}
