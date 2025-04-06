import { Box, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { useGetAllTaskQuery } from "@/redux/apis/taskApi";

export default function TaskList(){
  const {data, isLoading, isError, error} = useGetAllTaskQuery();
  if(isLoading){
    return(
      <Typography>Loading</Typography>
    )
  }
  else if(isError){
    return(
      <Typography>{error.message}</Typography>
    )
  }
  else{
    const result = data?.result ?? [];
    return (
      <Box
        sx={{
          backgroundColor: "#EFEFEF",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          flexGrow: 1,
          width: "100%",
          my: 4,
          borderRadius:"32px",
          p:4
        }}
      >
        {result.length === 0 ? (<Typography textAlign={"center"}>No task found</Typography>) : 
        (result?.map((task, index)=>(
                <TaskCard key={index} task={task}/> 
              )))}
      </Box>
    );
  }
}