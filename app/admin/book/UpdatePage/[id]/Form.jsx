'use client';
import React, { useState } from 'react';
import { MultiSelect } from '../../../../components/ui/multi-select';
import { Cat, Dog, Fish, Rabbit, Turtle } from 'lucide-react';
import { updateLesson } from './prismaUpdateDynamic';
import { deleteLesson } from './prismaDeleteDynamic';

import deleteImg from '../../../../../public/deleteImg.png'


import Image from 'next/image';
import { useFormState } from 'react-dom';

export default function UpdateLessonPage({ data }) {
    const [teacher, setTeacher] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [group, setGropup] = useState('');

    const frameworksList = [
        {
            value: 'ИСП9-kh31',
            label: 'ИСП9-kh31',
            // icon: Turtle,
        },
        {
            value: 'ИСП9-kh32',
            label: 'ИСП9-kh32',
        },
        {
            value: 'vue',
            label: 'Vue',
        },
        {
            value: 'svelte',
            label: 'Svelte',
        },
        {
            value: 'ember',
            label: 'Ember',
        },
    ];

    // [0] - номер пары
    // [1] - день
    // [2] - название аудитории

    const initialState = {
        message: '',
    };

    const [selectedFrameworks, setSelectedFrameworks] = useState([]);

    console.log(selectedFrameworks);

    const [state, formAction] = useFormState(updateLesson, deleteLesson, initialState);
    console.log(data)
    return (
        <div className="flex mx-auto items-center justify-center flex-col w-[100%] h-[40%] gap-[50px]">
            <div className="flex mx-auto items-center justify-center flex-col w-[40%] h-[70px] bg-[#F7F7F8] rounded-[15px]">
                <h1 className="text-[17px] font-semibold">
                    Изменение данных в аудитории
                </h1>
            </div>

            <div className="flex mx-auto items-center justify-center flex-col w-[40%] h-[30%] bg-[#F7F7F8] rounded-[15px]">
                <form
                    action={formAction}
                    className="flex items-center justify-center flex-col w-[100%] h-[100%] gap-y-[20px]"
                >
                    <div className="flex  items-center justify-center w-[90%] h-[50px] rounded-[10px] p-3 my-10 bg-[#ffffff] gap-2 text-[#921CB0] ">
                        <div>Кабинет: {data.classroom}</div>|
                        <div>Дата: {new Date(data.date).toLocaleDateString('ru-RU')}</div>|
                        <div>Пара: {data.numberLesson} </div>
                    </div>

                    <label className="w-[90%]">
                        <input
                            className="w-[100%] h-[50px] rounded-[10px] pl-3"
                            type="text"
                            defaultValue={data.teacher}
                            name="teacher"
                            placeholder="ФИО "
                        />
                    </label>
                    <label className="w-[90%]">
                        <input
                            className="w-[100%] h-[50px] rounded-[10px] pl-3"
                            type="text"
                            defaultValue={data.discipline}
                            name="discipline"
                            placeholder="Описание бронирования"
                        />
                    </label>

                    <label className="w-[90%]">
                        <div className="">
                            <MultiSelect
                                options={frameworksList}
                                onValueChange={setSelectedFrameworks}
                                // defaultValue={ }
                                placeholder="Выберите группу (необязательно)" // optional
                                animation={2} // optional
                                variant="inverted" // optional
                                className="w-[100%]  rounded-[10px] pl-3  bg-white text-[#b1b1b1]"
                            />
                        </div>
                    </label>
                    <input hidden type="text" value={data.id} name="id" />


                    <input hidden type="text" value={data.numberLesson} name="lessonNum" />

                    <input hidden type="text" value={data.weekDay} name="lessonDay" />

                    <input hidden type="text" value={data.classroom} name="audt" />

                    <input hidden type="text" value={new Date(data.date).toString()} name="date" />

                    <input
                        hidden
                        type="text"
                        value={selectedFrameworks.join(', ')}
                        name="group"
                    />

                    <input
                        className="flex w-[90%] h-[45px] items-center justify-center bg-[#921CB0]  rounded-md text-stone-50"
                        type="submit"
                        value="Изменить данные"
                    ></input>

                    <div aria-live="polite">{state?.message}</div>

                    <button
                        className='flex items-center justify-center text-red-500 w-[90%] h-[45px]  bg-[#9b9b9b]  rounded-md  mb-5'

                        onClick={async () => {
                            const Delete = await deleteLesson(data.id);
                            console.log(Delete);
                        }}
                    >Удалить
                        <Image className='w-10 h-10  rounded-lg p-1' src={deleteImg} alt='deleteImg' />
                    </button>
                </form>
            </div>
        </div>
    );
}
