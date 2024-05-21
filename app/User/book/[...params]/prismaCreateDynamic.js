'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function createLesson(formData) {

    const data = Object.fromEntries(formData)

    console.log(data);

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
