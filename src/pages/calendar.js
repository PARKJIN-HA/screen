import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Accordion, AccordionDetails, AccordionSummary, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import FormDialog from "@component/CalDialogComp";
import Box from "@mui/material/Box";
import {ExpandMore} from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

// 로컬라이저 설정
const localizer = momentLocalizer(moment);

// 예제 이벤트 데이터
const myEvents = [
    {
        title: 'Big Meeting',
        allDay: true,
        start: new Date(2024, 3, 0), // 주의: 월은 0부터 시작합니다. 3은 4월을 의미합니다.
        end: new Date(2024, 3, 1),
    },
    {
        title: 'Vacation',
        start: new Date(2024, 3, 7),
        end: new Date(2024, 3, 10),
    },
    {
        title: 'Conference',
        start: new Date(2024, 3, 20),
        end: new Date(2024, 3, 23),
    },
];

function MyCalendar() {
    const items = ['Item 1', 'Item 2', 'Item 3', /* ... */];

    // Initialize the checked state with an array of the same length, all set to false
    const [checked, setChecked] = React.useState(new Array(items.length).fill(false));

    const handleChange = (event, index) => {
        const newChecked = [...checked];
        newChecked[index] = event.target.checked;
        setChecked(newChecked);
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label={items[1]}
                control={<Checkbox checked={checked[1]} onChange={handleChange} />}
            />
            <FormControlLabel
                label={items[2]}
                control={<Checkbox checked={checked[2]} onChange={handleChange} />}
            />
        </Box>
    );

    return (
        <div style={{display: "flex", height: '90vh'}}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <div style={{width: "100%", height: "10%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <FormDialog />
                    </div>
                    <Calendar
                        localizer={localizer}
                        events={myEvents}
                        startAccessor="start"
                        endAccessor="end"
                        toolbar={true}
                        views={['month']}
                        style={{width: '100%', height: "30%"}}
                    />
                    <Box style={{height: "60%"}}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Accordion 1
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            label={items[0]}
                                            control={
                                                <Checkbox
                                                    checked={checked[2] && checked[1]}
                                                    indeterminate={checked[2] !== checked[1]}
                                                    onChange={handleChange}
                                                />
                                            }
                                        />
                                        {children}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" fullWidth>Button 2</Button>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Calendar
                        localizer={localizer}
                        events={myEvents}
                        startAccessor="start"
                        endAccessor="end"
                        views={['month']}
                        style={{width: '94%', height: "94%", margin: "3%"}}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default MyCalendar;
