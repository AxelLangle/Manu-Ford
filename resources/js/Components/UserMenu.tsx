import { useState, useRef, useEffect } from 'react';
import { User, Settings, ShoppingBag, HelpCircle, LogOut, LogIn } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

// UserMenu ahora utiliza directamente la autenticación compartida por Inertia (Laravel Breeze).
// El middleware `HandleInertiaRequests` expone `auth.user`. Si `auth.user` es null => invitado.
export default function UserMenu(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { props } = usePage<any>();
  const user = props?.auth?.user ?? null;
  const isLogged = !!user;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
//<button class="p-2 flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart w-6 h-6 text-artra-navy" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg></button>
  return (
    <div className="relative flex items-center gap-3" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[40px] h-[40px] flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 transition-colors"
      >
        <User className="w-7 h-7 text-artra-navy" />
      </button>

      {!isLogged && (
        <Link
          href={route('login')}
          className="px-4 py-2 bg-[#060357] text-white text-sm font-medium rounded-lg hover:bg-[#04024a] transition-colors whitespace-nowrap"
        >
          Iniciar sesión
        </Link>
      )}

      {isOpen && (
        <div className="absolute right-0 top-[60px] z-50">
          {/* Arrow */}
          <div className="absolute -top-3 right-4 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-artra-blue"></div>
          
          <div className="w-[268px] bg-white border-2 border-artra-blue rounded-2xl shadow-lg overflow-hidden">
            {isLogged ? (
              // Logged In Menu
              <div>
                <Link
                  href={route('profile.edit')}
                  className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <User className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    {user?.name || 'Cuenta'}
                  </span>
                </Link>

                <button type="button" className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <Settings className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Configuraciones
                  </span>
                </button>

                <button type="button" className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <ShoppingBag className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Mis compras
                  </span>
                </button>

                <button type="button" className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <HelpCircle className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Ayuda
                  </span>
                </button>

                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  onClick={() => setIsOpen(false)}
                  onSuccess={() => window.location.href = '/'}
                  className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/35">
                    <LogOut className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Cerrar sesión
                  </span>
                </Link>
              </div>
            ) : (
              // Logged Out Menu
              <div>
                <button type="button" className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <HelpCircle className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Ayuda
                  </span>
                </button>

                <Link
                  href={route('login')}
                  as="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/35">
                    <LogIn className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Iniciar sesión
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
