import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Meu App',
  description: 'Um projeto Next.js para processo seletivo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        <Header /> {/* Header aparece em todas as páginas */}
        <main className="flex-grow container mx-auto py-6">
          {children}
        </main>
        <Footer /> {/* Footer aparece em todas as páginas */}
      </body>
    </html>
  );
}
