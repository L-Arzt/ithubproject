// import { PrismaClient } from '@prisma/client';
// import TimeTable from './TimeTable';
// import { useState } from 'react';

// export default async function NextWeekTimeTablePage() {
//   const prisma = new PrismaClient();
//   const ClassRooms = ['8-621а', '8-623б', '11-112'];

//   async function getData(weekset) {
//     function getRelativeMonday(d) {
//       d = new Date(d);
//       var day = d.getDay(),
//         diff = d.getDate() - day + (day == 0 ? -6 : 1);
//       return new Date(d.setDate(diff));
//     }

//     function getNextMonday(d) {
//       d = getRelativeMonday(d);
//       d.setDate(d.getDate() + 7);
//       return d;
//     }

//     function getNextSunday(d) {
//       d = getNextSunday(d);
//       d.setDate(d.getDate() + 6);
//       return d;
//     }

//     let RelativeMonday = getRelativeMonday(new Date());
//     let NextMonday = getNextMonday(RelativeMonday);
//     let NextSunday = getNextSunday(NextMonday);

//     // console.log(RelativeMonday);
//     // console.log(NextMonday);
//     // console.log(NextSunday);

//     let data = [];
//     for (let room of ClassRooms) {
//       const resp = await prisma.timetable.findMany({
//         where: {
//           AND: [
//             { classroom: room },
//             {
//               date: {
//                 gte: NextMonday,
//                 lte: NextSunday,
//               },
//             },
//           ],
//         },
//       });

//       data.push({
//         class: room,
//         rasp: resp,
//       });
//     }
//     return data;
//   }

//   const data = await getData(weekset);
//   return <TimeTable data={data} weekset={weekset} setWeekset={setWeekset} />;
// }
