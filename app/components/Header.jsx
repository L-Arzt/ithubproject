import Link from "next/link";
import React from "react";

export default async function Header() {

    return (
        <header className="flex items-center justify-center  h-10 m-[40px] bg-slate-500 rounded-xl">
            <nav className=" text-white text-xl">
                <ul className="flex items-center justify-around gap-10">
                    <li><Link className=" " href={"/"}>Главная</Link></li>
                    <li> <Link className=" " href={"/User/TimeTable"}>Расписание</Link></li>
                </ul>
            </nav>
        </header>
    )
}
