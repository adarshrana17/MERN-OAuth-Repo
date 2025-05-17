const Login = () => {
  const backendURL = "http://localhost:5000"; // change to your deployed URL later

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Sign In</h2>

        <div className="space-y-4">
          <a
            href={`${backendURL}/auth/google`}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded block"
          >
            Login with Google
          </a>

          <a
            href={`${backendURL}/auth/facebook`}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded block"
          >
            Login with Facebook
          </a>

          <a
            href={`${backendURL}/auth/github`}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded block"
          >
            Login with GitHub
          </a>
          <a href="/" className="text-blue-500">
            {"<"} Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
