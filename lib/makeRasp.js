const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

async function getTimeTable() {
    const ClassRooms = [
        {
            roomName: '621-а',
            roomId: 210737156
        },
        {
            roomName: '623-б!',
            roomId: 217739053
        },
        {
            roomName: 'svarka!',
            roomId: 218067665
        },
    ]

    function getNextMonday(date = new Date()) {
        const dateCopy = new Date(date.getTime());

        const nextMonday = new Date(
            dateCopy.setDate(
                dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7),
            ),
        );

        return nextMonday;
    }






    function getDates() {
        let dates = []
        dates.push(new Intl.DateTimeFormat('lt').format(new Date()))
        dates.push(new Intl.DateTimeFormat('lt').format(getNextMonday()))
        dates.push(new Intl.DateTimeFormat('lt').format(getNextMonday(getNextMonday())))
        return dates
    }

    const dates = getDates()

    console.log(dates);

    for (let day of dates) {


        for (let room of ClassRooms) {

            const resp = await (await fetch(`https://edu.donstu.ru/api/Rasp?idAudLine=${room.roomId}&sdate=${day}`)).json()


            for (let para of resp.data.rasp) {

                const lesson = await prisma.timetable.findFirst({

                    where: {
                        code: Number(para.код),
                    }
                })

                if (lesson) {
                    await prisma.timetable.update({
                        where: {
                            code: Number(para.код),
                        },
                        data: {
                            classroom: room.roomName,
                            numberLesson: Number(para.номерЗанятия),
                            weekDay: Number(para.деньНедели),
                            classroom: para.аудитория,
                            discipline: para.дисциплина,
                            group: para.группа,
                            teacher: para.преподаватель,
                            date: new Date(para.дата),
                        }
                    });
                }

                else {

                    await prisma.timetable.create({
                        data: {
                            classroom: room.roomName,
                            code: Number(para.код),
                            numberLesson: Number(para.номерЗанятия),
                            weekDay: Number(para.деньНедели),
                            classroom: para.аудитория,
                            discipline: para.дисциплина,
                            group: para.группа,
                            teacher: para.преподаватель,
                            date: new Date(para.дата),
                        }
                    });
                }


            }
        }


    }

    const timetableData = await prisma.timetable.findMany()
    console.log(timetableData);
}

getTimeTable()
