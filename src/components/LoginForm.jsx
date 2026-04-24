import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/validation";
import { loginUser } from "../services/authApi";

import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);

      dispatch(
        setCredentials({
          user: res.user,
          token: res.token,
        })
      );

      toast.success("Login successful 🎉");

      // kullanıcıyı korumalı sayfaya yönlendir
      navigate("/home", { replace: true });

    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed";

      toast.error(message);

      console.log("LOGIN ERROR:", err.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* EMAIL */}
      <input placeholder="Email" {...register("email")} />
      <p style={{ color: "red" }}>{errors.email?.message}</p>

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      <p style={{ color: "red" }}>{errors.password?.message}</p>

      <button type="submit">Login</button>
    </form>
  );
}