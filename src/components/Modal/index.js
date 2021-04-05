import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

const {
    Actions: ModalActions,
    Content: ModalContent,
    Description: ModalDescription,
    Header: ModalHeader
} = Modal;

const ModalComponent = ({description, onClose, open, title, ...rest}) =>  (
    <Modal open={open} {...rest}>
        <ModalHeader>{title}</ModalHeader>
        <ModalContent>
            <ModalDescription>
                {description}
            </ModalDescription>
        </ModalContent>
        <ModalActions>
            <Button onClick={onClose}>OK</Button>
        </ModalActions>
    </Modal>
);

export default ModalComponent