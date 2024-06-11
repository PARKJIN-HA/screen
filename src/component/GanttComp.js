import React, {useCallback, useEffect, useRef, useState} from 'react';
import '../public/css/ganttchart.css';
import moment from 'moment';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {ChevronLeft} from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const GanttChart = ({tasks, onTaskClick, height = "100%"}) => {
    // const chartStartDate = moment().subtract(1, 'days');
    // const chartEndDate = moment().add(13, 'days');
    const [chartStartDate, setChartStartDate] = useState(moment().subtract(1, 'days'));
    const [chartEndDate, setChartEndDate] = useState(moment().add(13, 'days'));
    const chartDays = chartEndDate.diff(chartStartDate, 'days');
    const parentRef = useRef(null);

    const getDayOffset = (date) => moment(date).startOf('day').diff(chartStartDate.startOf('day'), 'days');

    const [skeletonRows, setSkeletonRows] = useState([]);

    const updateSkeletonRows = useCallback(() => {
        const rowHeight = 40; // Height of each task row
        const parentHeight = parentRef.current ? parentRef.current.clientHeight : window.innerHeight;
        const headerHeight = 70; // Approximate height of the header
        const tasksHeight = tasks.length * rowHeight;
        const remainingHeight = parentHeight - headerHeight - tasksHeight - 100;
        const numberOfSkeletonRows = Math.max(Math.floor(remainingHeight / rowHeight), 0);

        setSkeletonRows([...Array(numberOfSkeletonRows).keys()].map((_, index) => (
            <tr key={`skeleton-${index}`}>
                <td className="gantt-task-name skeleton-cell"></td>
                {[...Array(chartDays).keys()].map(day => (
                    <td key={day} className="gantt-task-cell skeleton-cell"></td>
                ))}
            </tr>
        )));
    }, [tasks, chartDays]);

    useEffect(() => {
        updateSkeletonRows();
        window.addEventListener('resize', updateSkeletonRows);
        return () => window.removeEventListener('resize', updateSkeletonRows);
    }, [updateSkeletonRows]);

    return (
        <Box display="flex" flexDirection={"column"} width={"100%"} height={height}>
            <Box className={"gantt-header"}>
                <IconButton className={"gantt-header-icon"} onClick={() => {
                    setChartStartDate(moment(chartStartDate).subtract(1, 'week'));
                    setChartEndDate(moment(chartEndDate).subtract(1, 'week'));
                }}>
                    <ChevronLeftIcon />
                </IconButton>
                <div className={"gantt-header-title"}>
                    {chartStartDate.format('MM/DD')} - {chartEndDate.format('MM/DD')}
                </div>
                <IconButton className={"gantt-header-icon"} onClick={() =>{
                    setChartStartDate(moment(chartStartDate).add(1, 'week'));
                    setChartEndDate(moment(chartEndDate).add(1, 'week'));
                }}>
                    <ChevronRightIcon />
                </IconButton>
            </Box>
            <div className="gantt-chart">
                <table className="gantt-chart-table">
                    <thead>
                    <tr>
                        <th className="gantt-task-name-header">Task</th>
                        {[...Array(chartDays).keys()].map(day => (
                            <th key={day} className="gantt-chart-day">
                                {moment(chartStartDate).add(day, 'days').format('MM/DD')}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task, index) => {
                        let taskOffset = getDayOffset(task.start);
                        const taskDuration = getDayOffset(task.end) - taskOffset + 1;
                        const taskCompleteDays = Math.floor((taskDuration * task.progress) / 100);
                        // console.log(task.start, task.end, taskOffset, taskDuration, taskCompleteDays);
                        return (
                            <tr key={index}>
                                <td className="gantt-task-name">{task.title}</td>
                                {[...Array(chartDays).keys()].map(day => {
                                    const isTaskDay = day >= taskOffset && day < taskOffset + taskDuration;
                                    const isCompleteDay = day >= taskOffset && day < taskOffset + taskCompleteDays;
                                    return (
                                        <td
                                            key={day}
                                            className={`gantt-task-cell ${isTaskDay ? 'task-day' : ''}`}
                                            style={{
                                                backgroundColor: isCompleteDay ? 'rgba(0, 128, 0, 0.5)' :
                                                    isTaskDay ? 'rgba(0, 128, 0, 0.1)' : 'transparent'
                                            }}
                                            onClick={() => {
                                                if (isTaskDay) {
                                                    onTaskClick(task);
                                                    console.log('Clicked on', task.title, 'on', moment(chartStartDate).add(day, 'days').format('MM/DD'));
                                                }
                                            }}
                                        >
                                            {isTaskDay && day === taskOffset && (
                                                <div className="gantt-task-inner">
                                                    {task.progress}%
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    {skeletonRows}
                    </tbody>
                </table>
            </div>
        </Box>
    );
};

export default GanttChart;
