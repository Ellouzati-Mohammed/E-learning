<?php

use App\Http\Controllers\API\ActivityController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\API\DomainController;
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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('/domains', DomainController::class)->only(['index', 'show']);
    Route::apiResource('/activities', ActivityController::class)->only(['index', 'show']);
    Route::apiResource('/courses', CourseController::class)->only(['index', 'show']);
    Route::get('/courses/{domain}/domain', [CourseController::class, 'showDomainWithCourses']);
    Route::get('/activities/{course}/course', [ActivityController::class, 'showActivityWithCourse']);

    // Routes protégées par middleware admin
    Route::middleware('admin')->group(function () {
        Route::apiResource('/domains', DomainController::class)->only(['store', 'update', 'destroy']);
        Route::apiResource('/activities', ActivityController::class)->only(['store', 'update', 'destroy']);;
        Route::apiResource('/courses', CourseController::class)->only(['store', 'update', 'destroy']);;
    });



});

Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF token set']);
});
