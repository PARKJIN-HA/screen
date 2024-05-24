import React, {useEffect, useState} from 'react';
import {Container, Grid, Stack} from "@mui/material";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment/moment";
import TodoComp from "@component/TodoComp";
import GanttChart from "@component/GanttComp";

export default function Main() {
    const localizer = momentLocalizer(moment);

    let now = moment().toDate().toLocaleDateString();

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

        fetchData();
    }, []);

    return (
        <div>
            <Grid container spacing={2} style={{height: "90vh"}}>
                <Grid item xs={4}>
                    <Stack
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={2}
                        style={{height: "100%"}}
                        >
                        <div style={{width: "80%", height: "40%"}}>
                            <TodoComp date={now} todoList={[0, 1, 2, 3]} size={12} />
                        </div>
                        <div style={{width: "80%", height: "60%"}}>
                            <Calendar
                                localizer={localizer}
                                views={['month']}
                                toolbar={true}
                            />
                        </div>
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    {ganttData ? <GanttChart data={ganttData} /> : 'Loading...'}
                </Grid>
            </Grid>
        </div>
    )
}