import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Select from 'react-select';

import { get } from 'lodash';

import { getVehicles } from '../vehicles.fetch';

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

const VehicleSelect = () => {
    const [options, setOptions] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (data) => {
        setIsLoading(true);
        // onChange(data);
        setSelectedRecord(data);
    };

    const { isFetching, refetch } = useQuery(['vehicles', {}], getVehicles, {
        placeholderData: [],
        onSuccess: (data) => setOptions(data),
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

    const renderOptions = options.map((opt) => ({
        label: `${get(opt, 'owner.name')} | ${opt.modelName} ${opt.yearModel}`,
        value: opt.id,
    }));

    return <Select options={renderOptions} placeholder="Select Vehicle" />;
};

export default VehicleSelect;
