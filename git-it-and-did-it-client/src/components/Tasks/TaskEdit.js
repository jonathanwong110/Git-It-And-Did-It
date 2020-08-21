import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function TaskEdit(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { task } = props
  const { capitalizeFirstLetter } = props

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{capitalizeFirstLetter(task.title)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Edit {capitalizeFirstLetter(task.title)}!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TaskEdit