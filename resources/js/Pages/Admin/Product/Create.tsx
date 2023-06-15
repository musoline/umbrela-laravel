
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';

import React, { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { useState } from 'react';

interface IRegisterFormState {
    auth: any
}

interface IFormState {
    [key: string]: string
}

export default function Create({ auth }) {
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
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.post("product", form)
    }

    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Product</h2>}
    >
        <Head title="Product" />
        <div className='max-w-7xl mx-auto'>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto pt-12">
                <div>
                    <label htmlFor="name">Name</label>
                    <input className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00'
                        id='name'
                        name='name'
                        value={form?.name || ''}
                        onChange={handleChange}
                    />
                    <div className='text-xs' style={{ color: "red" }}>{errors.name}</div>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00'
                        id='description'
                        onChange={handleChange}
                    >{form?.description}</textarea>
                    <div className='text-xs' style={{ color: "red" }}>{errors.description}</div>

                </div>
                <div>
                    <label htmlFor="name">Price</label>
                    <input className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00'
                        id='price'
                        name='price'
                        value={form?.price || ''}
                        onChange={handleChange}
                    />
                    <div className='text-xs' style={{ color: "red" }}>{errors.price}</div>
                </div>
                <button type='submit' className='bg-white-500 border border-gray-900 text-gray-900 text-sm py-5 px-7 my-5 rounded'>Send Data</button>
            </form>
        </div>
    </AuthenticatedLayout>
}

