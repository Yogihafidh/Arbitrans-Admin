import BackgroundLogin from "../features/authentication/BackgroundLogin";
import LoginForm from "../features/authentication/LoginForm";

function Login() {
  return (
    <div className="bg-netral-100 grid h-screen grid-cols-2">
      <BackgroundLogin />
      <LoginForm />
    </div>
  );
}

export default Login;
