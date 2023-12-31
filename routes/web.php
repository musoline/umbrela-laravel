<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, "index"])->middleware(['auth', 'verified'])->name('dashboard');




Route::prefix("admin")->middleware(["auth", "verified", "isAdmin"])->group(function () {
    route::get("/", function () {
        return Inertia::render("Admin/AdminPanel");
    })->name("admin");
});

Route::resource('product', ProductController::class, [
    "names" => [
        "index" => "product",
        "create" => "product/create"
    ]
])->middleware(["auth", "verified", "isAdmin"]);

Route::resource("category", CategoryController::class, [
    "names" => [
        "index" => "category",
        "create" => "category/create"
    ]
])->middleware(["auth", "verified", "isAdmin"]);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
