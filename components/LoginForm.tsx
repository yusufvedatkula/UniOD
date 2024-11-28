import Link from "next/link"

export const LoginForm = () => {
    return(
        <div className="grid place-items-center m-10">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-950">
          <h1 className="text-xl font-bold my-4">Login</h1>
  
          <form className="flex flex-col gap-4">
            <input
            className="bg-gray-50 border
            border-gray-300 
            text-white text-sm rounded-lg 
            focus:ring-blue-500 
            focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700
             dark:border-gray-600 
             dark:placeholder-white 
             dark:text-white 
             dark:focus:ring-blue-500 
             dark:focus:border-blue-500"
              type="text"
              placeholder="Email"
            />
            <input
            className="bg-gray-50 border
            border-gray-300 
            text-white text-sm rounded-lg 
            focus:ring-blue-500 
            focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700
             dark:border-gray-600 
             dark:placeholder-white 
             dark:text-white 
             dark:focus:ring-blue-500 
             dark:focus:border-blue-500"
              type="password"
              placeholder="Password"
            />
            <button className="bg-blue-900 
            text-white font-bold 
            cursor-pointer border-solid border-black border-0 px-6 py-2 
            rounded-md hover:bg-blue-700 
            transition-all duration-300 ease-in-out">
              Login
            </button>
  
            <Link className="text-sm mt-3 text-right" href={"/register"}>
                Dont have an account? <span className="underline">Register</span>
            </Link>
          </form>
        </div>
      </div>
    )
}