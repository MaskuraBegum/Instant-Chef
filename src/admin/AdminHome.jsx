import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

const AdminHome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6 relative">
      <Helmet>
        <title>Instant Chef || Admin</title>
      </Helmet>

      <div className="bg-white shadow-lg rounded-lg p-8 text-center w-80">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Hello, Admin! 🎉</h1>
        <p className="text-gray-600 mb-6">Manage your recipes with ease.</p>

        <div className="flex flex-col space-y-4 ">
          <Link to="/admin/details" className=" px-6 py-3 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg transform  transition duration-300 flex items-center justify-center">
          View Recipes
        </Link>
          <Link
            to="/admin/add"
            className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
          >
            Add Recipe
          </Link>

          <Link
            to="/admin/update"
            className="px-6 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition duration-300"
          >
            Update
          </Link>

          <Link
            to="/admin/delete"
            className="px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition duration-300"
          >
            Delete Recipe
          </Link>
        </div>
      </div>

      {/* Go Back to Home Button */}
      <div className="absolute bottom-6 right-6">
        <Link to="/" className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg transform hover:scale-105 transition duration-300 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75M4.5 10.5v9h15v-9" />
          </svg>
          Home
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
