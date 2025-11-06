<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TodoController;
use App\Http\Controllers\Api\AuthController;

Route::get('/health', fn() => response()->json(['status'=>'ok']));

// AUTH (public)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// AUTH (butuh token)
Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
    Route::get('/me',     [AuthController::class, 'me']);
    Route::post('/logout',[AuthController::class, 'logout']);
});

// TODOS (Wajib token)
Route::middleware('auth:sanctum')->apiResource('todos', TodoController::class);