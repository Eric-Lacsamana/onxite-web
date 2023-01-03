import { get } from 'lodash';
import { ENDPOINTS } from 'src/constants/api';
import { thenCallbackRQ } from 'src/utils/helpers';
import api from 'src/utils/api';

const qs = require('qs');

export const postJobOrder = async (data) => {
    const payload = {
        // vehicle: data.vehicle.id,
        assignees: get(data, 'assignees', []).map((assignnee) => assignnee.id),
        comlpain: data.comlpain,
        completionOfWork: data.completionOfWork,
        // lineItems: data.lineItems,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
    };

    const result = await api.post(ENDPOINTS.JOB_ORDERS, { data: payload }).then(thenCallbackRQ);
    return result;
};

export const getJobOrder = async (ctx) => {
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

    const { queryKey } = ctx;
    const [, id] = queryKey;

    const result = await api.get(`${ENDPOINTS.JOB_ORDERS}/${id}?${query}`).then(thenCallbackRQ);

    return result;
};

export const getJobOrders = async (ctx) => {
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

export const putJobOrderLineItems = async (jobOrderId, data, prevLineItems) => {
    console.log('prevItems', prevLineItems);
    const removedItems = prevLineItems.filter(
        (prevLineItem) => !data.map((lineItem) => lineItem.id).includes(prevLineItem.id),
    );

    const promises1 = data
        .filter(
            (lineItem) => !removedItems.map((removedItem) => removedItem.id).includes(lineItem.id),
        )
        .map(({ id, ...payload }) => {
            if (!!id) {
                return api
                    .put(`${ENDPOINTS.LINE_ITEMS}/${id}`, {
                        data: { jobOrder: jobOrderId, ...payload },
                    })
                    .then(thenCallbackRQ);
            }
            return api
                .post(ENDPOINTS.LINE_ITEMS, { data: { jobOrder: jobOrderId, ...payload } })
                .then(thenCallbackRQ);
        });

    const promises2 = removedItems.map((data) => api.delete(`${ENDPOINTS.LINE_ITEMS}/${data.id}`));
    const result = await Promise.allSettled([...promises1, ...promises2]);

    return result.filter((p) => p.status === 'fulfilled');
};

export const putJobOrder = async ({ id, ...data }) => {
    let payload = {
        // vehicle: data.vehicle.id,
        assignees: get(data, 'assignees', []).map((assignnee) => assignnee.id),
        comlpain: data.comlpain,
        diagnosis: data.diagnosis,
        completionOfWork: data.completionOfWork,
        // lineItems: putJobOrderLineItems(data.lineItems),
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
    };

    if (!data.verified) {
        payload.verified = true;
        payload.verifiedDate = new Date();
        if (data.status === 'new') {
            payload.status = 'processing';
        }
    }

    if (!data.verified && data.status === 'cancelled') {
        payload = payload.status = { status: 'cancelled' };
    } else {
        await putJobOrderLineItems(id, data.lineItems, data.prevLineItems);
    }

    const result = await api
        .put(`${ENDPOINTS.JOB_ORDERS}/${id}`, { data: payload })
        .then(thenCallbackRQ);

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
