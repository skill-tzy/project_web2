<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TodoController;
use App\Http\Controllers\Api\AuthController;
use App\Models\User;

Route::get('/health', fn() => response()->json(['status'=>'ok']));

// -------------------
// AUTH (public)
// -------------------
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// -------------------
// AUTH (protected)
// -------------------
Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
    Route::get('/me',     [AuthController::class, 'me']);
    Route::post('/logout',[AuthController::class, 'logout']);
});

// -------------------
// TODOS (protected)
// -------------------
Route::middleware('auth:sanctum')->apiResource('todos', TodoController::class);

// -------------------------
// ADMIN ONLY ROUTES
// -------------------------
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {

    // List semua user
    Route::get('/users', function () {
        return User::select('id','name','email','role','created_at')->get();
    });

    // List semua todos (panggil model langsung via namespace)
    Route::get('/todos', function () {
        return \App\Models\Todo::with('user')->get();
    });

});