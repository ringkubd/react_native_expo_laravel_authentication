<?php

use App\Events\TestEvent;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';


Route::get('/test_event', function () {
    broadcast(new TestEvent(User::where('email', 'ajr.jahid@gmail.com')->first()));
});
