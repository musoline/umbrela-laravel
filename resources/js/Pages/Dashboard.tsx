import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React from 'react';
import DataTable from 'react-data-table-component';


enum EClickEvent {
    DELETE,
    SHOW
}

type TEClickEvent = EClickEvent;



const handleButtonClick = (event: TEClickEvent, id: number) => {
    switch (event) {
        case EClickEvent.DELETE: router.delete(`/product/${id}`);
            break;
        case EClickEvent.SHOW: router.get(`/product/${id}`);
            break;
        default: console.log("No Correct Event")
    }

}



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
    }, {
        name: "Actions",
        button: true,
        cell: (row) => (<div>
            <button
                className="p-1 m-1 bg-red-600 rounded shadow text-white"
                onClick={(e) => handleButtonClick(EClickEvent.DELETE, row.id)}
            >
                Delete
            </button>
            <button
                className="p-1 m-1 bg-green-600 rounded shadow text-white"
                onClick={(e) => handleButtonClick(EClickEvent.SHOW, row.id)}
            >
                Show
            </button>
        </div>
        ),
    }
];

export default function Dashboard({ auth, products }) {
    const data = products.data

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-1xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <DataTable
                            title="Products"
                            columns={columns}
                            data={data}
                            fixedHeader
                            highlightOnHover
                            pointerOnHover
                        ></DataTable>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
