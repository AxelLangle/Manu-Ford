import { Head } from '@inertiajs/react';
import BaseLayout from '@/Layouts/BaseLayout';
import VehicleFilter from '@/Components/VehicleFilter';

export default function VehicleFilterDemo() {
  const handleSearch = (filters: any) => {
    console.log('Filtros seleccionados:', filters);
    // Aquí puedes agregar lógica para buscar refacciones basadas en los filtros
  };

  return (
    <BaseLayout>
      <Head title="Filtro de Vehículos" />
      <div className="min-h-screen bg-gray-50 py-12">
        <VehicleFilter onSearch={handleSearch} />
      </div>
    </BaseLayout>
  );
}
