import Link from "next/link";
import React from "react";

export default async function Header() {

    return (
        <header>

            <ul>
                <li><Link className="text-red-500" href={"/"}>Главная</Link></li>
                <li><Link className="text-red-500" href={"/User/TimeTable"}>расписание</Link></li>
            </ul>
        </header>
    )
}
