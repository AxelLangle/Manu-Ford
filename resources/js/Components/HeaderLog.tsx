import { Link } from "@inertiajs/react";
import React from "react";
import logoFord from "../../assets/images/logoFord.jpg";

export default function HeaderLog() {
    return (
        <header>
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
                </div>
            </div>
        </header>
    );
}
