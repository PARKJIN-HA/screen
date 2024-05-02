import React, {useState} from 'react';
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
import moment from "moment/moment";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import CommentIcon from '@mui/icons-material/Comment';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [currentInput, setCurrentInput] = useState('');

    const handleInputChange = (event) => {
        setCurrentInput(event.target.value);
    };

    const handleAddTodo = () => {
        if (currentInput.trim() !== '') {
            setTodos([...todos, {text: currentInput, completed: false}]);
            setCurrentInput('');
        }
    };

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddTodo();
        }
    };

    const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const localizer = momentLocalizer(moment);

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

    return (
        <Box sx={{width: '100%', height: "90vh", bgcolor: 'background.paper'}}>
            <div style={{display: "flex", height: "100%"}}>
                <Grid container spacing={0}>
                    <Grid item xs={3}>
                        <Box sx={{
                            height: "10%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "3em",
                            border: "black solid 1px"
                        }}>
                            Feb 21
                        </Box>
                        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                            {[1, 2, 3, 4].map((value) => {
                                const labelId = `checkbox-list-label-${value}`;
                                return (
                                    <div>
                                        <ListItem
                                            key={value}
                                            disablePadding
                                        >
                                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.indexOf(value) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{'aria-labelledby': labelId}}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={`Line item ${value + 1}`}/>
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider variant="middle" sx={{width: "90%"}}/>
                                    </div>
                                );
                            })}
                        </List>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{
                            height: "10%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "3em",
                            border: "black solid 1px"
                        }}>
                            Feb 22
                        </Box>
                        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                            {[5, 6, 7, 8].map((value) => {
                                const labelId = `checkbox-list-label-${value}`;
                                return (
                                    <div>
                                        <ListItem
                                            key={value}
                                            disablePadding
                                        >
                                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.indexOf(value) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{'aria-labelledby': labelId}}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={`Line item ${value + 1}`}/>
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider variant="middle" sx={{width: "90%"}}/>
                                    </div>
                                );
                            })}
                        </List>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{
                            height: "10%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "3em",
                            border: "black solid 1px"
                        }}>
                            Feb 23
                        </Box>
                        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                            {[9, 10, 11, 12].map((value) => {
                                const labelId = `checkbox-list-label-${value}`;
                                return (
                                    <div>
                                        <ListItem
                                            key={value}
                                            disablePadding
                                        >
                                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.indexOf(value) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{'aria-labelledby': labelId}}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={`Line item ${value + 1}`}/>
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider variant="middle" sx={{width: "90%"}}/>
                                    </div>
                                );
                            })}
                        </List>
                    </Grid>
                    <Grid item xs={3}>
                        <Box display="flex" alignItems="center" height={"100%"}
                             sx={{flexFlow: "column", justifyContent: "space-evenly"}}>
                            <Box sx={{height: "5%", display: "flex", alignItems: "center"}}>
                                Add Todo Title
                            </Box>
                            <Divider sx={{width: "80%", marginY: "3%"}}/>
                            <Box sx={{width: '100%', height: "30%"}}>
                                <Calendar
                                    localizer={localizer}
                                    events={myEvents}
                                    startAccessor="start"
                                    endAccessor="end"
                                    toolbar={false}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    label="Add Todo"
                                    variant="outlined"
                                    fullWidth
                                    value={currentInput}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                />
                                <Button variant="contained" onClick={handleAddTodo} sx={{ml: 1}}>
                                    Add
                                </Button>
                            </Box>
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
