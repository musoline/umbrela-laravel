<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProductRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render("Admin/Product/ProductCreate");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateProductRequest $request): RedirectResponse
    {



        $product = Product::create($request->validated());

        foreach ($request->file as $image) {
            $name = $image->getClientOriginalName();
            $image->move(public_path() . '/uploads/', $name);
            $product->productImages()->create(["src" => $name]);
        }
        return redirect()->route("admin/dashboard");
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
