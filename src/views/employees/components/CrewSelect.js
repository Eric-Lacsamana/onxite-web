import React, { useImperativeHandle, useState, useCallback, useEffect } from 'react';

// import PropTypes from 'prop-types';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { debounce } from 'lodash';
import { getEmployees } from '../employees.fetch';
import PropTypes from 'prop-types';

import { useDebouncedEffect } from 'src/utils/useDebounce';
import { useQuery } from 'react-query';

const CrewSelect = ({ onChange, defaultValues }) => {
    const [options, setOptions] = useState([]);

    const {
        data: crews,
        // isFetching,
        isLoading,
        // refetch,
    } = useQuery(['job-orders', {}], getEmployees, {
        placeholderData: [],
        // enabled:,
        onSuccess: (data) => {
            setOptions(
                data.map((d) => {
                    return {
                        value: d.id,
                        label: `${d.firstName} ${d.lastName}`,
                    };
                }),
            );
        },
        // onError: (err) => {
        //     setConfirmationModal({
        //         message: err.message,
        //         visible: true,
        //     });
        // },
    });

    // useDebouncedEffect(
    //     async () => {
    //         // if (!value) return;
    //         const query = { _q: value };

    //         refetch();

    //         if (crews.length) {
    //             setOptions(
    //                 crews.map((d) => {
    //                     return {
    //                         value: d.id,
    //                         label: `${d.firstName} ${d.lastName}`,
    //                     };
    //                 }),
    //             );
    //         }

    //         // setSelected();
    //     },
    //     [value],
    //     1000,
    // );

    const handleOnChange = (data) => {
        const selected = crews.filter((crew) =>
            data.map((d) => d.value === crew.id).includes(true),
        );

        onChange(selected);
    };

    return (
        <Select
            closeMenuOnSelect={false}
            isMulti
            isLoading={isLoading}
            value={options.filter((opt) =>
                defaultValues.map((d) => d.id === opt.value).includes(true),
            )}
            onChange={handleOnChange}
            options={options}
        />
    );
};

CrewSelect.propTypes = {
    onChange: PropTypes.func,
    defaultValues: PropTypes.array,
};

CrewSelect.defaultProps = {
    defaultValues: [],
    onChange: () => {},
};

export default CrewSelect;
