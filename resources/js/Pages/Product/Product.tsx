
import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import "bootstrap/dist/css/bootstrap.min.css";

interface ICategory {
    created_at: string;
    id: number;
    name: string;
}


export default function Product({ auth, products }) {

    const data = products.data;
    const columns = [
        {
            name: "Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "description",
            selector: row => row.description
        },
        {
            name: "price",
            selector: row => row.price,
            sortable: true
        }
    ];
    const ExpandedComponent = ({ data }) => {
        return <div>
            <div className='flex flex-wrap'>
                <ul className='flex '>
                    {data && data.categories.map((cat: ICategory) => (<li key={cat.id} className='p-2 m-1 border shadow rounded-xl text-white bg-blue-500 '>{cat.name}</li>))}
                </ul>
            </div>
            <div className='flex flex-wrat'>
                {data && data.product_images.map((el) => <img src={el.src} className='m-5 border shoadow rounded h-64' alt="" key={el.id} />)}
            </div>
        </div>

    };

    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Product</h2>}
        createButton={<NavLink href="/product/create" className='bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-4 rounded'>Create</NavLink>}

    >
        <Head title="Product" />
        <div className='m-5 shadow rounded-md'>

            <DataTable
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                columns={columns}
                data={data}
                fixedHeader
            ></DataTable>

        </div>
    </AuthenticatedLayout>
}

