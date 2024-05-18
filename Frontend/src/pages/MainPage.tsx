import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div>
      <div className="flex justify-center flex-col min-h-screen">
        <div className="flex justify-center font-semibold text-7xl mt-8 font-serif ">
          STAY CURIOUS.
        </div>
        <div className="flex justify-center">
          <Link to={"/signup"}>
            <button
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xl px-5 py-2.5 me-2 mb-2 mt-10"
            >
              SignUp
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
