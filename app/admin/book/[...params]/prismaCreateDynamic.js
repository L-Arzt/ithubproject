'use server';

import { PrismaClient } from '@prisma/client';
import Book from './page';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function createLesson(prevState, formData) {
  const data = Object.fromEntries(formData);

  const lesson = await prisma.timetable.findFirst({
    where: {
      date: new Date(data.date),
      numberLesson: Number(data.lessonNum),
      classroom: decodeURIComponent(data.audt),
    },
  });

  console.log(lesson);

  if (lesson) {
    return {
      message: 'Уже занято',
    };
  }

  const createLesson = await prisma.timetable.create({
    data: {
      numberLesson: Number(data.lessonNum),
      weekDay: Number(data.lessonDay),
      classroom: decodeURIComponent(data.audt),
      teacher: data.teacher,
      discipline: data.discipline,
      group: data.group,
      date: new Date(data.date),
      booked: true,
    },
  });
  if (createLesson) {
    revalidatePath('/User/TimeTable');
    return {
      message: 'Готово',
    };
  }
  return {
    message: 'Ошибка',
  };
}
