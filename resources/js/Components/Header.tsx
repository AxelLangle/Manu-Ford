import { Link } from '@inertiajs/react';
import React from 'react';
import logoFord from '../../assets/images/logoFord.jpg';
import IconoHamburger from './IconoHamburger';
import UserMenu from './UserMenu';
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishListContext";
import SearchBar from './SearchBar';
import { Heart, ShoppingCart } from 'lucide-react';
import MapIcon from '@mui/icons-material/Map';
import DriveEtaIcon from '@mui/icons-material/DriveEta';


//Tailwind clases reusables

export const NAV_LINK = "text-white text-base font-semibold hover:text-artra-lighter-blue transition-colors" as const;
export const ICON_BUTTON = "p-2 flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 transition-colors relative" as const;
export const BADGE_COUNT = "absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center" as const;
export const ICON_NAVY_24 = "w-6 h-6 text-artra-navy" as const;
export const INLINE_ROW_TIGHT = "flex items-center gap-1 mt-0" as const;
export const SMALL_WHITE_LABEL = "text-white text-[12px] font-semibold" as const;

export const HeaderClasses = {
    NAV_LINK,
    ICON_BUTTON,
    BADGE_COUNT,
    ICON_NAVY_24,
    INLINE_ROW_TIGHT,
    SMALL_WHITE_LABEL,
} as const;
// (icons imported above)
type Props = {
    title?: string;
    children?: React.ReactNode;
};

export default function Header({ title, children }: Props) {
    // Load cart and wishlist from context so we can show counts.
    // Use `any` and fallback keys to be resilient during development while contexts stabilize.
    // Replace with proper typed destructuring when your contexts expose explicit keys.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cartCtx: any = useCart();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wishlistCtx: any = useWishlist();
    const cartItems = cartCtx?.cartItems ?? cartCtx?.items ?? [];
    const wishlistItems = wishlistCtx?.wishlistItems ?? wishlistCtx?.items ?? [];
    // NOTE: compact header adjustments
    // This header version reduces vertical space (smaller top bar and reduced white header height).
    // To expand again, edit the heights on the grid container below (h-16 / md:h-20 / lg:h-24).
    return (
        <header>
            <div className="items-right right flex justify-between bg-[#060357] px-2">
                <Link href="https://www.google.com.mx/maps/place/Ford+Zapata+Pachuca/@20.0775706,-98.7780583,15.62z/data=!4m6!3m5!1s0x85d1a0e90aeef109:0xa374cd507f73452!8m2!3d20.0810678!4d-98.7733602!16s%2Fg%2F1td8zgcx?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D" className="ml-auto text-xs text-wrap text-white hover:underline text to-blue-600">
                    <MapIcon className="inline mr-1" />
                    Blvd. Felipe Ángeles 2307, Venta Prieta, 42083 Pachuca de
                    Soto, Hgo. Mexico
                </Link>
            </div>

            {/*Parte blanca del Header */}
            <div className="bg-white shadow-md">
                {/* CSS grid para dividir la parte blanca del header */}
                <div className="grid h-16 max-w-7xl grid-rows-2 px-0 pl-2 md:h-16 lg:h-20">
                    {/* Top header */}
                    <div className="row-start-1 flex items-center">
                        {/* Logo boton en la parte superior izquierda */}
                        <div className="flex items-center space-x-3">
                            <Link href="#" className="inline-block">
                                <img
                                    src={logoFord}
                                    alt="Ford logo"
                                    className="h-6 w-auto object-contain"
                                />
                            </Link>
                            <span className="text-xs text-[#060357]">
                                GRANDES PROMOCIONES Y LAS MEJORES REFACCIONES
                            </span>
                        </div>
                    </div>

                    {/* Bottom header: left (hamburger + add), center (search), right (icons + user) */}
                    <div className="row-start-2 flex items-center w-full px-8 gap-12">
                        {/* Left cluster */}
                        <div className="flex items-center space-x-4">
                            <IconoHamburger />
                        </div>
                        <div className="ml-16">
                            <Link
                                href="#"
                                onClick={() => {
                                    console.info('Se agrego un vehiculo');
                                }}
                                className="inline-flex items-center px-3 py-1 text-sm whitespace-nowrap flex-shrink-0"
                            >
                                <DriveEtaIcon className="mr-3" sx={{ color: '#060357' }} />
                                Agregar Vehiculo
                            </Link>
                        </div>

                        {/* Center: search takes available space */}
                        <div className="ml-16 flex-1 mx-2">
                            <SearchBar />
                        </div>

                        {/* Right cluster: icons and user menu */}
                        <div className="flex items-center space-x-6 ml-5">
                            <Link href="/favoritos" className={ICON_BUTTON}>
                                <Heart className={ICON_NAVY_24} />
                                {wishlistItems.length > 0 && (
                                    <span className={BADGE_COUNT}>{wishlistItems.length}</span>
                                )}
                            </Link>

                            <Link href="/carrito" className={ICON_BUTTON}>
                                <ShoppingCart className={ICON_NAVY_24} />
                                {cartItems.length > 0 && (
                                    <span className={BADGE_COUNT}>{cartItems.length}</span>
                                )}
                            </Link>

                            <UserMenu />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
