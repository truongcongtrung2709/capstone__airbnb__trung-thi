import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import "./signup.scss";
import { signup } from "../../../slides/authSlide";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import authAPI from "../../../services/authAPI";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const [imgPreview, setImgPreview] = useState("");

  const { register, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      avatar: "",
      gender: "",
    },
    mode: "onTouched",
  });
  const { errors } = formState;

  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    if (!file) {
      return;
    } else {
      setValue("avatar", file);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (evt) => {
        setImgPreview(evt.target.result);
      };
    }
  };

  const handleClickFile = () => {
    inputRef.current.click();
  };

  const onSubmit = (values) => {
    dispatch(signup(values));
    alert("đăng ký thành công");
    navigate("/");
  };

  return (
    <div className="signup">
      <h2>ĐĂNG KÝ</h2>
      <form className="form-signup" onSubmit={handleSubmit(onSubmit)}>
        <div className=" signup-item">
          <label>Tên người dùng</label>
          <input
            placeholder="tên người dùng..."
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
        </div>

        <div className=" signup-item">
          <label>Email</label>
          <input
            placeholder="Email..."
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email không được bỏ trống",
              },

              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                message: "Email không đúng định dạng",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className=" signup-item">
          <label>Mật Khẩu</label>
          <input
            placeholder="Mật khẩu..."
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Mật Khẩu không được bỏ trống",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className=" signup-item">
          <label>Số điện thoại</label>
          <input
            placeholder="Số điện thoại..."
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
        </div>
        <div className=" signup-item">
          <label>Ngày Sinh</label>
          <input
            placeholder="Ngày Sinh..."
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
        </div>
        <div className="signup-item">
          <label htmlFor="">Hình đại diện</label>
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
          />
          <Nav.Link href="" className="avatar__pick" onClick={handleClickFile}>
            Chọn ảnh
          </Nav.Link>
          {imgPreview && <img width={150} src={imgPreview} alt="preview" />}
        </div>

        <div className=" signup-item">
          <label>Giới Tính</label>
          <div className="gender ">
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
          </div>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>
        <div>
          <button className="btn-signup">Tạo Tài Khoản</button>
          <div>
            Đã có tài khoản ? <Link to="/signin">Đăng nhập ngay !</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
