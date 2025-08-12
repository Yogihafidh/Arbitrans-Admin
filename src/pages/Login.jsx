import BackgroundLogin from "../features/authentication/BackgroundLogin";
import LoginForm from "../features/authentication/LoginForm";

function Login() {
  return (
    <div className="bg-netral-100 mx-auto grid h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-2">
      <BackgroundLogin />
      <LoginForm />
    </div>
  );
}

export default Login;
