
import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import DataTable from 'react-data-table-component';


export default function Category({ auth, categories }) {

    const columns = [
        {
            name: "Name",
            selector: row => row.name,
            sortable: true
        }
    ]

    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Category</h2>}
        createButton={<NavLink href="/category/create" className='bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-4 rounded'>Create</NavLink>}

    >
        <Head title="Product" />
        <div className='m-5 shadow rounded-md'>
            <DataTable columns={columns} data={categories.data} fixedHeader pagination></DataTable>
        </div>
    </AuthenticatedLayout>
}

