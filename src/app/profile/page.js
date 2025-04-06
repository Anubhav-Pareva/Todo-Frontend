"use client"
import { userSelector } from "@/redux/slices/userSlice";
import { Box, 
         Stack, 
         TableCell, 
         TableRow, 
         TableContainer, 
         Table, 
         TableBody,
        Paper } from "@mui/material";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Profile(){
    const {userName, userEmail, userGender} = useSelector(userSelector);
    console.log(userName);
    return(
        <Box sx={{display:"flex", 
                  justifyContent:"center", 
                  alignItems:"center", 
                  height:"calc(100vh - 64px)"}}>
            <Stack  sx={{backgroundColor:"lightgray", p:4, borderRadius:"32px", width:{xs:"90%", md:"60%"}}} alignItems={"center"} gap={4}>
                <Image src={"/profile-image.jpg"} alt={"broken profile"} width={150} height={150} style={{borderRadius:"75px"}}/>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth:{xs:"100%", sm:650} }} aria-label="simple table">
                        <TableBody >
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">{userName? userName : "NaN"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell align="right">{userEmail? userEmail : "NaN"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Gender</TableCell>
                                <TableCell align="right">{userGender? userGender : "NaN"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Stack>
        </Box>
    )
}