import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useState } from 'react';
import NewJobOrderForm from './NewJobOrderForm';

const NewJobOrderModal = () => {
    const [visible, setVisible] = useState(false);

    const handleModal = () => setVisible((isOpen) => !isOpen);

    if (!visible) return <CButton onClick={() => setVisible(true)}>New Order</CButton>;

    return (
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
                <div>New Job Order</div>
            </CModalHeader>
            <CModalBody>
                <NewJobOrderForm />
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                </CButton>
                <CButton color="primary">Submit</CButton>
            </CModalFooter>
        </CModal>
    );
};

export default NewJobOrderModal;
