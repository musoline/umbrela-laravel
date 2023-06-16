
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';

import React, { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { useState } from 'react';



interface IFormState {
    [key: string]: string | File[]
}

export default function CategoryCreate({ auth }) {
    const { errors } = usePage().props;
    const [form, setForm] = useState<IFormState>();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const key = event.target.id;
        const value = event.target.value;
        setForm({
            ...form,
            [key]: value
        })
        console.log(form)
    }
    const handleSubmitFile = (event: ChangeEvent<HTMLInputElement>) => {
        const key = event.target.id;

        const value = []

        for (let i = 0; i < event.target.files.length; i++) {
            value.push(event.target.files[i])
        }

        setForm({
            ...form,
            [key]: value
        })
    }


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.post("category", form, { forceFormData: true })
    }

    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Category</h2>}
    >
        <Head title="Product" />
        <div className='max-w-7xl mx-auto'>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto pt-12" encType='multipart/form-data'>
                <div>
                    <label htmlFor="name">Name</label>
                    <input className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00'
                        id='name'
                        name='name'
                        value={form?.name as string || ''}
                        onChange={handleChange}
                    />
                    <div className='text-xs' style={{ color: "red" }}>{errors.name}</div>
                </div>
                <button type='submit' className='bg-white-500 border border-gray-900 text-gray-900 text-sm py-5 px-7 my-5 rounded'>Send Data</button>
            </form>
        </div>
    </AuthenticatedLayout>
}

