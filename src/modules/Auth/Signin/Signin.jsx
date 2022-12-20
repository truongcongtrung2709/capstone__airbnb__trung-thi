import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { signin } from "../../../slides/authSlide";
import "./signin.scss";
const Signin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("redirectUrl"));

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  console.log(user);
  const { register, handleSubmit, formState } = useForm({
    defaultValue: { email: "", password: "" },
    mode: "onTouched",
  });
  const { errors } = formState;

  const onSubmit = (values) => {
    console.log(values);
    dispatch(signin(values));
  };
  if (user) {
    const redirectUrl = searchParams.get("redirectUrl");
    // Có thông tin user => đã đăng nhập => redirect redirectUrl hoặc Home
    return <Navigate to={redirectUrl || "/"} replace />;
  }

  return (
    <div className="signin">
      <h2>ĐĂNG NHẬP</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-sign">
        <div className="form-item row">
          <label className="email  col-4">Email</label>
          <input
            placeholder="email..."
            className="input-email col-8"
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "Email không được bỏ trống",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="form-item row">
          <label className="password col-4">Password</label>
          <input
            placeholder="password..."
            className="input-password col-8"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Mật khẩu không được bỏ trống",
              },
              minLength: {
                value: 6,
                message: "Mật khẩu phải từ 6 ký tự trở lên",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button className="btn-signin" disabled={loading}>
          Đăng Nhập
        </button>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default Signin;
