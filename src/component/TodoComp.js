import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Grid, ListItemIcon } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Sample initial data structure
const initialTodoList = [
    {
        id: 1,
        name: "Task A",
        completed: false,
        toDoDetails: [
            { id: 101, detail: "Task A1", completed: false },
            { id: 102, detail: "Task A2", completed: false },
            { id: 103, detail: "Task A3", completed: false }
        ]
    },
    {
        id: 2,
        name: "Task B",
        completed: false,
        toDoDetails: []
    },
    {
        id: 3,
        name: "Task C",
        completed: false,
        toDoDetails: [
            { id: 301, detail: "Task C1", completed: false }
        ]
    }
];

export default function TodoComp({ date, todoList = initialTodoList, size = 3, boxExisted = true, ...props }) {
    const [checked, setChecked] = useState({});
    const [indeterminate, setIndeterminate] = useState({});

    useEffect(() => {
        const initialChecked = {};
        const initialIndeterminate = {};
        todoList.forEach(todo => {
            initialChecked[todo.id] = todo.completed;
            todo.toDoDetails.forEach(detail => {
                initialChecked[detail.id] = detail.completed;
            });
            const allChecked = todo.toDoDetails.every(detail => detail.completed);
            const noneChecked = todo.toDoDetails.every(detail => !detail.completed);
            initialIndeterminate[todo.id] = !allChecked && !noneChecked;
        });
        setChecked(initialChecked);
        setIndeterminate(initialIndeterminate);
    }, [todoList]);

    const handleToggle = (item) => () => {
        const newChecked = { ...checked };
        const newIndeterminate = { ...indeterminate };

        const toggleItem = (id, isChecked) => {
            newChecked[id] = isChecked;
            const todo = todoList.find(todo => todo.id === id);
            if (todo && todo.toDoDetails.length > 0) {
                todo.toDoDetails.forEach(detail => {
                    newChecked[detail.id] = isChecked;
                });
            }
        };

        if (checked[item.id] || indeterminate[item.id]) {
            toggleItem(item.id, false);
            if (item.toDoDetails) {
                item.toDoDetails.forEach(detail => {
                    newChecked[detail.id] = false;
                });
            }
        } else {
            toggleItem(item.id, true);
            if (item.toDoDetails) {
                item.toDoDetails.forEach(detail => {
                    newChecked[detail.id] = true;
                });
            }
        }

        todoList.forEach(todo => {
            if (todo.toDoDetails.length > 0) {
                const allChecked = todo.toDoDetails.every(detail => newChecked[detail.id]);
                const noneChecked = todo.toDoDetails.every(detail => !newChecked[detail.id]);
                newChecked[todo.id] = allChecked;
                newIndeterminate[todo.id] = !allChecked && !noneChecked;
            }
        });

        setChecked(newChecked);
        setIndeterminate(newIndeterminate);
    };

    const handleChildToggle = (parent, child) => () => {
        const newChecked = { ...checked };
        newChecked[child.id] = !checked[child.id];

        const allChecked = parent.toDoDetails.every(c => newChecked[c.id]);
        const noneChecked = parent.toDoDetails.every(c => !newChecked[c.id]);
        newChecked[parent.id] = allChecked;
        const newIndeterminate = { ...indeterminate };
        newIndeterminate[parent.id] = !allChecked && !noneChecked;

        setChecked(newChecked);
        setIndeterminate(newIndeterminate);
    };

    return (
        <Grid item xs={size} sx={{ height: '80%' }} onClick={props.onClick}>
            {boxExisted &&
                <Box sx={{
                    height: "10%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3em"
                }}>
                    {date}
                </Box>
            }
            <List sx={{
                width: '100%',
                height: "100%",
                backgroundColor: 'var(--white)',
                display: "flex",
                flexDirection: "column",
                padding: 0,
                overflowX: "hidden",
                overflowY: "auto",
            }}>
                {todoList.map((value) => (
                    <React.Fragment key={value.id}>
                        <ListItem disablePadding>
                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked[value.id] || false}
                                        indeterminate={indeterminate[value.id] || false}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary={`${value.name}`} />
                            </ListItemButton>
                        </ListItem>
                        {value.toDoDetails.length > 0 && (
                            <List component="div" disablePadding sx={{ pl: 4 }}>
                                {value.toDoDetails.map((child) => (
                                    <ListItem key={child.id} disablePadding>
                                        <ListItemButton role={undefined} onClick={handleChildToggle(value, child)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked[child.id] || false}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={`${child.detail}`} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        <Divider variant="middle" sx={{ width: "90%" }} />
                    </React.Fragment>
                ))}
                {!boxExisted &&
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <MoreVertIcon />
                    </div>
                }
            </List>
        </Grid>
    );
}
