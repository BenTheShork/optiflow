<?php

use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ProcessVersionController;
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
Route::patch('user/{id}', [UserController::class, 'update']);

Route::get('project', [ProjectController::class, 'index']);
Route::get('project/{id}', [ProjectController::class, 'show']);
Route::post('project', [ProjectController::class, 'store']);
Route::patch('project/{id}', [ProjectController::class, 'update']);
Route::delete('project/{id}', [ProjectController::class, 'destroy']);

Route::get('process', [ProcessController::class, 'index']);
Route::get('process/{id}', [ProcessController::class, 'show']);
Route::post('process', [ProcessController::class, 'store']);
Route::patch('process/{id}', [ProcessController::class, 'update']);
Route::delete('process/{id}', [ProcessController::class, 'destroy']);

Route::get('processversion', [ProcessVersionController::class, 'index']);
Route::get('processversion/{id}', [ProcessVersionController::class, 'show']);
Route::post('processversion', [ProcessVersionController::class, 'store']);
Route::patch('processversion/{id}', [ProcessVersionController::class, 'update']);
Route::delete('processversion/{id}', [ProcessVersionController::class, 'destroy']);