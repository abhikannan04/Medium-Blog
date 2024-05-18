import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

interface AppbarProp {
  authorname: string;
}
export default function Appbar({
  authorname,
}:AppbarProp) {
  return (
    <div className="border-b flex justify-between px-10 py-2">
      <Link
        to={"/blogs"}
        className="font-semibold text-large flex justify-center flex-col cursor-pointer "
      >
        <div>MEDIUM</div>
      </Link>
      <div className="flex justify-center">
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-10 mt-1.5"
          >
            New
          </button>
        </Link>
        <Link to={"/signup"}>
          <div className="mt-1">
            <Avatar size={"big"} name={authorname || "UK"} />
          </div>
        </Link>
      </div>
    </div>
  );
}
