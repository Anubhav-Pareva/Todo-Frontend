// "use client"
// import { useEffect, useState, createContext } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { userLoggedin, userSelector } from "@/redux/slices/userSlice";
// import { useRouter } from "next/navigation";
// export const StateContext = createContext();
// export const StateProvider = ({ children }) => {
//     const isLogin = useSelector(userSelector).isLogin;
//     const router  = useRouter();
//     const dispatch = useDispatch();
//     const [checkingState, setCheckingState] = useState(true);

//     useEffect(() => {
//         const storedUser = JSON.parse(localStorage.getItem("user")) || null;
//         if(storedUser){
//             dispatch(userLoggedin(storedUser));
//             setCheckingState(false);
//             return;
//         }
//         setCheckingState("passToLogin");
//     }, [isLogin, router]);

//     if (checkingState) {
//         return <div>Loading...</div>; // Show while checking auth
//     }
//     else if (checkingState === "passToLogin") {
//         return router.push("/login");
        
//     }

//     return (
//         <StateContext.Provider value={{ isLogin }}>
//             {children}
//         </StateContext.Provider>
//     );
// };
"use client";
import { useEffect, useState, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedin, userSelector } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const { isLogin } = useSelector(userSelector);
    const router = useRouter();
    const dispatch = useDispatch();
    const [checkingState, setCheckingState] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            dispatch(userLoggedin(storedUser));
            setCheckingState(false);
        } else {
            router.push("/login");
            setCheckingState(false);
        }
    }, [dispatch, router]);

    if (checkingState) {
        return <div>Loading...</div>;
    }

    return (
        <StateContext.Provider value={{ isLogin }}>
            {children}
        </StateContext.Provider>
    );
};
