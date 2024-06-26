import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from './components/ThemeProvider';
import { getServerSession } from 'next-auth';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <section className="flex items-center min-h-[100vh]">
          <ThemeProvider session={session}>{children}</ThemeProvider>
        </section>
      </body>
    </html>
  );
}
