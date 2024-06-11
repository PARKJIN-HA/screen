import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Container, Grid, Stack} from "@mui/material";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment/moment";
import TodoComp from "@component/TodoComp";
import GanttChart from "@component/GanttComp";
import Box from "@mui/material/Box";
import "../public/css/main.css";
import {navigate} from "react-big-calendar/lib/utils/constants";
import {useNavigate} from "react-router-dom";

export default function Main() {
    const localizer = momentLocalizer(moment);

    let now = moment().toDate().toLocaleDateString();

    const [dateValue, setDateValue] = useState(moment);
    const [ganttData, setGanttData] = useState(null);
    const clickRef = useRef(null);
    const navigate = useNavigate();

    const onSelectSlot = useCallback((slotInfo) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            setDateValue(moment(slotInfo.start))
            navigate(`/calendar?date=${moment(slotInfo.start).format('YYYY-MM-DD')}`, {replace: true});
        }, 100)
    }, [])

    const onNavigate = useCallback((newDate) => {
        setDateValue(moment(newDate))
        navigate(`/calendar?date=${moment(newDate).format('YYYY-MM-DD')}`, {replace: true});
    }, [setDateValue])

    const onTaskClick = (task) => {
        navigate(`/gantt`, {replace: true});
    }

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
                setGanttData(data);
            })
    }, []);

    return (
        <div style={{height: "calc(100vh - 64px)"}}>
            <Grid container spacing={2} padding={3} height={"100%"}>
                <Grid item xs={4} style={{height:"100%"}}>
                    <Stack
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={2}
                        style={{height: "100%"}}
                    >
                        <div style={{
                            width: "80%", height: "40%",
                            border: "black solid 1px",
                        }}>
                            <Box sx={{
                                height: "19%",
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
                            <TodoComp date={now}
                                      size={12}
                                      boxExisted={false}
                                      onClick={() => {
                                          navigate(`/todo`, {replace: true});
                                      }}
                            />
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
                <Grid item xs={8} style={{height:"100%"}}>
                    <Box
                        width={"100%"}
                        height={"100%"}
                        display={"flex"}
                        flexDirection={"column"}>
                        <Box className={"gantt-head"} height={100} display={"flex"} justifyContent={"flex-start"}
                             alignItems={"center"} fontSize={"2em"} paddingLeft={"2em"}>
                            Working Process
                        </Box>
                        {ganttData ? <GanttChart tasks={ganttData} onTaskClick={onTaskClick} height={"90%"}/> : 'Loading...'}
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}