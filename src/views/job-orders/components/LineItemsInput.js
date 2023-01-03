import { CButton, CCol, CFormInput, CListGroup, CListGroupItem, CRow } from '@coreui/react';
import React, { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { get } from 'lodash';
import PropTypes from 'prop-types';

const LineItemsInput = ({ control, register, type }) => {
    const [item, setItem] = useState({
        name: '',
        quantity: 0,
        cost: 0,
        type,
    });
    const {
        fields: lineItems,
        update: updateLineItem,
        append: appendLineItem,
        remove: removeLineItem,
    } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'lineItems', // unique name for your Field Array
    });

    const handleAddLineItem = () => {
        appendLineItem(item);

        setItem({
            name: '',
            quantity: 0,
            cost: 0,
            type,
        });
    };

    const handleItemChange = (e) => {
        setItem((data) => ({ ...data, [e.target.name]: e.target.value }));
    };

    return (
        <CListGroup>
            {lineItems
                .filter((lineItem) => lineItem.type === type)
                .map((lineItem, index) => (
                    <CListGroupItem component="a" key={get(lineItem, 'id')}>
                        <CRow>
                            <CCol>
                                <div>
                                    <span>{get(lineItem, 'name')}</span>
                                    {' - '}
                                    <span>
                                        {type === 'materials' ? 'x' : null}
                                        <strong>{get(lineItem, 'quantity')}</strong>
                                        {type === 'services' ? 'hrs' : null}
                                    </span>
                                </div>
                            </CCol>
                            <CCol xxl={1}>
                                <div style={{ cursor: 'pointer' }}>
                                    <FaTrash onClick={() => removeLineItem(index)} />
                                </div>
                            </CCol>
                        </CRow>
                    </CListGroupItem>
                ))}
            <CListGroupItem component="a">
                <CRow xxl={{ cols: 4, gutterX: 1 }}>
                    <CCol xxl={5}>
                        <div className="">
                            <CFormInput
                                placeholder="Item Name"
                                id="name"
                                onChange={handleItemChange}
                                min={0}
                                name="name"
                                value={item.name}
                                autoComplete="off"
                                aria-label="Item Name"
                            />
                        </div>
                    </CCol>
                    <CCol xxl={2}>
                        <div className="">
                            <CFormInput
                                placeholder="Qty"
                                type="number"
                                id="quantity"
                                onChange={handleItemChange}
                                min={0}
                                name="quantity"
                                value={item.quantity}
                                autoComplete="off"
                                aria-label="Qty"
                            />
                        </div>
                    </CCol>{' '}
                    <CCol xxl={3}>
                        <div>
                            <CFormInput
                                placeholder="Cost"
                                type="number"
                                id="cost"
                                onChange={handleItemChange}
                                min={0}
                                value={item.cost}
                                name="cost"
                                autoComplete="off"
                                aria-label="Cost"
                            />
                        </div>
                    </CCol>
                    <CCol xxl={2} align="right">
                        <CButton variant="outline" color="dark" onClick={handleAddLineItem}>
                            Add
                        </CButton>
                    </CCol>
                </CRow>
            </CListGroupItem>
        </CListGroup>
    );
};

LineItemsInput.propTypes = {
    control: PropTypes.object,
    register: PropTypes.func,
    type: PropTypes.string,
};

LineItemsInput.defaultProps = {
    control: {},
    register: () => {},
    type: '',
};

export default LineItemsInput;
