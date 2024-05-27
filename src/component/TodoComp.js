import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {Grid, ListItemIcon} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import React from "react";

export default function TodoComp({date, todoList, size = 3, boxExisted = true}) {
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

    return (
        <Grid item
              xs={size}
              sx={{
                  border: "black solid 1px"
              }}>
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
            <List sx={{width: '100%', backgroundColor: 'var(--white)'}}>
                {todoList.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                        <div key={value}>
                            <ListItem
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
                                    <ListItemText id={labelId} primary={`${value}`}/>
                                </ListItemButton>
                            </ListItem>
                            <Divider variant="middle" sx={{width: "90%"}}/>
                        </div>
                    );
                })}
            </List>
        </Grid>
    )
}