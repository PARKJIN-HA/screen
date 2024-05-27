import React from 'react';
import '../public/css/ganttchart.css';
import moment from "moment";

const GanttChart = ({ tasks }) => {
    const chartStartDate = moment('2024-02-08');
    const chartEndDate = moment('2024-02-24');
    const chartDays = chartEndDate.diff(chartStartDate, 'days');

    const getDayOffset = (date) => moment(date).diff(chartStartDate, 'days');

    return (
        <div className="gantt-chart" style={{width: "100%", height: "90%"}}>
            <div className="gantt-chart-header">
                {[...Array(chartDays).keys()].map(day => (
                    <div key={day} className="gantt-chart-day">
                        {moment(chartStartDate).add(day, 'days').format('MM/DD')}
                    </div>
                ))}
            </div>
            <div className="gantt-chart-body">
                {tasks.map((task, index) => {
                    const taskOffset = getDayOffset(task.start);
                    const taskDuration = getDayOffset(task.end) - taskOffset;
                    return (
                        <div key={index} className="gantt-task" style={{
                            left: `${(taskOffset / chartDays) * 100}%`,
                            width: `${(taskDuration / chartDays) * 100}%`
                        }}>
                            <div className="gantt-task-inner" style={{width: `${task.completePercentage}%`}}>
                                {task.name}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export default GanttChart;