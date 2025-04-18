"use client"
import { Box, Pagination, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { useGetAllTaskQuery } from "@/redux/apis/taskApi";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "@/redux/slices/userSlice";

export default function TaskList(){
  const [currentPage, setCurrentPage] = useState(1);
  const { userId } = useSelector(userSelector);
  const limit = 5; // assuming you store logged in user in redux
  const queryParams = useMemo(() => ({  
                                        page: currentPage, 
                                        limit, 
                                        userId: userId 
                                      }), [currentPage, userId]);
  const {data, 
          isLoading, 
          isError, 
          error} = useGetAllTaskQuery(queryParams);
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