import * as yup from "yup";

const taskObject = yup.object().shape({
    task: yup.string()
             .required("task is required")
             .min(8, "minimum 8 alphabet is necessary")
});

export default taskObject;