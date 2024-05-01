import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [currentInput, setCurrentInput] = useState('');

  const handleInputChange = (event) => {
    setCurrentInput(event.target.value);
  };

  const handleAddTodo = () => {
    if (currentInput.trim() !== '') {
      setTodos([...todos, { text: currentInput, completed: false }]);
      setCurrentInput('');
    }
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

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Box display="flex" alignItems="center">
        <TextField
          label="Add Todo"
          variant="outlined"
          fullWidth
          value={currentInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Button variant="contained" onClick={handleAddTodo} sx={{ ml: 1 }}>
          Add
        </Button>
      </Box>
      <List component="nav" aria-label="todo list">
        {todos.map((todo, index) => (
          <ListItem
            key={index}
            disablePadding
          >
            <FormControlLabel
              control={<Checkbox checked={todo.completed} />}
              label={<ListItemText primary={todo.text} />}
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
