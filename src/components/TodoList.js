import React, { useEffect, useState } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, onSnapshot, doc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { Button, TextField, List, ListItem, ListItemText, IconButton, Container, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todosData);
    });
    return unsubscribe;
  }, []);

  const handleAddTodo = async () => {
    if (newTodo) {
      await addDoc(collection(db, 'todos'), { text: newTodo });
      setNewTodo('');
    }
  };

  const handleEditTodo = async (todo) => {
    setEditingTodo(todo);
    setNewTodo(todo.text);
  };

  const handleUpdateTodo = async () => {
    if (editingTodo) {
      await updateDoc(doc(db, 'todos', editingTodo.id), { text: newTodo });
      setEditingTodo(null);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Tarefas
      </Typography>
      <TextField
        fullWidth
        label="Nova Tarefa"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        margin="normal"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={editingTodo ? handleUpdateTodo : handleAddTodo}
        sx={{ mt: 2 }}
      >
        {editingTodo ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
      </Button>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleEditTodo(todo)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteTodo(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText primary={todo.text} />
          </ListItem>
        ))}
      </List>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default TodoList;
