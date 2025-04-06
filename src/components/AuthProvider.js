// context/AuthProvider.js
"use client";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { userSelector } from "@/redux/slices/userSlice";

export const AuthContext = createContext();

const publicRoutes = ["/login", "/signup"]; // Add routes that don’t require auth

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const isLogin = useSelector(userSelector).isLogin;

    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        if (!isLogin && !publicRoutes.includes(pathname)) {
            router.replace("/login");
        }
        setCheckingAuth(false);
    }, [isLogin, pathname, router]);

    if (checkingAuth) {
        return <div>Loading...</div>; // Show while checking auth
    }

    return (
        <AuthContext.Provider value={{ isLogin }}>
            {children}
        </AuthContext.Provider>
    );
};
