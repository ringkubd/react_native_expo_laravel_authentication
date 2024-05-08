<?php

use App\Events\TestEvent;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';


Route::get('/test_event', [\App\Http\Controllers\TestEventController::class, 'index']);
Route::get('/public_test_event', [\App\Http\Controllers\TestEventController::class, 'publicEvent']);
