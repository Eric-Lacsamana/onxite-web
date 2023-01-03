import { CCard, CRow, CCol, CFormSelect } from '@coreui/react';
import React, { useState } from 'react';
import VehicleSelect from 'src/views/vehicles/components/VehicleSelect';

const NewJobOrderForm = () => {
    return (
        <CRow>
            <CCol>
                <VehicleSelect />
            </CCol>
        </CRow>
    );
};

export default NewJobOrderForm;
