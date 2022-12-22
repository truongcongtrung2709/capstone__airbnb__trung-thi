import React, { useRef, useState } from "react";
import "./accountdetail.scss";
import { BsPersonCircle } from "react-icons/bs";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { BsCheckLg } from "react-icons/bs";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import EditAccountModal from "./EditAccountModal/EditAccountModal";
import {  useNavigate } from "react-router-dom";
const AccountDetail = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [imgPreview, setImgPreview] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const handleClose = () => setShowEditModal(false);
  const handleShow = () => setShowEditModal(true);

  const inputRef = useRef(null);

  const handleClickFile = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    } else {
      console.log("fileObj is", fileObj);
      e.target.value = null;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileObj);
      fileReader.onload = (evt) => {
        setImgPreview(evt.target.result);
      };
    }
  };
if(!user || user === undefined) {
  // navigate("/")
  return;
}
  return (
    <div className="account">
      <div className="account__container">
        <div className="account__content row">
          <div className="account__detail col-3">
            <div className="avatar">
              <div className="avatar__pic">
                {!imgPreview ? (
                  <BsPersonCircle />
                ) : (
                  imgPreview && (
                    <img width={150} src={imgPreview} alt="preview" />
                  )
                )}
              </div>
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
              />
              <Nav.Link
                href=""
                className="avatar__update"
                onClick={handleClickFile}
              >
                Cập nhật ảnh
              </Nav.Link>
            </div>
            <div className="verify">
              <HiOutlineShieldCheck className="verify__icon" />
              <h6 className="verify__title">Xác minh danh tính</h6>
              <p>Xác thực danh tính của bạn với huy hiệu xác minh danh tính.</p>
              <button className="btn btn-medal">Nhận huy hiệu</button>
              <hr />
            </div>
            <div className="confirm">
              <h4 className="confirm__title">{user.user.name} đã xác nhận</h4>
              <span className="confirm__email ">
                <BsCheckLg />
                Địa chỉ email
              </span>
            </div>
          </div>
          <div className="account__rooms col-9">
            <h2>Xin chào, tôi là {user.user.name}</h2>
            <p>Bắt đầu tham gia vào 2022</p>
            <button href=""  className="edit-account "
            onClick={handleShow}
            >
              Chỉnh sửa hồ sơ
            </button>
            <EditAccountModal showEditModal={showEditModal} handleClose={handleClose} />
            <h2>Phòng đã thuê</h2>
            <div className="rentList"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
