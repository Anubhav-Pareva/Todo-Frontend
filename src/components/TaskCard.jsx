import { Typography, 
         Stack, 
         IconButton, 
         Switch } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useChangeStatusMutation, useDeleteTaskMutation } from "@/redux/apis/taskApi";
import { useState } from "react";
import TaskUpdateDialog from "./taskUpdateDialog";
export default function TaskCard(props){
    const[deleteTask] = useDeleteTaskMutation();
    const[changeStatus] = useChangeStatusMutation();
    const [openTaskUpdate, setTaskUpdate] = useState(false);
    const handleStatusChange = (id) =>{
        changeStatus({ id, completeStatus: !props.task.completeStatus });
    }
    return (
      <Stack
        flexDirection={{ xs: "column", sm: "row" }}
        gap={{ xs: 0, sm: 4 }}
        width={"100%"}
        sx={{
          backgroundColor: props.task.completeStatus ? "#A6F1E0" : "#FF8383",
          borderRadius: "32px",
          p: 1,
          alignItems: "center",
        }}
      >
        <Typography sx={{ flexGrow: 1, p: 2 }}>{props.task.task}</Typography>
        <Stack flexDirection={"row"}>
          <IconButton onClick={() => setTaskUpdate(true)}>
            <EditIcon
              sx={{
                color: props.task.completeStatus ? "#A02334" : "#7ED7C1",
              }}
            />
          </IconButton>
          <TaskUpdateDialog setTaskUpdate={setTaskUpdate} 
                            openTaskUpdate={openTaskUpdate}
                            task={props.task.task}
                            id={props.task._id}/>
          <IconButton onClick={() => deleteTask(props.task._id)}>
            <DeleteIcon
              sx={{
                color: props.task.completeStatus ? "#A02334" : "#7ED7C1",
              }}
            />
          </IconButton>
          <Switch
            checked={props.task.completeStatus}
            onClick={() => handleStatusChange(props.task._id)}
          />
        </Stack>
      </Stack>
    );
}