import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import logoFord from '../../assets/images/logoFord.jpg';

type GuestProps = PropsWithChildren<{ noCard?: boolean }>;

export default function Guest({ children, noCard }: GuestProps) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-white pt-20 sm:pt-24 sm:justify-center">
            <header className="w-full absolute top-0 left-0 z-20">
                <div className="w-%full">
                    <div className="flex items-start py-2 pl-0">
                        <Link href="/">
                            <img src={logoFord} alt="Ford" className="h-16 sm:h-20 object-contain ml-4 mt-2"  />
                        </Link>
                    </div>
                </div>
            </header>

            {noCard ? (
                <div className="w-full">{children}</div>
            ) : (
                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            )}
        </div>
    );
}
