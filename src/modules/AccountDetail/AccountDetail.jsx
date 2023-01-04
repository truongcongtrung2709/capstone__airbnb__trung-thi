import React, { useEffect, useRef, useState } from "react";
import "./accountdetail.scss";
import { BsPersonCircle } from "react-icons/bs";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { BsCheckLg } from "react-icons/bs";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import EditAccountModal from "./EditAccountModal/EditAccountModal";
import { useNavigate } from "react-router-dom";
import usersAPI from "../../services/usersAPI";
import roomsAPI from "../../services/roomsAPI";
const AccountDetail = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState([]);
  const [imgPreview, setImgPreview] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [roomDetails, setRoomDetails] = useState([]);
  const handleClose = () => setShowEditModal(false);
  const handleShow = () => {
    setShowEditModal(true);
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await usersAPI.getUserbyId(user.user.id);
        setUserDetails(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user.user.id]);

  useEffect(() => {
    (async () => {
      try {
        const data = await roomsAPI.getRoomByUser(user.user.id);
        setRoomDetails(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user.user.id]);
  // useEffect(()=> {
  //   try {
  //     uploadAvatar();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })

  // const uploadAvatar = async () =>{
  // }

  const inputRef = useRef(null);

  const handleClickFile = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    } else {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileObj);
      fileReader.onload = (evt) => {
        setImgPreview(evt.target.result);
      };
      const formData = new FormData();
      formData.append("formFile", fileObj);
      await usersAPI.uploadAvatar(formData);
    }
  };
  if (!user || user === undefined) {
    alert("bạn chưa đăng nhập");
    navigate("/signin");
  }
  return (
    <div className="account">
      <div className="account__container">
        <div className="account__content row">
          <div className="account__detail col-lg-3">
            <div className="avatar">
              <div className="avatar__pic">
                {!userDetails.avatar ? (
                  <BsPersonCircle />
                ) : (
                  userDetails.avatar && (
                    <img
                      width={150}
                      src={userDetails.avatar}
                      alt="user.user.name"
                    />
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
              <h4 className="confirm__title">{userDetails.name} đã xác nhận</h4>
              <span className="confirm__email ">
                <BsCheckLg />
                Địa chỉ email
              </span>
            </div>
          </div>
          <div className="account__rooms col-lg-9">
            <h2>Xin chào, tôi là {userDetails.name}</h2>
            <p>Bắt đầu tham gia vào 2022</p>
            <button
              href=""
              className="edit-account "
              onClick={() => handleShow()}
            >
              Chỉnh sửa hồ sơ
            </button>
            <EditAccountModal
              showEditModal={showEditModal}
              handleClose={handleClose}
              userDetails={userDetails}
            />
            <h2 className="room-title my-5">Phòng đã thuê</h2>
            <div className="rent-list">
              {roomDetails.map((item) => (
                <div className="rent" key={item.id}>
                  <h4 className="rent-title my-3">Mã Phòng: {item.maPhong}</h4>
                  <div className="room-info">
                    <div className="checkin">
                      <p>Ngày đến: {item.ngayDen}</p>
                      <p>Ngày đi: {item.ngayDi}</p>
                    </div>
                    <div className="num-quest">
                      <p>Mã người dùng:{item.maNguoiDung}</p>
                      <p>{item.soLuongKhach} khách</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
