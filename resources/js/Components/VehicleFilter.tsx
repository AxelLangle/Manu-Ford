import { useState } from 'react';

interface VehicleFilterProps {
  onSearch?: (filters: VehicleFilterState) => void;
}

interface VehicleFilterState {
  year: string;
  brand: string;
  model: string;
  version: string;
}

export default function VehicleFilter({ onSearch }: VehicleFilterProps) {
  const [filters, setFilters] = useState<VehicleFilterState>({
    year: '',
    brand: '',
    model: '',
    version: '',
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Mock data for dropdowns
  const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
  const brands = ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan'];
  const models = ['Fiesta', 'Focus', 'Mustang', 'Ranger', 'F-150'];
  const versions = ['Base', 'SE', 'XLT', 'Limited', 'Platinum'];

  const handleFilterChange = (field: keyof VehicleFilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setOpenDropdown(null);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(filters);
    }
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div
      data-layer="Filtro vehiculos"
      data-node-id="884-535"
      className="FiltroVehiculos w-full max-w-[1233px] mx-auto relative py-8 px-4"
    >
      {/* Background */}
      <div
        data-layer="Rectangle 23"
        data-node-id="884-536"
        className="Rectangle23 absolute inset-0 opacity-80 bg-white rounded-[15px] -z-10"
      />

      {/* Top bar */}
      <div
        data-layer="Rectangle 31"
        data-node-id="884-559"
        className="Rectangle31 absolute top-0 left-0 right-0 h-[13px] bg-[#060357] rounded-t-[15px]"
      />

      {/* Title and Subtitle */}
      <div className="mb-8 mt-2">
        <h2
          data-layer="Encuentra la refacción Correcta"
          data-node-id="884-557"
          className="EncuentraLaRefacciNCorrecta text-center text-black text-lg font-semibold font-['Inter'] capitalize mb-2"
        >
          Encuentra la refacción Correcta
        </h2>
        <p
          data-layer="Selecciona tu vehículo paso a paso o busca directamente tu refacción"
          data-node-id="884-558"
          className="SeleccionaTuVehCuloPasoAPasoOBuscaDirectamenteTuRefacciN text-center text-black text-[15px] font-bold font-['Inter']"
        >
          Selecciona tu vehículo paso a paso o busca directamente tu refacción
        </p>
      </div>

      {/* Filters Container */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8 flex-wrap">
        {/* Year Filter */}
        <div data-layer="Frame 14" data-node-id="884-552" className="Frame14 relative w-full md:w-[267px]">
          <div
            data-layer="Rectangle 6"
            data-node-id="884-556"
            className="Rectangle6 w-full h-10 absolute inset-0 opacity-60 bg-[#f5f0f0] rounded-[15px] border border-black"
          />
          <div className="relative h-10 flex items-center px-4 cursor-pointer" onClick={() => toggleDropdown('year')}>
            <div
              data-layer="Frame 13"
              data-node-id="884-553"
              className="Frame13 flex-1"
            >
              <div
                data-layer="Selecciona el año"
                data-node-id="884-554"
                className="SeleccionaElAO text-[#999999] text-base font-thin font-['Inter'] capitalize"
              >
                {filters.year || 'Selecciona el año'}
              </div>
            </div>
            <div
              data-layer="Chevron down"
              data-node-id="884-555"
              className="ChevronDown w-[35px] h-6 opacity-80 overflow-hidden flex items-center justify-center"
            >
              <img
                data-layer="Icon"
                data-node-id="I884-555;7758:11222"
                className="Icon w-[17.50px] h-1.5"
                src="/assets/I884-555;7758-11222.svg"
                alt="Chevron down"
              />
            </div>
          </div>

          {/* Dropdown Menu */}
          {openDropdown === 'year' && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black rounded-[15px] shadow-lg z-10">
              {years.map((year) => (
                <div
                  key={year}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#999999] text-base font-thin font-['Inter']"
                  onClick={() => handleFilterChange('year', year)}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Brand Filter */}
        <div data-layer="Frame 15" data-node-id="884-547" className="Frame15 relative w-full md:w-[267px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <div
            data-layer="Rectangle 7"
            data-node-id="884-548"
            className="Rectangle7 w-full h-10 absolute inset-0 opacity-60 bg-[#f5f0f0] rounded-[15px] border border-black"
          />
          <div className="relative h-10 flex items-center px-4 cursor-pointer" onClick={() => toggleDropdown('brand')}>
            <div
              data-layer="Frame 12"
              data-node-id="884-549"
              className="Frame12 flex-1"
            >
              <div
                data-layer="Selecciona la marca"
                data-node-id="884-550"
                className="SeleccionaLaMarca text-[#999999]/60 text-base font-thin font-['Inter'] capitalize"
              >
                {filters.brand || 'Selecciona la marca'}
              </div>
            </div>
            <div
              data-layer="Chevron down"
              data-node-id="884-551"
              className="ChevronDown w-[35px] h-6 opacity-80 overflow-hidden flex items-center justify-center"
            >
              <img
                data-layer="Icon"
                data-node-id="I884-551;7758:11222"
                className="Icon w-[17.50px] h-1.5"
                src="/assets/I884-551;7758-11222.svg"
                alt="Chevron down"
              />
            </div>
          </div>

          {/* Dropdown Menu */}
          {openDropdown === 'brand' && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black rounded-[15px] shadow-lg z-10">
              {brands.map((brand) => (
                <div
                  key={brand}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#999999] text-base font-thin font-['Inter']"
                  onClick={() => handleFilterChange('brand', brand)}
                >
                  {brand}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Model Filter */}
        <div data-layer="Frame 16" data-node-id="884-542" className="Frame16 relative w-full md:w-[267px]">
          <div
            data-layer="Rectangle 8"
            data-node-id="884-543"
            className="Rectangle8 w-full h-10 absolute inset-0 opacity-60 bg-[#f5f0f0] rounded-[15px] border border-black"
          />
          <div className="relative h-10 flex items-center px-4 cursor-pointer" onClick={() => toggleDropdown('model')}>
            <div
              data-layer="Frame 11"
              data-node-id="884-544"
              className="Frame11 flex-1"
            >
              <div
                data-layer="Selecciona el modelo"
                data-node-id="884-545"
                className="SeleccionaElModelo text-[#999999] text-base font-thin font-['Inter'] capitalize"
              >
                {filters.model || 'Selecciona el modelo'}
              </div>
            </div>
            <div
              data-layer="Chevron down"
              data-node-id="884-546"
              className="ChevronDown w-[35px] h-6 opacity-80 overflow-hidden flex items-center justify-center"
            >
              <img
                data-layer="Icon"
                data-node-id="I884-546;7758:11222"
                className="Icon w-[17.50px] h-1.5"
                src="/assets/I884-546;7758-11222.svg"
                alt="Chevron down"
              />
            </div>
          </div>

          {/* Dropdown Menu */}
          {openDropdown === 'model' && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black rounded-[15px] shadow-lg z-10">
              {models.map((model) => (
                <div
                  key={model}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#999999] text-base font-thin font-['Inter']"
                  onClick={() => handleFilterChange('model', model)}
                >
                  {model}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Version Filter */}
        <div data-layer="Frame 17" data-node-id="884-537" className="Frame17 relative w-full md:w-[267px]">
          <div
            data-layer="Rectangle 9"
            data-node-id="884-538"
            className="Rectangle9 w-full h-10 absolute inset-0 opacity-60 bg-[#f5f0f0] rounded-[15px] border border-black"
          />
          <div className="relative h-10 flex items-center px-4 cursor-pointer" onClick={() => toggleDropdown('version')}>
            <div
              data-layer="Frame 10"
              data-node-id="884-539"
              className="Frame10 flex-1"
            >
              <div
                data-layer="Selecciona la version"
                data-node-id="884-540"
                className="SeleccionaLaVersion text-[#999999] text-base font-thin font-['Inter'] capitalize"
              >
                {filters.version || 'Selecciona la version'}
              </div>
            </div>
            <div
              data-layer="Chevron down"
              data-node-id="884-541"
              className="ChevronDown w-[35px] h-6 opacity-80 overflow-hidden flex items-center justify-center"
            >
              <img
                data-layer="Icon"
                data-node-id="I884-541;7758:11222"
                className="Icon w-[17.50px] h-1.5"
                src="/assets/I884-541;7758-11222.svg"
                alt="Chevron down"
              />
            </div>
          </div>

          {/* Dropdown Menu */}
          {openDropdown === 'version' && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black rounded-[15px] shadow-lg z-10">
              {versions.map((version) => (
                <div
                  key={version}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#999999] text-base font-thin font-['Inter']"
                  onClick={() => handleFilterChange('version', version)}
                >
                  {version}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center">
        <button
          data-layer="Boton Agregar al carrito"
          data-node-id="884-560"
          className="BotonAgregarAlCarrito w-[140px] h-10 bg-[#060357] rounded-lg overflow-hidden hover:bg-[#0a0449] transition-colors duration-150"
          onClick={handleSearch}
        >
          <div data-layer="Frame 18" data-node-id="884-561" className="Frame18 w-full h-full flex items-center justify-center">
            <div
              data-layer="Depth 6, Frame 0"
              data-node-id="884-562"
              className="Depth6Frame0 flex flex-col justify-start items-center"
            >
              <div
                data-layer="Buscar"
                data-node-id="884-563"
                className="Buscar text-center text-[#f7f9fc] text-[15px] font-bold font-['Inter']"
              >
                Buscar
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
