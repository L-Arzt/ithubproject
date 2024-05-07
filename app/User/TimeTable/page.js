'use client'
import { useState } from 'react';
import {

    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { get } from 'http';

export default function TimeTable() {
    const [classroomId, setClassroomId] = useState(null);
    const [data, setData] = useState(null); // добавьте это состояние для хранения данных


    const ClassRooms = [
        {
            roomName: 'Аудитория 621',
            roomId: 210737156
        },
        {
            roomName: 'Аудитория 623',
            roomId: 217739053
        },
    ]

    async function getData() {
        let data = []
        for (let room of ClassRooms) {
            const resp = await (await fetch(`https://edu.donstu.ru/api/Rasp?idAudLine=${room.roomId}&sdate=2024-05-06`)).json()

        }

        return data
    }

    const teoriya = [
        [

        ],
        []
    ]

    getData()

    // const groupsCourse1 = {
    //     'Аудитория 621': 210737156,
    //     'группа 12': 53675
    // };

    // const groupsCourse2 = {
    //     'группа 21': 53680,
    //     'группа 22': 53683,
    //     'группа 23': 53685
    // };

    // const groupsCourse3 = {
    //     'группа 31': 53686,
    //     'группа 32': 53687
    // };

    // const fetchData = () => {
    //     if (classroomId) {
    //         // fetch(`https://edu.donstu.ru/api/Rasp?idGroup=${groupId}&i`)
    //         fetch(`https://edu.donstu.ru/api/Rasp?idAudLine=${classroomId}&i`)
    //             .then((response) => {
    //                 return response.json();
    //             })
    //             .then((data) => {
    //                 setData(data);
    //                 console.log(data);
    //             })
    //             .catch(function (error) {
    //                 alert(
    //                     'Произошла ошибка: ' +
    //                     error.message
    //                 );
    //             });

    //     } else {
    //         alert('Выберите аудиторию');
    //     }
    // }

    // return (
    //     <section className='flex items-center justify-center flex-col gap-10'>
    //         <h1 className='text-xl'>Выберите свой аудиторию</h1>

    //         <section>
    //             <select onChange={(e) => setClassroomId(ClassRoom[e.target.value])}>
    //                 <option value="">Аудитория</option>
    //                 {Object.keys(ClassRoom).map((aud) => (
    //                     <option key={aud} value={aud}>{aud}</option>
    //                 ))}
    //             </select>
    //         </section>

    //         <button className='flex items-center text-white bg-slate-500 px-5 py-2 rounded-xl' onClick={fetchData}>Получить данные</button>

    //         {data && (
    //             <div>

    //                 <Table>
    //                     <TableHeader>
    //                         <TableRow>
    //                             <TableHead>Номер занятия:</TableHead>
    //                             <TableHead>День недели:</TableHead>
    //                             <TableHead>Аудитория:</TableHead>
    //                             <TableHead>Дата:</TableHead>
    //                             <TableHead>Дисциплина:</TableHead>
    //                             <TableHead>Преподаватель:</TableHead>
    //                         </TableRow>
    //                     </TableHeader>
    //                     {data && data.data.rasp.map((item, index) => (
    //                         <TableBody key={index}>
    //                             <TableRow>
    //                                 <TableCell>{item.номерЗанятия} | {item.начало}-{item.конец}</TableCell>
    //                                 <TableCell>{item.день_недели}</TableCell>
    //                                 <TableCell>{item.аудитория}</TableCell>
    //                                 <TableCell>{item.дата}</TableCell>
    //                                 <TableCell>{item.дисциплина}</TableCell>
    //                                 <TableCell>{item.преподаватель}</TableCell>
    //                             </TableRow>
    //                         </TableBody>
    //                     ))}
    //                 </Table>

    //             </div>
    //         )}
    //     </section>
    // )

    return (<div></div>)
}
