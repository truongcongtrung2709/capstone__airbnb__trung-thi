import React, { useEffect, useMemo } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import usersAPI from "../../../services/usersAPI";
import "./editAccountModal.scss";
const EditAccountModal = ({ showEditModal, handleClose, userDetails }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      if (userDetails !== undefined) {
        return {
          name: userDetails.name,
          email: userDetails.email,
          phone: userDetails.phone,
          birthday: userDetails.birthday,
          gender: userDetails.gender,
        };
      } else {
        return {
          name: "",
          email: "",
          phone: "",
          birthday: "",
          gender: "",
        };
      }
    }, [userDetails]),
    mode: "onTouched",
  });
  useEffect(() => {
    reset(userDetails);
  }, [userDetails, reset]);
  const onSubmit = async (values) => {
    try {
      console.log(values);
      const newValues = {
        id: values.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthday: values.birthday,
        gender: values.gender,
      };
      await usersAPI.updateUser(newValues);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa hồ sơ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="edit-item">
              <label htmlFor="name">Tên người dùng</label>

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
            <div className="edit-item">
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
            </div>
            {errors.email && <p>{errors.email.message}</p>}
            <div className="edit-item">
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
            </div>
            {errors.phone && <p>{errors.phone.message}</p>}
            <div className=" edit-item">
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
            </div>
            {errors.birthday && <p>{errors.birthday.message}</p>}
            <div className=" edit-item">
              <label>Giới Tính</label>
              <div className="gender ">
                <input
                  type="radio"
                  value="true"
                  name="gender"
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            className="btn-save"
            onClick={handleSubmit(onSubmit)}
          >
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditAccountModal;
