import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center w-80">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Hello, Admin! 🎉</h1>
        <p className="text-gray-600 mb-6">Manage your recipes with ease.</p>

        <div className="flex flex-col space-y-4">
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
            Update Recipe
          </Link>

          <Link
            to="/admin/delete"
            className="px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition duration-300"
          >
            Delete Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
