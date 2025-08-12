import { useState } from "react";
import { useLogin } from "./useLogin";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin123@admin.com");
  const [password, setPassword] = useState("admin123");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <div className="flex w-full flex-col items-center">
        <Logo />
        <p className="text-netral-600 mt-4 mb-12 font-medium">
          Masukan username dan password dahulu.
        </p>
      </div>

      <form
        className="flex w-full max-w-xs flex-col gap-4 md:max-w-sm lg:max-w-sm xl:max-w-md"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            className="text-netral-900 mb-2 block text-sm font-medium"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            placeholder="Masukan username"
            className="focus-within:border-netral-900 placeholder:text-netral-600 border-netral-400 flex w-full items-center gap-2 rounded-lg border-2 px-4 py-2 placeholder:text-sm"
          />
        </div>

        <div>
          <label
            className="text-netral-900 mb-2 block text-sm font-medium"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Masukan username"
              className="focus-within:border-netral-900 placeholder:text-netral-600 border-netral-400 flex w-full items-center gap-2 rounded-lg border-2 px-4 py-2 placeholder:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-netral-600 absolute inset-y-0 right-3 flex cursor-pointer items-center"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.12566 12.148C9.12566 10.6036 10.318 9.35166 11.7888 9.35166C13.2596 9.35166 14.452 10.6036 14.452 12.148C14.452 13.6923 13.2596 14.9443 11.7888 14.9443C10.318 14.9443 9.12566 13.6923 9.12566 12.148ZM10.8625 12.148C10.8625 12.6851 11.2772 13.1206 11.7888 13.1206C12.3004 13.1206 12.7151 12.6851 12.7151 12.148C12.7151 11.6108 12.3004 11.1753 11.7888 11.1753C11.2772 11.1753 10.8625 11.6108 10.8625 12.148Z"
                  fill={showPassword ? "#343a40" : "#ced4da"}
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.2425 7.00519L22.0825 11.0659C22.3955 11.329 22.5776 11.7271 22.5776 12.148C22.5776 12.5689 22.3955 12.967 22.0825 13.23L17.2425 17.2908C14.0525 19.9643 9.52511 19.9643 6.33513 17.2908L1.49513 13.23C1.18217 12.967 1 12.5689 1 12.148C1 11.7271 1.18217 11.329 1.49513 11.0659L6.33513 7.00519C9.52511 4.3316 14.0525 4.3316 17.2425 7.00519ZM7.41197 15.9291C9.9737 18.0699 13.6039 18.0699 16.1657 15.9291L20.5888 12.148L16.1657 8.42766C13.6039 6.28685 9.9737 6.28685 7.41197 8.42766L2.98881 12.148L7.41197 15.9291Z"
                  fill={showPassword ? "#343a40" : "#ced4da"}
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            typeButton="submit"
            text="Login"
            className="my-2 px-8"
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
