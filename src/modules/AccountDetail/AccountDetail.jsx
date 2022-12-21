import React from 'react'
import "./accountdetail.scss"
import {BsPersonCircle} from "react-icons/bs"
import {HiOutlineShieldCheck} from "react-icons/hi"
import {BsCheckLg} from "react-icons/bs"
import { Nav } from 'react-bootstrap'
const AccountDetail = () => {
  return (
    <div className='account'>
      <div className="account-container">
        <div className="account__content ">
          <div className="account__detail ">
            <div className="avatar">
            <BsPersonCircle className="avatar__pic"/>
            <Nav.Link href="" className="avatar__update">Cập nhật ảnh</Nav.Link>
            </div>
            <div className="verify">
            <HiOutlineShieldCheck className='verify__icon'/>
            <h6 className='verify__title'>Xác minh danh tính</h6>
            <p>Xác thực danh tính của bạn với huy hiệu xác minh danh tính.</p>
            <button className="btn btn-medal">Nhận huy hiệu</button>
            <hr width="80%"/>
            </div>
            <div className="confirm">
              <h4 className='confirm__title'>Du đã xác nhận</h4>
              <span className="confirm__email"><BsCheckLg/>Địa chỉ email</span>
            </div>
          </div>
          <div className="account__rooms">

          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountDetail