import React, {useEffect, useState} from 'react';
import GanttChart from "../component/GanttComp";
import Box from "@mui/material/Box";
import Sidebar from "@component/GanttSide";
import moment from "moment";
import TaskDialog from "@component/GanttTaskDialog";

export default function Gantt() {
    const initialTasks = [
        {
            title: 'Task 1',
            start: '2024-06-01',
            end: '2024-06-05',
            editTime: '2024-05-02T12:00',
            progress: 50,
            alarmTime: '2024-05-04T10:00'
        },
        {
            title: 'Task 2',
            start: '2024-06-03',
            end: '2024-06-08',
            editTime: '2024-05-04T09:00',
            progress: 30,
            alarmTime: '2024-05-07T14:00'
        },
        {
            title: 'Task 3',
            start: '2024-06-07',
            end: '2024-06-10',
            editTime: '2024-05-08T16:00',
            progress: 70,
            alarmTime: '2024-05-09T08:00'
        }
    ];
    const [tasks, setTasks] = useState(initialTasks);
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment().add(7, "days"));
    const [selectedTask, setSelectedTask] = useState(null);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        fetch('http://localhost:9000/api/gantt', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                setTasks(data);
            })
    }, [])

    const handleDateChange = (field, value) => {
        if (field === 'start') setStartDate(value);
        if (field === 'end') setEndDate(value);
    };

    const handleAddTask = () => {
        const newTask = {
            title: `New Task ${tasks.length + 1}`,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            progress: 0,
            lastEditTime: moment().toISOString()
        };
        console.log(newTask);
        fetch("http://localhost:9000/api/gantt", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(newTask)
        }).then(response => response.json())
            .then(data => console.log(data));
        setTasks([...tasks, newTask]);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setOpen(true);
    };

    const handleSaveTask = async (updatedTask) => {
        try {
            console.log(updatedTask);
            const response = await fetch(`http://localhost:9000/api/gantt/${updatedTask.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(updatedTask)
            });
            const data = await response.json();
            // console.log(data);
            setTasks(tasks.map(task => task.id === data.id ? data : task));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedTask(null);
    };

    return (
        <Box sx={{display: 'flex', height: "calc(-64px + 100vh)"}}>
            <GanttChart tasks={tasks} onTaskClick={handleTaskClick}/>
            <Sidebar
                tasks={tasks}
                startDate={startDate}
                endDate={endDate}
                onDateChange={handleDateChange}
                onAddTask={handleAddTask}
            />
            <TaskDialog open={open} handleClose={handleClose} task={selectedTask} onSave={handleSaveTask} />
        </Box>
    )
}