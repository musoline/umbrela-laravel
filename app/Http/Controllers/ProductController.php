<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProductRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{

    public function index(Request $request)
    {
        $perPage = $request->get("per_page") ?? 10;


        $products =  Product::with("ProductImages")->with("categories")->orderBy("created_at", "desc")->paginate($perPage);
        return Inertia::render("Product/Product", ["products" => $products]);
    }


    public function create(): Response
    {
        $categories = Category::all();
        return Inertia::render("Product/ProductCreate", ["categories" => $categories]);
    }

    public function store(CreateProductRequest $request)
    {
        $categories = $request->input("category") ?? [];
        $product = Product::create($request->validated());


        foreach ($request->file as $image) {
            $name = $image->getClientOriginalName();
            $image->move(public_path() . '/uploads/', $name);
            $product->productImages()->create(["src" => '/uploads/' . $name]);
        }
        foreach ($categories as $value) {
            $product->categories()->attach($value);
        }

        return redirect()->route("admin");
    }


    public function show(Product $product)
    {
        $prod = Product::with("categories")->with("ProductImages")->findOrFail($product->id);
        return Inertia::render("Product/ProductShow", ["product" => $prod]);
    }


    public function destroy(Product $product)
    {
        $product->categories()->detach();
        $product->delete();

        return redirect()->route("dashboard");
    }
}
