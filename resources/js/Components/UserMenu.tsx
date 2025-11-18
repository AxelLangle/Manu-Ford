import { useState, useRef, useEffect } from "react";
import { User, Settings, ShoppingBag, HelpCircle, LogOut, LogIn } from "lucide-react";
import { Link } from '@inertiajs/react';


// NOTE: `useAuth` is provided by the application's auth layer. We declare it here for
// TypeScript during development so the temporary override below doesn't error at compile time.
// When you restore real auth, ensure the actual `useAuth` hook is available and remove this declaration if desired.
declare const useAuth: any;

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Development override: disable real auth checks and force a known state.
  // Set DEV_AUTH_OVERRIDE to `true` while developing so the menu shows an authenticated state.
  // To restore production behavior, set DEV_AUTH_OVERRIDE = false and remove/replace the
  // override below so the actual `useAuth` hook controls `isLogged` and `logout`.
  const DEV_AUTH_OVERRIDE = true;

  // Call the auth hook (if available) so hooks order stays consistent. We will override its
  // returned values when DEV_AUTH_OVERRIDE is enabled.
  // NOTE: keep this call here and do not remove it unless you replace with actual logic.
  // Example to restore: const { isLogged, logout } = useAuth(true);
  // (The line above is intentionally shown in the comment — you can paste it back later.)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _auth: any = (typeof useAuth !== 'undefined') ? (useAuth as any)(true) : { isLogged: false, logout: () => {} };
  let { isLogged, logout } = _auth;

  if (DEV_AUTH_OVERRIDE) {
    // Force a logged-in state for development and provide a noop logout handler.
    isLogged = true;
    logout = () => {
      // Development stub: replace with real logout when integrating auth.
      // eslint-disable-next-line no-console
      console.log('[DEV] logout called (stub)');
    };
  }
  const menuRef = useRef<HTMLDivElement>(null);

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
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[40px] h-[40px] flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 transition-colors"
      >
        <User className="w-7 h-7 text-artra-navy" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[60px] z-50">
          {/* Arrow */}
          <div className="absolute -top-3 right-4 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-artra-blue"></div>
          
          <div className="w-[268px] bg-white border-2 border-artra-blue rounded-2xl shadow-lg overflow-hidden">
            {isLogged ? (
              // Logged In Menu
              <div>
                <button className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <User className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Ver cuenta
                  </span>
                </button>

                <button className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <Settings className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Configuraciones
                  </span>
                </button>

                <button className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <ShoppingBag className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Mis compras
                  </span>
                </button>

                <button className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <HelpCircle className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Ayuda
                  </span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/35">
                    <LogOut className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Cerrar sesión
                  </span>
                </button>
              </div>
            ) : (
              // Logged Out Menu
              <div>
                <button className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/20">
                    <HelpCircle className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Ayuda
                  </span>
                </button>

                <button
                    onClick={() => {
                    setIsOpen(false);
                    // Fallback navigation for development: use location change.
                    // In production with Inertia you could replace this with Inertia.visit('/login')
                    window.location.href = '/login';
                  }}
                  className="w-full h-14 px-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-artra-lighter-blue/35">
                    <LogIn className="w-7 h-7 text-artra-navy" />
                  </div>
                  <span className="text-artra-dark-navy text-lg font-medium">
                    Iniciar sesión
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
