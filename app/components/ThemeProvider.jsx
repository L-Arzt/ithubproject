'use client'
import { createContext } from 'react'
import AsideMenu from './AsideMenu';
import { useState } from 'react';
//  createContext is not supported in Server Components
export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
    const [weeks, setWeeks] = useState()
    return (

        <ThemeContext.Provider value={{ weeks, setWeeks }}>
            <div className='flex self-start'><AsideMenu />
            </div>
            {children}
        </ThemeContext.Provider>

    )
}