import React, { Fragment } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';



export default function Welcome() {
    return (
        <BaseLayout>
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <h1 className="mb-6 text-4xl font-bold text-gray-900">Bienvenido a la plataforma Ford</h1>
                <p className="mb-8 text-lg text-gray-700">
                    Explora nuestra amplia gama de vehículos y descubre las últimas novedades de Ford.
                </p>
                <Link href="/explore" className="inline-block rounded bg-blue-600 px-4 py-2 text-white">
                    Explorar
                </Link>
            </div>
        </BaseLayout>

    );

}
