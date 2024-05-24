import React from 'react';
import { Chart } from 'react-google-charts';

const GanttChart = ({ data }) => {
    const today = new Date();

    const options = {
        height: 400,
        gantt: {
            trackHeight: 30,
        },
    };

    const calculateTodayPosition = () => {
        const startDate = new Date(2023, 4, 1);
        const endDate = new Date(2023, 4, 15);
        const position = ((today - startDate) / (endDate - startDate)) * 100;
        return position;
    };

    const todayPosition = calculateTodayPosition();

    const todayStyle = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${todayPosition}%`,
        width: '2px',
        backgroundColor: 'red',
        zIndex: 1,
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <Chart
                chartType="Gantt"
                width="100%"
                height="100%"
                data={data}
                options={options}
            />
            <div style={todayStyle}></div>
        </div>
    );
};

export default GanttChart;
