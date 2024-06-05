import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Accordion, AccordionDetails, AccordionSummary, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import FormDialog from "@component/CalDialog";
import Box from "@mui/material/Box";
import {ExpandMore} from "@mui/icons-material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import {useSearchParams} from "react-router-dom";

// 로컬라이저 설정
const localizer = momentLocalizer(moment);

// 예제 이벤트 데이터
const myEvents = [
    {
        title: 'Big Meeting',
        allDay: true,
        start: new Date(2024, 3, 0),
        end: new Date(2024, 3, 1),
        resourceId: 'r1',
    },
    {
        title: 'Vacation',
        allDay: true,
        start: new Date(2024, 3, 7),
        end: new Date(2024, 3, 10),
    },
    {
        title: 'Conference',
        allDay: true,
        start: new Date(2024, 3, 20),
        end: new Date(2024, 3, 23),
    },
];

function MyCalendar() {
    const [items, setItems] = useState([]);
    const [checked, setChecked] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultDate = searchParams.get("date");
    const [dateValue, setDateValue] = useState(moment(defaultDate || new Date()));
    const [smallDateValue, setSmallDateValue] = useState(moment());
    const clickRef = useRef(null);

    // Fetch items from API
    useEffect(() => {
        fetch('http://localhost:9000/api/items')  // Replace with your API endpoint
            .then(response => {
                setItems(response.data);
                setChecked(new Array(response.data.length).fill(false));
            })
            .catch(error => {
                setItems(["1번 그룹", "2번 그룹", "3번 그룹"]);
                setChecked(new Array(items.length).fill(false));
                console.error('Error fetching items:', error);
            });
    }, [setItems, setChecked]);

    useEffect(() => {
        setSmallDateValue(moment(dateValue).subtract(1, 'month').startOf('month'))
    }, [dateValue]);

    const handleChange = (event, index) => {
        const newChecked = [...checked];
        newChecked[index] = event.target.checked;
        setChecked(newChecked);
    };
    const onSelectSlot = useCallback((slotInfo) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            setDateValue(moment(slotInfo.start))
        }, 100)
    }, [])

    const onNavigate = useCallback((newDate) => setDateValue(moment(newDate)), [setDateValue])
    const onSmallNavigate = useCallback((newDate) => {
        setSmallDateValue(moment(newDate))
        setDateValue(moment(newDate).add(1, 'month'))
    }, [setSmallDateValue])

    const eventPropGetter = useCallback(
        (event, start, end, isSelected) => ({
            ...(event.resourceId === "r1" && {
                style: {
                    backgroundColor: '#000',
                },
            }),
        }),
        []
    )

    const addGroup = () => {
        setItems([...items, `${items.length + 1}번 그룹`]);
        setChecked([...checked, false]);
    }

    return (
        <div style={{display: "flex", height: "calc(100vh - 64px)"}}>
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
                        date={smallDateValue}
                        onNavigate={onSmallNavigate}
                        toolbar={true}
                        views={['month']}
                        eventPropGetter={eventPropGetter}
                        style={{width: '100%', height: "30%"}}
                        className="rbc-small-cal"
                    />
                    <Box style={{height: "60%"}}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                그룹 관리
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container display={"flex"} flexDirection={"column"}>
                                    {items.length > 0 && (
                                        items.map((item, index) => (
                                            <FormControlLabel
                                                key={index}
                                                label={item}
                                                control={
                                                    <Checkbox/>
                                                }
                                            />
                                        ))
                                    )}
                                    <Button onClick={addGroup}>그룹 추가</Button>
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
                        eventPropGetter={eventPropGetter}
                        style={{width: '100%', height: "100%"}}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default MyCalendar;
