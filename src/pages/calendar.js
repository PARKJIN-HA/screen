import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Accordion, AccordionDetails, AccordionSummary, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import FormDialog from "@component/CalDialog";
import Box from "@mui/material/Box";
import {Add, ExpandMore, PlusOne, Settings} from "@mui/icons-material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import {useSearchParams} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import GroupAddDialog from "@component/GroupAddDialog";
import IconButton from "@mui/material/IconButton";
import TaskDialog from "@component/GanttTaskDialog";
import GroupSetDialog from "@component/GroupSetDialog";

// 로컬라이저 설정
const localizer = momentLocalizer(moment);

// 예제 이벤트 데이터
const myEvents = [
    {
        title: 'Big Meeting',
        allDay: true,
        start: new Date(2024, 5, 0),
        end: new Date(2024, 5, 1),
        resourceId: 'r1',
    },
    {
        title: 'Vacation',
        allDay: true,
        start: new Date(2024, 5, 7),
        end: new Date(2024, 5, 10),
    },
    {
        title: 'Conference',
        allDay: true,
        start: new Date(2024, 5, 20),
        end: new Date(2024, 5, 23),
    },
];

function MyCalendar() {
    const [groups, setGroups] = useState([]);
    const [checked, setChecked] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultDate = searchParams.get("date");
    const [dateValue, setDateValue] = useState(moment(defaultDate || new Date()));
    const [smallDateValue, setSmallDateValue] = useState(moment());
    const clickRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [grpAddOpen, setGrpAddOpen] = useState(false);
    const [grpSetOpen, setGrpSetOpen] = useState(false);
    const [selectedGrp, setSelectedGrp] = useState(null);
    const [events, setEvents] = useState(myEvents);

    const handleGrpAddOpen = () => {
        setGrpAddOpen(true);
    }

    const handleGrpAddClose = () => {
        setGrpAddOpen(false);
    }

    const handleGrpSetOpen = () => {
        setGrpSetOpen(true);
    }

    const handleGrpSetClose = () => {
        setGrpSetOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const title = formJson.title;
        const start = moment(formJson.start).toISOString();
        const end = moment(formJson.end).toISOString();
        const location = formJson.location;
        // const description = formJson.description;
        const groupId = formJson.group;
        const document = formJson.document;

        let body = {
            title: title,
            start: start,
            end: end,
            location: location,
            // description: description,
            groupId: parseInt(groupId),
            document: document
        }

        console.log(body);

        try {
            const response = await fetch('http://localhost:9000/api/schedules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });

            if (response.ok) {
                console.log('Event saved successfully');
                const newEvent = await response.json();
                setEvents([...events, {
                    title: newEvent.title,
                    start: moment(newEvent.start),
                    end: moment(newEvent.end),
                    resourceId: newEvent.groupId
                }]);
                console.log(events);
                handleClose()
            } else {
                console.error('Failed to save event');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleGrpSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const groupName = formJson.name;

        try {
            const response = await fetch('http://localhost:9000/api/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({name: groupName})
            });

            if (response.ok) {
                const newGroup = await response.json();
                setGroups([...groups, newGroup]);
                handleGrpAddClose();
            } else {
                console.error('Failed to save group');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleGrpSetSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const groupName = formJson.name;

        try {
            const response = await fetch(`http://localhost:9000/api/groups/${selectedGrp.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({name: groupName})
            });

            if (response.ok) {
                setGroups(groups.map(group => (group.id === selectedGrp.id ? {...group, name: groupName} : group)));
                handleGrpSetClose();
            } else {
                console.error('Failed to update group');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleGrpSetDel = async () => {
        try {
            const response = await fetch(`http://localhost:9000/api/groups/${selectedGrp.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                setGroups(groups.filter(group => group.id !== selectedGrp.id));
                handleGrpSetClose();
            } else {
                console.error('Failed to delete group');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Fetch items from API
    useEffect(() => {
        fetch('http://localhost:9000/api/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch items');
            })
            .then(data => {
                console.log(data);
                setGroups(data);
                setChecked(new Array(data.length).fill(false));
            });
    }, [setGroups, setChecked]);

    useEffect(() => {
        fetch('http://localhost:9000/api/schedules', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch items');
            })
            .then(data => {
                console.log("Schedule", data);
                setEvents(data.map(event => ({
                    title: event.title,
                    start: new Date(event.start),
                    end: new Date(event.end),
                    resourceId: event.groupId
                })));
            });
    }, [setGroups, setChecked]);

    useEffect(() => {
        setSmallDateValue(moment(dateValue).subtract(1, 'month').startOf('month'))
    }, [dateValue]);

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
            ...(event.groupId === "r1" && {
                style: {
                    backgroundColor: '#000',
                },
            }),
        }),
        []
    )

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
                        <FormDialog groups={groups}
                                    open={open}
                                    handleOpen={handleOpen}
                                    handleClose={handleClose}
                                    handleSubmit={handleSubmit}/>
                    </div>
                    <Calendar
                        localizer={localizer}
                        events={events}
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
                                    {groups.length > 0 && (
                                        groups.map((item, index) => (
                                            <Box key={index} display={"flex"} flexDirection={"row"}>
                                                <FormControlLabel
                                                    value={item.id}
                                                    label={item.name}
                                                    sx={{width: "70%"}}
                                                    checked={checked[item.id]}
                                                    onChange={(e) => {
                                                        setChecked({...checked, [item.id]: e.target.checked});
                                                    }}
                                                    control={
                                                        <Checkbox/>
                                                    }
                                                />
                                                <IconButton
                                                    onClick={() => {
                                                        setSelectedGrp({id: item.id, name: item.name});
                                                        setGrpSetOpen(true);
                                                    }}
                                                >
                                                    <Settings/>
                                                </IconButton>
                                            </Box>
                                        ))
                                    )}
                                </Grid>
                                <GroupAddDialog open={grpAddOpen}
                                                handleClose={handleGrpAddClose}
                                                handleOpen={handleGrpAddOpen}
                                                handleSubmit={handleGrpSubmit}/>
                                <GroupSetDialog open={grpSetOpen}
                                                group={selectedGrp}
                                                handleClose={handleGrpSetClose}
                                                handleDelete={handleGrpSetDel}
                                                handleSubmit={handleGrpSetSubmit}/>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Calendar
                        localizer={localizer}
                        events={events}
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
