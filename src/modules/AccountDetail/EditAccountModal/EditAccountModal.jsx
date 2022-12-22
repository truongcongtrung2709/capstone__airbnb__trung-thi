import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import "./editAccountModal.scss"
const EditAccountModal = ({showEditModal, handleClose}) => {
  return (
    <div>
        <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa hồ sơ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Đóng
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditAccountModal