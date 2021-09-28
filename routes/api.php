<?php

use App\Http\Controllers\public\Auth\LoginController AS PublicLoginController;
use App\Http\Controllers\public\Auth\RegisterController AS PublicRegisterController;
use App\Http\Controllers\public\CategoryController;
use App\Http\Controllers\public\PostController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [PublicLoginController::class, 'login']);
Route::post('register', [PublicRegisterController::class, 'register']);

Route::group(['middleware' => 'auth:api'], function() {
    Route::post('logout', [PublicLoginController::class, 'logout']);

    Route::apiResource('posts', PostController::class)->except('index', 'show');
    Route::apiResource('categories', CategoryController::class)->except('index');
});

Route::apiResource('posts', PostController::class)->only('index', 'show');
Route::apiResource('categories', CategoryController::class)->only('index');

Route::get('/post/pagination', [PostController::class, 'getPostPagination']);
Route::get('/post/{slug}', [PostController::class, 'showBySlug']);
