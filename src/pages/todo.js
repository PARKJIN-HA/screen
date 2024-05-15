import React, {useCallback, useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Grid, ListItemIcon} from "@mui/material";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from 'moment'
import 'moment-timezone'
import TodoComp from "@component/TodoComp";
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import dayjs from "dayjs";
import RepeatIcon from '@mui/icons-material/Repeat';
import "../public/css/calendar.css"

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [detailInput, setDetailInput] = useState('');
    const [dateValue, setDateValue] = useState(moment())
    const [pickedTime, setPickedTime] = useState(dayjs());
    const clickRef = useRef(null)

    const handleTitleInputChange = (event) => {
        setTitleInput(event.target.value);
    }
    const handleDetailInputChange = (event) => {
        setDetailInput(event.target.value);
    }
    const handleInputChange = (event) => {
        setCurrentInput(event.target.value);
    };

    const handleAddTodo = () => {
        if (currentInput.trim() !== '') {
            setTodos([...todos, {text: currentInput, completed: false}]);
            setCurrentInput('');
        }
    };

    const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    moment.tz.setDefault("Asia/Seoul");
    const localizer = momentLocalizer(moment);

    const myEvents = [
        {
            title: 'Big Meeting',
            allDay: true,
            start: new Date(2024, 3, 0), // 주의: 월은 0부터 시작합니다. 3은 4월을 의미합니다.
            end: new Date(2024, 3, 1),
        }
    ];

    useEffect(() => {
        return () => {
            window.clearTimeout(clickRef?.current)
        }
    }, [])

    const onSelectSlot = useCallback((slotInfo) => {
        window.clearTimeout(clickRef?.current)
        clickRef.current = window.setTimeout(() => {
            // window.alert(slotInfo.start.toLocaleString())
            setDateValue(moment(slotInfo.start))
        }, 250)
        // console.log(slotInfo.start.toLocaleString())
    }, [])

    const mp = {"Feb 2": [0, 1, 2, 3], "Feb 3": [1, 2, 3, 4], "Feb 4": [8, 9, 10, 11]};

    return (
        <Box sx={{width: '100%', height: "90vh", bgcolor: 'background.paper'}}>
            <div style={{display: "flex", height: "100%"}}>
                <Grid container spacing={0}>
                    {
                        Object.entries(mp).map(([date, todoList]) => {
                            return <TodoComp key={date} date={date} todoList={todoList}/>
                        })
                    }
                    <Grid item xs={3}>
                        <Box display="flex" alignItems="center" height={"100%"}
                             sx={{flexFlow: "column"}}
                             my={1}
                             gap={2}
                        >
                            <Box sx={{width: "80%", height: "5%", display: "flex", alignItems: "center"}}>
                                <TextField
                                    label="Add Todo Title"
                                    variant="standard"
                                    fullWidth
                                    value={titleInput}
                                    onChange={handleTitleInputChange}
                                />
                            </Box>
                            <Divider sx={{width: "80%"}}/>
                            <Box sx={{width: "80%", height: "5%", display: "flex", alignItems: "center"}}>
                                <TextField
                                    label="Details"
                                    variant="standard"
                                    fullWidth
                                    value={detailInput}
                                    onChange={handleDetailInputChange}
                                />
                            </Box>
                            <Box sx={{width: '100%', height: "40%"}}>
                                <Calendar
                                    localizer={localizer}
                                    events={myEvents}
                                    views={['month']}
                                    toolbar={true}
                                    onSelectSlot={onSelectSlot}
                                    selectable
                                    date={dateValue}
                                    dayPropGetter={date => (moment(date).format('DD') === moment(dateValue).format('DD')) && ({className: 'rbc-selected-day'})}
                                />
                            </Box>
                            <Box sx={{
                                width: '100%',
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly"
                            }}>
                                <AddAlarmIcon sx={{fontSize: "3em"}}/>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        sx={{width: "60%"}}
                                        variant="standard"
                                        value={pickedTime}
                                        onChange={(newValue) => setPickedTime(newValue)}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly"
                            }}>
                                <RepeatIcon sx={{fontSize: "3em"}}/>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker sx={{width: "60%"}} views={['minutes']} format="분 당 한 번씩"/>
                                </LocalizationProvider>
                            </Box>
                            <Box>

                            </Box>
                            <Button variant="contained" onClick={handleAddTodo} sx={{px: 5}} fullWidth>
                                Add
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </div>
            <List component="nav" aria-label="todo list">
                {todos.map((todo, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                    >
                        <FormControlLabel
                            control={<Checkbox checked={todo.completed}/>}
                            label={<ListItemText primary={todo.text}/>}
                            onClick={() => toggleTodo(index)}
                            sx={{
                                width: '100%',
                                '& .MuiTypography-root': {
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                },
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default TodoList;
