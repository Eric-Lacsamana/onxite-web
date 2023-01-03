import React, { createRef } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import PropTypes from 'prop-types';

const Calendar = ({ data, eventClick }) => {
    return (
        <FullCalendar
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
                prevYear: 'chevrons-left', // double chevron
                nextYear: 'chevrons-right', // double chevron
            }}
            themeSystem="bootstrap5"
            events={data}
            eventClick={eventClick}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventsSet={(data) => console.log('event', data)}
            // weekends={this.state.weekendsVisible}
            // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            // select={this.handleDateSelect}
            // eventContent={
            //     <>
            //         <b>Event:</b>
            //         {/* <i>desc: </i> */}
            //     </>
            // } // custom render function
            // eventClick={this.handleEventClick}
            // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
        */
        />
    );
};

Calendar.propTypes = {
    data: PropTypes.array,
    eventClick: PropTypes.func,
};

Calendar.defaultProps = {
    data: [],
    eventClick: () => {},
};

export default Calendar;
