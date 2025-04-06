"use client"
import {
    FormControl,
    TextField,
    Box,
    Button,
    Radio,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Stack,
    Typography,
    InputAdornment,
    IconButton
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import signupObject from "../yupFiles/signupYupObject";
import { useCreateUserMutation } from "@/redux/apis/userApi";

export default function SignupForm(){
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [createUser, { isLoading, isError, isSuccess, error }] = useCreateUserMutation();
    
        const handleClickShowPassword = () => setShowPassword((show) => !show);
        const handleClickShowConfirmPassword = () => setShowConfirmPassword((show)=>!show);

    const router = useRouter();
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: yupResolver(signupObject) });
    const formSubmit = async (data) => {
        // Prevents page reload

        try {
            const response = await createUser(data).unwrap();
            console.log(response);
            if (response.status !== "success") {
                throw new Error("Failed to submit form");
            }
            router.push('/login');
        } catch (error) {
            console.error("Error:", error);
        }

    }

    return (
        <Box p={8}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}>
            <form onSubmit={handleSubmit(formSubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    rowGap: 16
                }}
            >
                <FormControl sx={{width:"100%"}}>
                    <TextField type="text"
                        name="userName"
                        label='Name'
                        {...register('userName')} />
                    {errors?.userName ? <Typography>
                        {errors?.userName?.message}
                    </Typography> : null}
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                    <TextField type="email"
                        name="userEmail"
                        label='Email'
                        {...register('userEmail')} />
                    {errors?.userEmail ? <Typography>
                        {errors?.userEmail?.message}
                    </Typography> : null}
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                    <TextField type="text"
                        name="userPNumber"
                        label='Phone Number'
                        {...register('userPNumber')}
                        inputProps={{ maxLength: 10 }} />
                    {errors?.userPNumber ? <Typography>
                        {errors?.userPNumber?.message}
                    </Typography> : null}
                </FormControl>
                <FormControl>
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        name="userPassword"
                        label='Password'
                        autoComplete="new-password"
                        {...register('userPassword')}
                    />
                    {errors?.userPassword ? <Typography>
                        {errors?.userPassword?.message}
                    </Typography> : null}
                </FormControl>
                <FormControl>
                    <TextField
                        type={showConfirmPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        name="confirmPassword"
                        label='Confirm Password'
                        autoComplete="new-password"
                        {...register('confirmPassword')}
                    />
                    {errors?.userPassword ? <Typography>
                        {errors?.userPassword?.message}
                    </Typography> : null}
                </FormControl>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="gender"

                    >
                        <FormControlLabel value="female" control={<Radio {...register('gender')} />} label="Female" />
                        <FormControlLabel value="male" control={<Radio {...register('gender')} />} label="Male" />
                        <FormControlLabel value="lgtv" control={<Radio {...register('gender')} />} label="LGTV" />
                    </RadioGroup>
                    {errors?.gender ? <Typography>
                        {errors?.gender?.message}
                    </Typography> : null}
                </FormControl>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'signing up' : 'SignUP'}</Button>
            </form>
            <Stack>
                <Link href="/login">Login</Link>
            </Stack>
        </Box>

    )
}