"use client"

import NavBar from "../NavBar"

export default function HomeLayout({children}){
    return(
        <>
        <NavBar/>
        {children}
        </>
    )
}