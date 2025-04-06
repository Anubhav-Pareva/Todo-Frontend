"use client"
import { Box, Typography } from "@mui/material";
import AddTaskForm from "./forms/AddTaskForm";
import TaskList from "./TaskList";
import { useSelector } from "react-redux";
import { userSelector } from "@/redux/slices/userSlice";
export default function HomePage() {
  const isLogin = useSelector(userSelector).isLogin;
  if(!isLogin){
    return(
      <Typography>not today bitch</Typography>
    )
  }
  return (
    <Box
      py={4}
      px={{xs:2, sm:4, md:8}}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      maxWidth="xl"
      marginLeft={"auto"}
      marginRight={"auto"}
    >
      <Typography fontSize={36} fontWeight={600} color="primary">
        The Todo App
      </Typography>
      <AddTaskForm />
      <TaskList />
    </Box>
  );
}

