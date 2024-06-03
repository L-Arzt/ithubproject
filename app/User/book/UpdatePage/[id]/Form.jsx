'use client'
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { updateLesson } from './prismaUpdateDynamic';
import { deleteLesson } from './prismaDeleteDynamic';
import { redirect } from 'next/navigation';

export default function Form({ data, params }) {
    const initialState = {
        message: '',
    };
    const [state, formAction] = useFormState(updateLesson, initialState);
    // const [delete, setDelete] = useState()
    return (
        <div>

            <form action={formAction}>
                <div>
                    <h1>Выбранный день {/* parasms.params[3] */}</h1>
                </div>

                <label>
                    Имя преподавателя:
                    <input type="text" defaultValue={data.teacher} name="teacher" />
                </label>
                <label>
                    Дисциплина:
                    <input type="text" defaultValue={data.discipline} name="discipline" />
                </label>

                <label>
                    Группа:
                    <input type="text" defaultValue={data.group} name="group" />
                </label>

                <input hidden type="text" value={data.numberLesson} name="lessonNum" />

                <input hidden type="text" value={data.weekDay} name="lessonDay" />

                <input hidden type="text" value={data.classroom} name="audt" />

                <input hidden type="text" value={data.date} name="date" />

                <input hidden type="text" value={params.id} name="id" />

                <input type="submit" value="Изменить" />


                <div aria-live="polite">{state?.message}</div>
            </form>


            <button
                onClick={async () => {
                    const Delete = await deleteLesson(data.id)

                }}
            >
                Удалить
            </button>
        </div >
    )
}
