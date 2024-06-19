'use client'
import { createContext } from 'react'
import AsideMenu from './AsideMenu';
import { useState } from 'react';
export const ThemeContext = createContext()

export default function ThemeProvider({ children, session }) {
    const [weeks, setWeeks] = useState()
    return (

        <ThemeContext.Provider value={{ weeks, setWeeks }}>
            <div className='flex self-start'>
                {session && <AsideMenu />}
            </div>
            {children}
        </ThemeContext.Provider>
    )
}