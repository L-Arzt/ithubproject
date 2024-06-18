'use client'

import { signOut } from "next-auth/react"
import Image from "next/image"

import logoutimg from '../../../public/image.png'

export default function Logout() {
    return (
        <button
            onClick={() => {
                signOut()
            }}
        >
            < Image className=' w-20 h-5' src={logoutimg} alt='logo' />
        </button>
    )
}
