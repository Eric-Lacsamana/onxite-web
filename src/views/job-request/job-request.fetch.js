import { ENDPOINTS } from 'src/constants/api';
import { thenCallbackRQ } from 'src/utils/helpers';
import api from 'src/utils/api';

const qs = require('qs');

export const postJobOrder = async (data) => {
    const payload = {
        // vehicle: data.vehicle.id,
        assignees: data.assignees.map((assignnee) => assignnee.id),
        complain: data.complain,
        diagnosis: data.diagnosis,
        completionOfWork: data.completionOfWork,
        // lineItems: data.lineItems,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
    };

    const result = await api.post(ENDPOINTS.JOB_ORDERS, { data: payload }).then(thenCallbackRQ);
    return result;
};

export const getJobRequest = async (ctx) => {
    const query = qs.stringify(
        {
            // sort: ['title:asc'],
            // filters: params,
            populate: '*',
            // populate: {
            //     jobOrders: {
            //         populate: ['work-orders'],
            //     },
            // },
            // fields: ['title'],
            pagination: {
                // pageSize: 10,
                // page: 1,
            },
            publicationState: 'live',
            // locale: ['en'],
        },
        {
            encodeValuesOnly: true, // prettify url
        },
    );

    const { queryKey } = ctx;
    const [, id] = queryKey;

    const result = await api.get(`${ENDPOINTS.JOB_ORDERS}/${id}?${query}`).then(thenCallbackRQ);
    return result;
};

export const getJobRequests = async (ctx) => {
    const { queryKey } = ctx;
    const [, { params, sort }] = queryKey;
    const query = qs.stringify(
        {
            sort,
            filters: params,
            populate: '*',
            // populate: {
            //     customer: {
            //         // populate: ['work-orders'],
            //         populate: '*',
            //     },
            // },
            // fields: ['title'],
            // pagination: {
            //     pageSize: 10,
            //     page: 1,
            // },
            publicationState: 'live',
            // locale: ['en'],
        },
        {
            encodeValuesOnly: true, // prettify url
        },
    );

    const result = await api.get(`${ENDPOINTS.JOB_ORDERS}?${query}`).then(thenCallbackRQ);

    return result;
};
