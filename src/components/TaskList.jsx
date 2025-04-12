"use client"
import { Box, Pagination, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { useGetAllTaskQuery } from "@/redux/apis/taskApi";
import { useState } from "react";

export default function TaskList(){
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const {data, 
          isLoading, 
          isError, 
          error} = useGetAllTaskQuery({ page:currentPage, 
                                        limit:limit});
  const totalPageCount = Math.ceil(data?.total / limit) || 1;

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
      <>
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
      <Pagination count={totalPageCount} 
                  page={currentPage}
                  onChange={(event, value) => {
                    setCurrentPage(value); // update local state
                  }}
                 
                  variant="outlined" 
                  color="primary" />
      </>
    );
  }
}