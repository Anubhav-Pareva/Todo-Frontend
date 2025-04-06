"use client"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    FormControl,
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    InputAdornment,
    IconButton
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { userLoggedin } from '@/redux/slices/userSlice';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import loginObject from '../yupFiles/loginYupObject';
import { useLoginUserMutation } from '@/redux/apis/userApi';
export default function LoginForm(){
    const [showPassword, setShowPassword] = useState(false);
    const [loginUser] = useLoginUserMutation();
    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const router = useRouter();
    const dispatch = useDispatch();
    
    const { register,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: yupResolver(loginObject) });
    const formSubmit = async (data) => {
        try {
            const response = await loginUser(data).unwrap();
            console.log(response);

            if (!response.userFound) {
                router.push('/signup');
                return
            }

            dispatch(userLoggedin(response.user));
            localStorage.setItem('user', JSON.stringify(response.user));
            router.push('/');
        }
        catch (err) {
            console.log('Error', err);
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
                }}>
                <FormControl sx={{width:"100%"}}>
                    <TextField type="email"
                        name="userEmail"
                        label='Email'
                        {...register('userEmail')} />
                    {errors?.userEmail ? <Typography>
                        {errors?.userEmail?.message}
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

                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Logging...' : 'Login'}</Button>
            </form>
            <Stack>
                <Link href="/signup">Sign-Up</Link>
            </Stack>
        </Box>

    )
}