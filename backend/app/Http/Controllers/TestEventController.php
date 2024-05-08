<?php

namespace App\Http\Controllers;

use App\Events\PublicEventTest;
use App\Events\TestEvent;
use App\Models\User;
use Illuminate\Http\Request;

class TestEventController extends Controller
{
    public function index(){
        broadcast(new TestEvent(User::where('email', 'ajr.jahid@gmail.com')->first()))->via('pusher');;
    }

    public function publicEvent(): void
    {
        broadcast(new PublicEventTest([
            'message' => 'test message'
        ]));
    }
}
