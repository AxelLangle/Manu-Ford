import React from 'react';
import { Link } from '@inertiajs/react';
import logoFord from '../../assets/images/logoFord.jpg';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export default function Footer() {
  return (
    <footer className="bg-gray-50 mt-8">
      <div className="mx-auto max-w-7xl px-4">

        {/* Row 1: logo (left) + social icons (right) */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="#" className="inline-block">
              <img src={logoFord} alt="Ford logo" className="h-8 w-auto object-contain" />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-gray-800">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-gray-800">
              <TwitterIcon />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-gray-800">
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Divider between row1 and row2 */}
        <div className="w-full h-[1px] bg-[#060357]" />

        {/* Row 2: three centered columns with links (vertical dividers on md+) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 text-center">
          <div className="">
            {/* Esta es la primera ubicacion, la de la izquierda */}
            <Link href="#" className="text-gray-700 hover:underline">
              <p><LocationOnOutlinedIcon className="inline mr-1" />
              <strong className='text-[#060357] text-xl'>Tulancingo</strong>
              <br />
              <br />
              <span className='text-[#060357]'>Carretera, Mexico - Tuxpan 1461, Reforma la Presa, 43645 Tulancingo, Hgo.</span>
              </p>

            </Link>
          </div>
          <div className="md:border-l md:border-[#060357] md:pl-6 md:pr-6">
            {/* Esta es la segunda ubicacion, la del centro */}
            <Link href="#" className="text-gray-700 hover:underline">
              <p><LocationOnOutlinedIcon className="inline mr-1" />
              <strong className='text-[#060357] text-xl'>Pachuca</strong>
              <br />
              <br />
              <span className='text-[#060357]'>Blvd. Felipe Ángeles 2307, Venta Prieta, 42083 Pachuca de Soto, Hgo.</span>
              </p>

            </Link>
          </div>
          <div className="md:border-l md:border-[#060357] md:pl-6 md:pr-6">
            {/* Esta es la tercera ubicacion, la de la derecha */}
            <Link href="#" className="text-gray-700 hover:underline">
              <p><LocationOnOutlinedIcon className="inline mr-1" />
              <strong className='text-[#060357] text-xl'>Tula</strong>
              <br />
              <br />
              <span className='text-[#060357]'>Calz Melchor Ocampo 104, San Pedro Alpuyeca, 42800 Tula de Allende, Hgo.</span>
              </p>

            </Link>
          </div>
        </div>

        {/* Row 3: legal links */}
        <div className="py-4">
          <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm">
            <Link href="#" className="hover:underline">
              Aviso de Facturacion
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="#" className="hover:underline">
              Terminos de condiciones y uso
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="#" className="hover:underline">
              Aviso de privacidad
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="#" className="hover:underline">
              Politicas de envio y devoluciones
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="#" className="hover:underline">
              Contactanos
            </Link>
          </div>
        </div>

        {/* Row 4: copyright */}
        <div className="py-4 text-center text-sm text-gray-600">
          &copy; 2025 Ford Zapata. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
