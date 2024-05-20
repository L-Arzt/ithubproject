import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function createLesson(id, day, classroom, teacher, discipline) {
    const lesson = await prisma.timetable.create({
        data: {
            numberLesson: Number(id),
            weekDay: Number(day),
            classroom: classroom,
            teacher: teacher,
            discipline: discipline,
        },
    })
    return lesson
}
