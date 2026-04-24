import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/validation";
import { registerUser } from "../services/authApi";

import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);

      // token + user kaydet
      dispatch(
        setCredentials({
          user: res.user,
          token: res.token,
        })
      );

      toast.success("Register successful 🎉");

      // login olmuş kullanıcıyı yönlendir
      navigate("/recommended", { replace: true });

    } catch (err) {
      const message =
        err.response?.data?.message || "Register failed";

      toast.error(message); // backend hatasını göster

      console.log("REGISTER ERROR:", err.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* NAME */}
      <input placeholder="Name" {...register("name")} />
      <p style={{ color: "red" }}>{errors.name?.message}</p>

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

      <button type="submit">Register</button>
    </form>
  );
}