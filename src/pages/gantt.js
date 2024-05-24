import React, {useEffect, useState} from 'react';
import GanttComp from '../component/GanttComp';
import GanttChart from "../component/GanttComp";

export default function Gantt() {

    const [ganttData, setGanttData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Simulate async data loading
            const tasks = [
                [
                    { type: 'string', label: 'Task ID' },
                    { type: 'string', label: 'Task Name' },
                    { type: 'date', label: 'Start Date' },
                    { type: 'date', label: 'End Date' },
                    { type: 'number', label: 'Duration' },
                    { type: 'number', label: 'Percent Complete' },
                    { type: 'string', label: 'Dependencies' },
                ],
                [
                    'Task1',
                    'Task 1',
                    new Date(2023, 4, 1),
                    new Date(2023, 4, 5),
                    null,
                    100,
                    null,
                ],
                [
                    'Task2',
                    'Task 2',
                    new Date(2023, 4, 6),
                    new Date(2023, 4, 10),
                    null,
                    50,
                    'Task1',
                ],
                [
                    'Task3',
                    'Task 3',
                    new Date(2023, 4, 11),
                    new Date(2023, 4, 15),
                    null,
                    0,
                    'Task2',
                ],
            ];
            setGanttData(tasks);
        };

        fetchData().then(r => console.log("Gantt data fetched"));
    }, []);

    return (
        <div>
            {ganttData ? <GanttChart data={ganttData} /> : 'Loading...'}
        </div>
    )
}