'use client'
import { useState } from 'react';

export default function TimeTable() {
    const [groupId, setGroupId] = useState(null);
    const [data, setData] = useState(null); // добавьте это состояние для хранения данных

    const groupsCourse1 = {
        'группа 11': 53674,
        'группа 12': 53675
    };

    const groupsCourse2 = {
        'группа 21': 53680,
        'группа 22': 53683,
        'группа 23': 53685
    };

    const groupsCourse3 = {
        'группа 31': 53686,
        'группа 32': 53687
    };

    const fetchData = () => {
        if (groupId) {
            fetch(`https://edu.donstu.ru/api/Rasp?idGroup=${groupId}&i`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setData(data);
                    console.log(data);
                })
                .catch(function (error) {
                    alert(
                        'Произошла ошибка: ' +
                        error.message
                    );
                });

        } else {
            alert('Выберите группу');
        }
    }

    return (
        <section className='flex items-center justify-center flex-col gap-10'>
            <h1 className='text-xl'>Выберите свой курс и группу</h1>

            <section>
                <select onChange={(e) => setGroupId(groupsCourse1[e.target.value])}>
                    <option value="">Курс 1</option>
                    {Object.keys(groupsCourse1).map((group) => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                </select>

                <select onChange={(e) => setGroupId(groupsCourse2[e.target.value])}>
                    <option value="">Курс 2</option>
                    {Object.keys(groupsCourse2).map((group) => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                </select>

                <select onChange={(e) => setGroupId(groupsCourse3[e.target.value])}>
                    <option value="">Курс 3</option>
                    {Object.keys(groupsCourse3).map((group) => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                </select>
            </section>

            <button className='flex items-center text-white bg-slate-500 px-5 py-2 rounded-xl' onClick={fetchData}>Получить данные</button>

            {data && (
                <div>
                    <p>Группа: {data.data.info.group.name}</p>

                    <section className='flex items-center justify-between flex-wrap'>
                        {data && data.data.rasp.map((item, index) => (
                            <div className='flex items-start justify-center flex-col  p-3 bg-slate-500' key={index}>
                                <p>Дата: {item.дата}</p>
                                <p>Дисциплина: {item.дисциплина}</p>
                                <p>Преподаватель: {item.преподаватель}</p>
                                <p>Аудитория: {item.аудитория}</p>
                                <p>Начало: {item.начало}</p>
                                <p>Окончание: {item.конец}</p>
                            </div>
                        ))}
                    </section>

                </div>
            )}
        </section>
    )
}
