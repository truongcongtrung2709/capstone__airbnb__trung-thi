import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import "./signup.scss";
import { signup } from "../../../slides/authSlide";
import { Link, Navigate } from "react-router-dom";
const Signup = () => {
  const dispatch = useDispatch;
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
    },
    mode: "onTouched",
  });
  const { errors } = formState;
  const onSubmit = (values) => {
    console.log(values);
    dispatch(signup(values));
  };
  return (
    <div className="signup">
      <h2>ĐĂNG KÝ</h2>
      <form className="formSignup" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Tên người dùng</label>
          <input
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Tên không được bỏ trống",
              },
              minLength: {
                value: 5,
                message: "Tên phải từ 8 - 16 kí tự",
              },
              maxLength: {
                value: 16,
                message: "Tên phải từ 8 - 16 kí tự",
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email không được bỏ trống",
              },

              pattern: {
                value:
                  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                message: "Email không đúng định dạng",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <label>Mật Khẩu</label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Mật Khẩu không được bỏ trống",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <label>Số điện thoại</label>
          <input
            type="number"
            {...register("phone", {
              required: {
                value: true,
                message: "Số điện thoại không được bỏ trống",
              },
              pattern: {
                value: /[0-9]{10,16}/,
                message: "Số điện thoại phải là số, từ 10 - 16 kí số",
              },
            })}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
          <label>Ngày Sinh</label>
          <input
            type="text"
            {...register("birthday", {
              required: {
                value: true,
                message: "Ngày Sinh không được bỏ trống",
              },
              pattern: {
                value:
                  "^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$",
                message: "Ngày sinh không hợp lệ",
              },
            })}
          />
          {errors.birthday && <p>{errors.birthday.message}</p>}
          <label>Giới Tính</label>
          <input
            type="radio"
            value="true"
            name="gender"
            defaultChecked
            {...register("gender")}
          />
          Nam
          <input
            type="radio"
            value="false"
            name="gender"
            {...register("gender")}
          />
          Nữ
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>
        <div>
          <button>Tạo Tài Khoản</button>
          <div>
            Đã có tài khoản ? <Link to="/signin">Đăng nhập ngay !</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
