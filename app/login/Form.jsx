'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Form() {
    const router = useRouter()
    const [error, setError] = useState('')

    async function submitHandler(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const resp = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        })

        console.log(resp);

        if (resp?.error) {
            setError(true)
        } else if (!resp?.error) {
            router.push('/')
            router.refresh()
        }

        console.log({ resp });

    }

    return (
        <form onSubmit={submitHandler} className="border p-5 flex flex-col w-1/2 mx-auto">

            <input name='email' className="border border-green-300 py-2 px-4 my-3" placeholder="Введите email" />
            <input name='password' type='password' className="border border-green-300 py-2 px-4 my-3" placeholder="Введите пароль" />
            <button className="py-2 px-4 bg-green-300 w-fit mx-auto rounded-md">Login</button>

            {
                error && <p className=' font-bold text-red-500 '>Проверьте правильноть введеных данных</p>
            }



        </form>
    )
}
