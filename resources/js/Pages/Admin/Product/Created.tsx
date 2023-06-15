
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import { useState } from 'react';



export default function Created({ auth }) {
    const [form, setForm] = useState();
    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Product</h2>}
    >
        <Head title="Product" />

    </AuthenticatedLayout>
}