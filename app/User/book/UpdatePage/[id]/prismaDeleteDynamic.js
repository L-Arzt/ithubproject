'use server';

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function deleteLesson(params) {
  console.log({ params });
  const deleteLesson = await prisma.timetable.delete({
    where: {
      id: Number(params),
    },
  });
  if (deleteLesson) {
    redirect('/User/TimeTable');
    return {
      message: 'Gotovo',
    };
  }
  return {
    message: 'Ошибка',
  };
}
