import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Button from 'react-bootstrap/Button';
import img from '../assets/img/vehicle.png'

const ModalDelete = ({show, modalId, handleClose, handleDelete}) => {

    return (
    <>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Menghapus Data Mobil ID {modalId}</Modal.Title>
    </Modal.Header>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={img} style={{ width: '100px' }} alt="Vehicle" />
    </div>
    <Modal.Body>
        Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Cancel
        </Button>
        <Button variant="primary" onClick={() => handleDelete(modalId)}>
        Delete
        </Button>
    </Modal.Footer>
    </Modal>
    </>
    )
}
export default ModalDelete