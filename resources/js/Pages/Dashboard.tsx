import BaseLayout from '@/Layouts/BaseLayout';

export default function Dashboard() {
    return (
        <BaseLayout title="Dashboard">
            <h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>
            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-0 lg:px-0">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}
