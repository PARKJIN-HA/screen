import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Container, Grid, Stack} from "@mui/material";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment/moment";
import TodoComp from "@component/TodoComp";
import GanttChart from "@component/GanttComp";
import Box from "@mui/material/Box";
import "../public/css/main.css";

export default function Main() {
    const localizer = momentLocalizer(moment);

    let now = moment().toDate().toLocaleDateString();

    const [dateValue, setDateValue] = useState(moment);
    const [ganttData, setGanttData] = useState(null);
    const clickRef = useRef(null);


    const onSelectSlot = useCallback((slotInfo) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            setDateValue(moment(slotInfo.start))
        }, 100)
    }, [])

    const onNavigate = useCallback((newDate) => setDateValue(moment(newDate)), [setDateValue])

    useEffect(() => {
        const fetchData = async () => {
            // Simulate async data loading
            const tasks = [
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
            setGanttData(tasks);
        };

        fetchData();
    }, []);

    return (
        <div style={{height: "calc(100vh - 64px)"}}>
            <Grid container spacing={2} padding={3} height={"100%"}>
                <Grid item xs={4}>
                    <Stack
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={2}
                        style={{height: "100%"}}
                    >
                        <div style={{width: "80%", height: "40%"}}>
                            <Box sx={{
                                height: "20%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                fontSize: "2em",
                                border: "black solid 1px",
                                paddingX: "1em",
                                color: "var(--white)",
                                backgroundColor: "var(--primary-color)"
                            }}>
                                Today's To-Do
                            </Box>
                            <TodoComp date={now} todoList={[0, 1, 2, 3]} size={12} boxExisted={false}/>
                        </div>
                        <div style={{width: "80%", height: "60%"}}>
                            <Calendar
                                localizer={localizer}
                                views={['month']}
                                toolbar={true}
                                onNavigate={onNavigate}
                                onSelectSlot={onSelectSlot}
                                selectable
                                date={dateValue}
                                dayPropGetter={date => (moment(date).format('DD') === moment(dateValue).format('DD')) && ({className: 'rbc-selected-day'})}
                            />
                        </div>
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    <Box
                        width={"100%"}
                        height={"100%"}
                        display={"flex"}
                        flexDirection={"column"}>
                        <Box className={"gantt-head"} height={100} display={"flex"} justifyContent={"flex-start"}
                             alignItems={"center"} fontSize={"2em"} paddingLeft={"2em"}>
                            Working Process
                        </Box>
                        {ganttData ? <GanttChart tasks={ganttData}/> : 'Loading...'}
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}