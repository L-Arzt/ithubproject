import { ClassRooms } from '../../../lib/general';
import { PrismaClient } from '@prisma/client';
export async function POST(req) {
  const weekRange = await req.json();
  const prisma = new PrismaClient();
  async function getData() {
    let data = [];
    for (let room of ClassRooms) {
      const resp = await prisma.timetable.findMany({
        where: {
          AND: [
            { classroom: room },
            {
              date: {
                gte: weekRange.monday,
                lte: weekRange.sunday,
              },
            },
          ],
        },
      });

      data.push({
        class: room,
        rasp: resp,
      });
    }
    return data;
  }
  const data = await getData();

  return Response.json({ data });
}
