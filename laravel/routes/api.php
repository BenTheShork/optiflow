<?php

use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('user', [UserController::class, 'index']);
Route::get('user/{id}', [UserController::class, 'show']);
Route::post('user', [UserController::class, 'store']);
Route::put('user/{id}', [UserController::class, 'update']);

Route::get('project', [ProjectController::class, 'index']);
Route::get('project/{id}', [ProjectController::class, 'show']);
Route::post('project', [ProjectController::class, 'store']);
Route::put('project/{id}', [ProjectController::class, 'update']);
Route::delete('project/{id}', [ProjectController::class, 'destroy']);

Route::get('process', [ProcessController::class, 'index']);
Route::get('process/{id}', [ProcessController::class, 'show']);
Route::post('process', [ProcessController::class, 'store']);
Route::put('process/{id}', [ProcessController::class, 'update']);
Route::delete('process/{id}', [ProcessController::class, 'destroy']);