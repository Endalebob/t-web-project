import { useAppDispatch } from "<@>/store/hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthImage from "./AuthImage";
import InputField from "./InputField";

const initialState = {
  email: "",
  password: "",
};
interface FormValues {
  email: string;
  password: string;
}
const Signin = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const { email, password } = formValue;
  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const router = useRouter();

  const handleSignin = async () => {
    const validationErrors: Partial<FormValues> = {};

    if (!email) {
      validationErrors.email = "Email is required";
    } //check if email is valid
    else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      validationErrors.email = "Email is invalid";
    } else if (!password) {
      validationErrors.password = "Password is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }
  };
  const handleSignup = () => {
    router.push("/auth/signup");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <AuthImage />

      <div className="flex flex-col w-1/2 justify-center items-center pb-8 rounded-lg">
        <h1 className="mt-8 pb-2 text-center text-3xl font-bold text-primary-text">
          Log in to your account
        </h1>
        <h4 className="pb-4">
          <div className="flex flex-wrap gap-1 text-secondary-text">
            don't have an account?
            <p
              className=" text-primary font-semibold"
              style={{ cursor: "pointer" }}
              onClick={handleSignup}
            >
              signup
            </p>
          </div>
        </h4>
        <form className="flex flex-col space-y-2">
          <InputField
            label="Email"
            name="email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={handleChange}
            error={errors.password}
          />
          <div className="flex">
            <input
              type="checkbox"
              className="mt-1 mr-2"
              name="remember"
              id="remember"
            />
            <label
              htmlFor="remember"
              className="text-primary-text text-[15px] font-semibold"
            >
              Remember me
            </label>
          </div>
          <button
            type="button"
            onClick={() => handleSignin()}
            className="text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
