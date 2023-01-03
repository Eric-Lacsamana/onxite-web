import { ENDPOINTS } from 'src/constants/api';
import { thenCallbackRQ } from 'src/utils/helpers';
import api from 'src/utils/api';

const qs = require('qs');

export const getFleet = async (ctx) => {
    const { queryKey } = ctx;
    const [, params] = queryKey;

    const query = qs.stringify(
        {
            // sort: ['title:asc'],
            filters: { client: 1 },
            populate: '*',
            // fields: ['title'],
            pagination: {
                start: 0,
                limit: 100,
            },
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
