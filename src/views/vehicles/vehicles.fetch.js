import { ENDPOINTS } from 'src/constants/api';
import { thenCallbackRQ } from 'src/utils/helpers';
import api from 'src/utils/api';
import { get } from 'lodash';
const qs = require('qs');

export const postVehicleRequest = async (data) => {
    const payload = {
        vehicle: get(data, 'vehicle.id'),
        complain: data.complain,
        // status: data.status,
    };

    const result = await api.post(ENDPOINTS.JOB_ORDERS, { data: payload }).then(thenCallbackRQ);

    return result;
};

export const getVehicles = async (ctx) => {
    const { queryKey } = ctx;
    const [, params] = queryKey;

    const query = qs.stringify(
        {
            // sort: ['title:asc'],
            filters: { client: 1 },
            populate: '*',
            // fields: ['title'],
            // pagination: {
            //     // start: 0,
            //     // limit: 1,
            //     pageSize: 1,
            //     page: 1,
            // },
            publicationState: 'live',
            // locale: ['en'],
        },
        {
            encodeValuesOnly: true, // prettify url
        },
    );

    const result = await api.get(`${ENDPOINTS.VEHICLES}?${query}`).then(thenCallbackRQ);

    return result;
};

export const putVehicleRequest = async (id, data) => {
    const payload = {
        verified: true,
    };

    const result = await api
        .put(`${ENDPOINTS.JOB_ORDERS}/${id}`, { data: payload })
        .then(thenCallbackRQ);
    return result;
};
