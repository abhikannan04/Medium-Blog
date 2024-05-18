import Appbar from "./Appbar";
import { Blogstype } from "../hooks";
import { Avatar } from "./BlogCard";
export default function FullBlog({ blog }: { blog: Blogstype }) {
  return (
    <div>
      <Appbar></Appbar>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-lg pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-400 pt-3">
              Posted On 2nd December 2024
            </div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4 ">
            <div className="text-slate-400 text-lg">AUTHOR</div>
            <div className="flex w-full">
              <div className="pr-2 flex justify-cneter flex-col mt-2">
                <Avatar size="big" name={blog.author.name}></Avatar>
              </div>
              <div className="mt-2 text-3xl font-bold ">
                {blog.author.name || "Anonymous"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
