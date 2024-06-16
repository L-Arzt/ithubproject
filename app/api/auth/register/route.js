// import { PrismaClient } from '@prisma/client';
// import { hash } from 'bcrypt';
// export async function POST(request) {
//   const { email, password } = await request.json();

//   console.log({ email, password });

//   const prisma = new PrismaClient();
//   const hashedPass = await hash(password, 10);
//   const resp = await prisma.users.create({
//     data: {
//       email: email,
//       password: hashedPass,
//     },
//   });

//   return Response.json({ message: 'ok' });
// }
