'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function createLesson(formData) {

    const data = Object.fromEntries(formData)

    // console.log(data);

    const lesson = await prisma.timetable.create({
        data: {
            numberLesson: Number(data.lessonNum),
            weekDay: Number(data.lessonDay),
            classroom: data.audt,
            teacher: data.teacher,
            discipline: data.discipline,
        },
    })
    return lesson
}
