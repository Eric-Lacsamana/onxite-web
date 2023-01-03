import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { getFleet } from '../fleet.fetch';
import VehicleTab from '../components/VehicleTab';
import VehicleMaintenanceRequest from '../components/VehicleMaintenanceRequest';

const FleetWindow = ({ isRefetchNext, onRefetch, params = {}, sort = [] }) => {
    const {
        data: fleet,
        // isFetching,
        isRefetching,
        refetch,
    } = useQuery(['fleets', params], getFleet, {
        placeholderData: [],
        enabled: true,
        onError: (err) => {
            // dispatch(
            // 	addToast(
            // 		'Error',
            // 		err.message || 'Something went wrong',
            // 		'danger',
            // 		'help',
            // 	),
            // );
        },
    });

    useEffect(() => {
        if (isRefetching) {
            refetch();
        }
        onRefetch({ isRefetching });
    }, [isRefetching, isRefetchNext, refetch, onRefetch]);

    return (
        <div
            style={{
                overflowY: 'auto',
                overflowX: 'hidden',
                height: 350,
            }}
        >
            <CRow xxl={{ cols: 4, gutterY: 3 }}>
                {fleet.map((vehicle, index) => (
                    <CCol key={index}>
                        {/* <VehicleMaintenanceRequest
                            data={{
                                vehicle,
                            }}
                            onClose={refetch}
                        > */}
                        <div>
                            <VehicleTab data={vehicle} onChange={refetch} />
                        </div>
                        {/* </VehicleMaintenanceRequest> */}
                    </CCol>
                ))}
            </CRow>
        </div>
    );
};

FleetWindow.propTypes = {
    isRefetchNext: PropTypes.bool,
    onRefetch: PropTypes.func,
    type: PropTypes.bool,
    params: PropTypes.object,
    sort: PropTypes.array,
};

FleetWindow.defaultProps = {
    isRefetchNext: false,
    onRefetch: () => {},
    type: false,
    params: {},
    sort: [],
};

export default FleetWindow;
