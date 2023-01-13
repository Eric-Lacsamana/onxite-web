import React, { createRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import PropTypes from 'prop-types';
import moment from 'moment';

const Calendar = ({ initialDate, data, eventClick }) => {
    const [startingViewDate, setStartingViewDate] = useState(initialDate);
    const [endingViewDate, setEndingViewDate] = useState(initialDate);

    const handleViewDates = (d) => {
        setStartingViewDate(d.start);
        setEndingViewDate(d.end);
    };

    return (
        <>
            <h6>
                {moment(startingViewDate).format('LL')} - {moment(endingViewDate - 1).format('LL')}
            </h6>
            <FullCalendar
                initialDate={initialDate}
                datesSet={handleViewDates}
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                    bootstrap5Plugin,
                ]}
                headerToolbar={{
                    start: 'title',
                    left: 'prev,next today',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,+list',
                }}
                buttonIcons={{
                    prev: 'chevron-left',
                    next: 'chevron-right',
                    prevYear: 'chevrons-left',
                    nextYear: 'chevrons-right',
                }}
                themeSystem="bootstrap5"
                events={data}
                eventClick={eventClick}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
            />
        </>
    );
};

Calendar.propTypes = {
    data: PropTypes.array,
    initialDate: PropTypes.object,
    eventClick: PropTypes.func,
};

Calendar.defaultProps = {
    data: [],
    initialDate: new Date(),
    eventClick: () => {},
};

export default Calendar;
