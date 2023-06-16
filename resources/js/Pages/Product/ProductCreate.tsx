
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';

import React, { ChangeEvent } from 'react';
import { FormEvent } from 'react';
import { useState } from 'react';

interface IFormState {
    [key: string]: string | File[]
}

export default function ProductCreate({ auth, categories }) {
    const { errors } = usePage().props;
    const [form, setForm] = useState<IFormState>();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const key = event.target.id;
        const value = event.target.value;
        console.log(value)
        setForm({
            ...form,
            [key]: value
        })
    }

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const key = event.target.id;
        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        console.log(value)
        setForm({
            ...form,
            [key]: value
        })
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
        router.post("/product", form, { forceFormData: true })
    }

    const imagesPreview = (els) => {
        return els && els.map((photo) => {
            const objectUrl = URL.createObjectURL(photo)
            return <img src={objectUrl} key={photo.lastModified} className='h-40 p-5 m-5' />
        })
    }

    const renderCats = (cats) => {

        return cats && cats.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)

    }

    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Product</h2>}
    >
        <Head title="Product" />
        <div className='max-w-7xl mx-auto'>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto pt-12" encType='multipart/form-data'>

                <div>
                    <label htmlFor="category">Category</label>
                    <select
                        name="category"
                        id="category"
                        multiple={true}
                        size={4}
                        onChange={handleSelectChange}
                        className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                        {renderCats(categories)}
                    </select>
                </div>

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
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00'
                        id='description'
                        onChange={handleChange}
                    >{form?.description as string}</textarea>
                    <div className='text-xs' style={{ color: "red" }}>{errors.description}</div>

                </div>
                <div>
                    <label htmlFor="name">file</label>
                    <input className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00'
                        id='file'
                        type="file"
                        multiple
                        name='file'
                        value={""}
                        onChange={handleSubmitFile}
                    />
                    <div className='text-xs' style={{ color: "red" }}>{errors.file}</div>
                </div>
                <div className='flex flex-wrap'>{imagesPreview(form?.file) || ""}</div>
                <div>
                    <label htmlFor="name">Price</label>
                    <input className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00'
                        id='price'
                        name='price'
                        value={form?.price as string || ''}
                        onChange={handleChange}
                    />
                    <div className='text-xs' style={{ color: "red" }}>{errors.price}</div>
                </div>
                <button type='submit' className='bg-white-500 border border-gray-900 text-gray-900 text-sm py-5 px-7 my-5 rounded'>Send Data</button>
            </form>
        </div>
    </AuthenticatedLayout>
}

