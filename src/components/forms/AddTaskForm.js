import { FormControl, 
         TextField, 
         Button,
        Typography } from "@mui/material";
import taskObject from "../yupFiles/taskYupObject";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateTaskMutation } from "@/redux/apis/taskApi";
import styles from "./AddTaskForm.module.css";
export default function AddTaskForm(){
    const [createTask, {isLoading, isError, error}] = useCreateTaskMutation();
    const {register,
            watch,
            handleSubmit,
            reset,
            formState:{isSubmitting, errors}
        } = useForm({resolver:yupResolver(taskObject)});
        const handleFormSubmit = (data) => {
            createTask(data);
            reset();
        }
    return(
        <form className={styles.customFormStyle}
        onSubmit={handleSubmit(handleFormSubmit)} 
              style={{ display: "flex", 
                        gap: 8, 
                        width: "100%" }}>
            <FormControl sx={{ flexGrow: 1, }}>
                <TextField type="text" 
                label="Create Task" 
                {...register("task")}/>
                {errors?.task ? <Typography>
                    {errors?.task?.message}
                </Typography> : null}
            </FormControl>
            <Button type="submit" variant="outlined" disabled={isSubmitting} sx={{maxHeight:"55px"}}>
                {isSubmitting ? "Adding Task" : "Add Task"}
            </Button>
        </form>
    )
}

