'use client'

import { useState } from "react"
import { createLesson } from './prismaCreateDynamic'

export default function Book({ params }) {
    const [teacher, setTeacher] = useState('')
    const [discipline, setDiscipline] = useState('')
    // function handleSubmit(e) {
    //     e.preventDefault()
    //     const formData = new FormData(e.target)
    //     console.log(Object.fromEntries(formData));
    // }
    console.log(params.params);
    // [0] - номер пары  
    // [1] - день
    // [2] - название аудитории

    return (
        <div>
            <form action={createLesson}>


                <label>
                    Имя преподавателя:
                    <input type="text" defaultValue={teacher} name="teacher" />
                </label>
                <label>
                    Дисциплина:
                    <input type="text" defaultValue={discipline} name="discipline" />
                </label>

                <input hidden type="text" value={params.params[0]} name="lessonNum" />

                <input hidden type="text" value={params.params[1]} name="lessonDay" />

                <input hidden type="text" value={params.params[2]} name="audt" />

                <input type="submit" value="Добавить" />
            </form>
        </div>
    )
}
