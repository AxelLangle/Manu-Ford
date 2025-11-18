import React from 'react';
import HeaderLog from '@/Components/HeaderLog';
import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';

type GuestLayoutProps = PropsWithChildren<{
    title?: string;
}>;

export default function Guest({ children, title = 'Ford' }: GuestLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex flex-col bg-gray-100">
                <HeaderLog />
                
                <div className="flex-1 flex flex-col items-center pt-6 sm:justify-center sm:pt-0">
                    <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                        {children}
                    </div>
                </div>
            </div>
        </>
    ); 
}
