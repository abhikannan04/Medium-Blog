
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SignupInput } from "@abhikannan/medium-project";

export default function Auth({ type }: { type: "signin" | "signup" }) {
  // we are using the common mosule here for the types of the state to prevent form any error
  const navigate = useNavigate();
  const [postInputs, setpostInputs] = useState<SignupInput>({
    username: "",
    name: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`
      ,postInputs);
      const jwt = response.data;
      console.log(jwt);
      localStorage.setItem("token",jwt);
      navigate("/blogs");
    } catch (e) {
      console.log(e);
      alert("Error sending");
    }
  }


  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-12">
            <div className="text-3xl font-bold">Create an Account</div>
            <div className="text-slate-500 pl-2 ">
              {type === "signin"
                ? "Don't have an Account?"
                : "Already Have an Account?"}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="underline pl-1"
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>

          <div className="pt-3">
            
              {type==="signup"?<LabelledInput
                label="Name"
                placeholder="Abhilash Kannan..."
                onChange={(e) => {
                  setpostInputs({ ...postInputs, name: e.target.value });
                }}
              ></LabelledInput>:null}
            
            <LabelledInput
              label="Username"
              placeholder="abhikannan@gmail.com..."
              onChange={(e) => {
                setpostInputs({ ...postInputs, username: e.target.value });
              }}
            ></LabelledInput>
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="123456"
              onChange={(e) => {
                setpostInputs({ ...postInputs, password: e.target.value });
              }}
            ></LabelledInput>
            <button
              onClick={sendRequest}
              type="button"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-3.5 me-2 mb-2 mt-10 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LablledInputType {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LablledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-black pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
