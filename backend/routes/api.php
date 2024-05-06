<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('token/create', [\App\Http\Controllers\API\AppAPIAuthenticationController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('token/logout', [\App\Http\Controllers\API\AppAPIAuthenticationController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
