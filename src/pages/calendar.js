import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Accordion, AccordionDetails, AccordionSummary, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import FormDialog from "@component/CalDialogComp";
import Box from "@mui/material/Box";
import {ExpandMore} from "@mui/icons-material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";

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
    const [items, setItems] = useState([]);
    const [checked, setChecked] = useState([]);
    const [dateValue, setDateValue] = useState(moment);
    const clickRef = useRef(null);

    // Fetch items from API
    useEffect(() => {
        fetch('http://localhost:9000/api/items')  // Replace with your API endpoint
            .then(response => {
                setItems(response.data);
                setChecked(new Array(response.data.length).fill(false));
            })
            .catch(error => {
                setItems(["Items 1", "Items 2", "Items 3"]);
                setChecked(new Array(items.length).fill(false));
                console.error('Error fetching items:', error);
            });
    }, [setItems, setChecked]);

    const handleChange = (event, index) => {
        const newChecked = [...checked];
        newChecked[index] = event.target.checked;
        setChecked(newChecked);
    };

    const handleParentChange = (event) => {
        const newChecked = checked.map(() => event.target.checked);
        setChecked(newChecked);
    };

    const determineIndeterminate = () => {
        return checked.some((item) => item) && !checked.every((item) => item);
    };

    const onSelectSlot = useCallback((slotInfo) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            setDateValue(moment(slotInfo.start))
        }, 100)
    }, [])

    const onNavigate = useCallback((newDate) => setDateValue(moment(newDate)), [setDateValue])

    return (
        <div style={{display: "flex",  height: "calc(100vh - 64px)"}}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <div style={{
                        width: "100%",
                        height: "10%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <FormDialog/>
                    </div>
                    <Calendar
                        localizer={localizer}
                        events={myEvents}
                        startAccessor="start"
                        endAccessor="end"
                        toolbar={false}
                        views={['month']}
                        onNavigate={onNavigate}
                        onSelectSlot={onSelectSlot}
                        selectable
                        date={dateValue}
                        dayPropGetter={date => (moment(date).format('DD') === moment(dateValue).format('DD')) && ({className: 'rbc-selected-day'})}
                        style={{width: '100%', height: "30%"}}
                    />
                    <Box style={{height: "60%"}}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Accordion 1
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container display={"flex"} flexDirection={"column"}>
                                    {items.length > 0 && (
                                        <FormControlLabel
                                            label={items[0]}
                                            control={
                                                <Checkbox
                                                    checked={checked.every((item) => item)}
                                                    indeterminate={determineIndeterminate()}
                                                    onChange={handleParentChange}
                                                />
                                            }
                                        />
                                    )}
                                    <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                                        {items.slice(1).map((item, index) => (
                                            <FormControlLabel
                                                key={index + 1}
                                                label={item}
                                                control={
                                                    <Checkbox
                                                        checked={checked[index + 1]}
                                                        onChange={(e) => handleChange(e, index + 1)}
                                                    />
                                                }
                                            />
                                        ))}
                                    </Box>
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
                        toolbar={true}
                        views={['month']}
                        onNavigate={onNavigate}
                        onSelectSlot={onSelectSlot}
                        selectable
                        date={dateValue}
                        dayPropGetter={date => (moment(date).format('DD') === moment(dateValue).format('DD')) && ({className: 'rbc-selected-day'})}
                        style={{width: '100%', height: "100%"}}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default MyCalendar;
