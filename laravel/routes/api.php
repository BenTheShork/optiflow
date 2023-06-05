<?php

use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ProcessVersionController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActivityController;
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
Route::delete('project', [ProjectController::class, 'destroy_selected']);

Route::get('process', [ProcessController::class, 'index']);
Route::get('process/{id}', [ProcessController::class, 'show']);
Route::post('process', [ProcessController::class, 'store']);
Route::patch('process/{id}', [ProcessController::class, 'update']);
Route::delete('process/{id}', [ProcessController::class, 'destroy']);
Route::delete('process', [ProcessController::class, 'destroy_selected']);

Route::get('processversion', [ProcessVersionController::class, 'index']);
Route::get('processversion/{id}', [ProcessVersionController::class, 'show']);
Route::post('processversion', [ProcessVersionController::class, 'store']);
Route::patch('processversion/{id}', [ProcessVersionController::class, 'update']);
Route::delete('processversion/{id}', [ProcessVersionController::class, 'destroy']);
Route::delete('processversion', [ProcessVersionController::class, 'destroy_selected']);

Route::get('activity', [ActivityController::class, 'index']);
Route::get('activity/{id}', [ActivityController::class, 'show']);
Route::post('activity', [ActivityController::class, 'store']);
Route::patch('activity/{id}', [ActivityController::class, 'update']);
Route::delete('activity/{id}', [ActivityController::class, 'destroy']);
Route::delete('activity', [ActivityController::class, 'destroy_selected']);