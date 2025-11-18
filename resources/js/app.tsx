import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { CartProvider } from '@/Contexts/CartContext';
import { WishlistProvider } from '@/Contexts/WishListContext';

const appName = import.meta.env.VITE_APP_NAME || 'Ford Zapata';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <CartProvider>
                <WishlistProvider>
                    <App {...props} />
                </WishlistProvider>
            </CartProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
