<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index(Request $request)
    {
        // $perPage = $request->get("per_page") ?? 10;

        if (strlen($request->get("name")) > 3) {
            $products = Product::where("name", $request->get("name"));
        }

        if ($request->get("price")) {
            $products = $products->where("price", $request->get("price"));
        }


        $products =  $products->with("ProductImages")->with("categories")->orderBy("created_at", "desc")->paginate(10);
        return Inertia::render("Dashboard", ["products" => $products]);
    }
}
