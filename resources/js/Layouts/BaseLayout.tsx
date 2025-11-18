import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

type Props = {
  title?: string;
  children: React.ReactNode;
  showNav?: boolean;
  className?: string;
};

export default function BaseLayout({
  title,
  children,
  showNav = true,
  className = '',
}: Props) {
  return (
    <>
      <Head title={title ?? 'Ford'} />

      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        {showNav && (
          <div className="w-full border-b border-gray-100">
            <div className="mx-auto w-full max-w-7xl px-4">
              <Header title={title} />
            </div>
          </div>
        )}

        {/* main will expand to fill available space so footer stays at the bottom */}
        <main className={`flex-1 mx-auto w-full max-w-7xl px-4 py-6 ${className}`}>
          {children}
        </main>

        {/* optional spacer to push footer further down. Change the class below to adjust:
            examples: h-24 (96px), h-32 (128px), h-48 (192px), h-64 (256px)
            or replace with inline style: style={{ height: '300px' }} */}
        <div className="h-48" aria-hidden="true" />

        {/* ensure footer is pushed to the bottom when main has little content */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
