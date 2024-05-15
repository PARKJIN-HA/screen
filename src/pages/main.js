import React from 'react';
import {Container, Grid, Stack} from "@mui/material";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment/moment";
import TodoComp from "@component/TodoComp";
import GanttChart from "@pages/gantt";

export default function Main() {
    const localizer = momentLocalizer(moment);

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
                            <TodoComp date={"Feb 21"} todoList={[0, 1, 2, 3]} size={12} />
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
                    <GanttChart />
                </Grid>
            </Grid>
        </div>
    )
}