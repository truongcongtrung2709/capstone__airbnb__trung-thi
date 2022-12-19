import React from "react";
import { useForm } from "react-hook-form";
import "./signin.scss";
const Signin = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValue: { email: "", password: "" },
    mode: "onTouched",
  });
  return (
    <div className="signin">
      <h2>ĐĂNG NHẬP</h2>
    </div>
  );
};

export default Signin;
