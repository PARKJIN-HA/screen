import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// 로컬라이저 설정
const localizer = momentLocalizer(moment);

// 예제 이벤트 데이터
const myEvents = [
  {
    title: 'Big Meeting',
    allDay: true,
    start: new Date(2024, 3, 0), // 주의: 월은 0부터 시작합니다. 3은 4월을 의미합니다.
    end: new Date(2024, 3, 1),
  },
  {
    title: 'Vacation',
    start: new Date(2024, 3, 7),
    end: new Date(2024, 3, 10),
  },
  {
    title: 'Conference',
    start: new Date(2024, 3, 20),
    end: new Date(2024, 3, 23),
  },
];

function MyCalendar() {
  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default MyCalendar;
