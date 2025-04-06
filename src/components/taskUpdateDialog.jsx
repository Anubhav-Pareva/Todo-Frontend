import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useUpdateTaskMutation } from '@/redux/apis/taskApi';

export default function TaskUpdateDialog(props) {
    const [updateTask] = useUpdateTaskMutation();
    return(
        <Dialog
        open={props.openTaskUpdate}
        onClose={()=>props.setTaskUpdate(!props.openTaskUpdate)}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
                const newUpdateTask = event.target.email.value;
              updateTask({id:props.id, data:{updateTask:newUpdateTask}});
                props.setTaskUpdate(!props.openTaskUpdate);
            },
          },
        }}
      >
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.task}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Update Task Here..."
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.setTaskUpdate(!props.openTaskUpdate)}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    )
}