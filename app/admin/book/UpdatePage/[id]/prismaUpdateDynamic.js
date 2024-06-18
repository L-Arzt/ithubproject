'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function updateLesson(prevState, formData) {
  const data = Object.fromEntries(formData);

  const createLesson = await prisma.timetable.update({
    where: {
      id: Number(data.id),
    },
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
    revalidatePath('/user/TimeTable');
    return {
      message: 'Готово',
    };
  }
  return {
    message: 'Ошибка',
  };
}
