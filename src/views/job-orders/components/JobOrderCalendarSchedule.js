import React, { useState } from 'react';
import moment from 'moment';

import { useQuery } from 'react-query';
import { get } from 'lodash';
import Calendar from 'src/components/_global/Calendar';
import { getJobOrders } from '../job-orders.fetch';

const JobOrderCalendarSchedule = () => {
    const {
        data: jobOrders,
        // isFetching,
        // refetch,
    } = useQuery(['job-request', { verified: true }], getJobOrders, {
        placeholderData: [],

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

    const events = jobOrders.map((props) => ({
        title: `${get(props, 'jobOrderId')} |  ${get(props, 'vehicle.brand')}
        ${get(props, 'vehicle.modelName')}
        ${get(props, 'vehicle.yearModel') || ''}
        `,
        start: moment(get(props, 'startDate')).format('YYYY-MM-DD'),
        end: moment(get(props, 'endDate')).format('YYYY-MM-DD'),
        extendedProps: props,
    }));

    return <Calendar data={events} />;
};

export default JobOrderCalendarSchedule;
