import { get } from 'lodash';
import { ENDPOINTS } from 'src/constants/api';
import { thenCallbackRQ } from 'src/utils/helpers';
import api from 'src/utils/api';

const qs = require('qs');

export const postInvoice = async (data) => {
    const payload = {
        jobOrder: data.jobOrder,
        client: data.client,
        // lineItems: get(data, 'lineItems', []).map((lineItem) => lineItem.id),
    };

    const result = await api.post(ENDPOINTS.INVOICES, { data: payload }).then(thenCallbackRQ);
    return result;
};

export const getInvoice = async (ctx) => {
    const query = qs.stringify(
        {
            // sort: ['title:asc'],
            // filters: params,

            populate: {
                client: {
                    populate: '*',
                },
                lineItems: {
                    populate: '*',
                },
                jobOrder: {
                    populate: '*',
                },
            },
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
    console.log('id', id);
    const result = await api.get(`${ENDPOINTS.INVOICES}/${id}?${query}`).then(thenCallbackRQ);

    return result;
};

export const getInvoices = async (ctx) => {
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

    const result = await api.get(`${ENDPOINTS.INVOICES}?${query}`).then(thenCallbackRQ);

    return result;
};
