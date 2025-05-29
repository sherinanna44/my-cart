import Register from "../Components/Register";
import Login from "../Components/Login";
function RegisterPage() {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center space-x-4">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <Register />
          </div>
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <Login />
          </div>
        </div>
      </div>
    );
  }
  
export default RegisterPage;