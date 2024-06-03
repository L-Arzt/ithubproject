import { PrismaClient } from '@prisma/client';
import TimeTable from './TimeTable';
import { ClassRooms } from '../../../lib/general';
export default async function TimeTablePage() {
  const prisma = new PrismaClient({});

  function getMonday(d) {
    d = new Date(d);
    d.setHours(3);
    d.setMinutes(0, 0, 0);

    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  function getSunday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? 0 : 7);
    return new Date(d.setDate(diff));
  }

  const weekRange = {
    monday: getMonday(new Date()),
    sunday: getSunday(new Date()),
  };
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
  return <TimeTable data={data} weekRange={weekRange} />;
}
