
import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';



export default function Product({ auth, product }) {
    console.log(product)

    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{product.name}</h2>}

    >
        <Head title="Product" />
        <div className='m-5 shadow rounded-md'>

            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                {product.product_images && product.product_images.map(img => (
                    <img key={img.id} className="w-full" src={img.src} alt={product.name} />

                ))

                }
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <p className="text-gray-700 text-base">
                        {product.description}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    {
                        product.categories && product.categories.map(cat => (
                            <span key={cat.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{cat.name}</span>
                        ))
                    }

                </div>
            </div>

        </div>
    </AuthenticatedLayout>
}

