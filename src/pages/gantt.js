import React, {useEffect, useState} from 'react';
import GanttChart from "../component/GanttComp";
import Box from "@mui/material/Box";
import Sidebar from "@component/GanttSide";
import moment from "moment";
import dayjs from "dayjs";

export default function Gantt() {
    const initialTasks = [
        {
            name: 'Task 1',
            start: '2024-05-01',
            end: '2024-05-05',
            editTime: '2024-05-02T12:00',
            completePercentage: 50,
            alarmTime: '2024-05-04T10:00'
        },
        {
            name: 'Task 2',
            start: '2024-05-03',
            end: '2024-05-08',
            editTime: '2024-05-04T09:00',
            completePercentage: 30,
            alarmTime: '2024-05-07T14:00'
        },
        {
            name: 'Task 3',
            start: '2024-05-07',
            end: '2024-05-10',
            editTime: '2024-05-08T16:00',
            completePercentage: 70,
            alarmTime: '2024-05-09T08:00'
        }
    ];
    const [tasks, setTasks] = useState(initialTasks);
    const [startDate, setStartDate] = useState(dayjs('2024-05-01'));
    const [endDate, setEndDate] = useState(dayjs('2024-05-10'));

    const handleDateChange = (field, value) => {
        if (field === 'start') setStartDate(value);
        if (field === 'end') setEndDate(value);
    };

    const handleAddTask = () => {
        const newTask = {
            name: `New Task ${tasks.length + 1}`,
            start: startDate.toISOString().split('T')[0],
            end: endDate.toISOString().split('T')[0],
            completePercentage: 0,
            color: 'blue'
        };
        setTasks([...tasks, newTask]);
    };

    return (
        <Box sx={{display: 'flex', height: "calc(-64px + 100vh)"}}>
            <GanttChart tasks={tasks}/>
            <Sidebar
                tasks={tasks}
                startDate={startDate}
                endDate={endDate}
                onDateChange={handleDateChange}
                onAddTask={handleAddTask}
            />
        </Box>
    )
}