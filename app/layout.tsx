import type { Metadata } from 'next';
import './globals.css';
import Provider from './provider';
import ReactQueryClient from '@/helper/utils/ReactQueryClient';
import Navbar from '@/components/block/navbar/Navbar';

export const metadata: Metadata = {
  title: 'EDUTUBE',
  description: '원하는 강의만 모아서 볼 수 있어요!',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning={true}>
      <body>
        <div>
          <ReactQueryClient>
            <Navbar />
          </ReactQueryClient>
          <div className="md:mx-8 lg:mx-16 pt-[83px]">
            <Provider>
              <ReactQueryClient>{children}</ReactQueryClient>
              <ReactQueryClient>{modal}</ReactQueryClient>
            </Provider>
          </div>
        </div>
      </body>
    </html>
  );
}
