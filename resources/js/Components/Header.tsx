import { Link } from '@inertiajs/react';
import React from 'react';
import logoFord from '../../assets/images/logoFord.jpg';
import IconoHamburger from './IconoHamburger';
import UserMenu from './UserMenu';
import { useCart } from "@/Contexts/CartContext";
import { useWishlist } from "@/Contexts/WishListContext";
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
                <div className="w-full max-w-[90vw] mx-auto px-[1vw] py-[0.5vh]">
                    {/* Top header */}
                    <div className="flex items-center justify-start mb-[0.5vh]">
                        {/* Logo boton en la parte superior izquierda */}
                        <div className="flex items-start gap-[1vw]">
                            <Link href="#" className="inline-block flex-shrink-0">
                                <img
                                    src={logoFord}
                                    alt="Ford logo"
                                    className="h-[clamp(1rem,1.5vw,2rem)] w-auto object-contain"
                                />
                            </Link>
                            <span className="text-[clamp(0.65rem,0.75vw,1rem)] text-[#060357] whitespace-nowrap">
                                GRANDES PROMOCIONES Y LAS MEJORES REFACCIONES
                            </span>
                        </div>
                    </div>

                    {/* Bottom header: left (hamburger + add), center (search), right (icons + user) */}
                    <div className="flex items-center justify-between gap-[clamp(0.5rem,1vw,1.5rem)] min-h-[clamp(2.5rem,4vh,4rem)]">
                        {/* Left cluster */}
                        <div className="flex items-center gap-[clamp(0.5rem,1vw,1rem)] flex-shrink-0">
                            <IconoHamburger />
                            <Link
                                href="#"
                                onClick={() => {
                                    console.info('Se agrego un vehiculo');
                                }}
                                className="inline-flex items-center px-[clamp(0.5rem,0.75vw,1rem)] py-[0.5vh] text-[clamp(0.7rem,0.85vw,1rem)] whitespace-nowrap"
                            >
                                <DriveEtaIcon className="mr-[clamp(0.25rem,0.5vw,0.75rem)]" sx={{ color: '#060357', fontSize: 'clamp(1.1rem, 1.5vw, 1.75rem)' }} />
                                Agregar Vehiculo
                            </Link>
                        </div>

                        {/* Center: search takes available space */}
                        <div className="flex-1 min-w-0 max-w-[clamp(20rem,35vw,40rem)] mx-[clamp(0.5rem,1vw,1.5rem)]">
                            <SearchBar />
                        </div>

                        {/* Right cluster: icons and user menu */}
                        <div className="flex items-center gap-[clamp(0.5rem,0.75vw,1rem)] flex-shrink-0">
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
