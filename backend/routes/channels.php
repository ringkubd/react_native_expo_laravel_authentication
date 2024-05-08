<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::routes(['middleware' => ['auth:sanctum']]);


Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('test.{id}', function ($user, $id) {
    return  true;
});

Broadcast::channel('public-channel', function ($user) {
    return $user;
});

Broadcast::channel('message.{id}', function ($user, $id) {
    return $user;
});

Broadcast::channel('chat.room.{id}', function ($user, $id) {
    $room = \App\Models\ChatRoom::query()
        ->where('id',$id)
        ->whereHas('users', function ($query) use ($user){
            $query->where('id', $user->id);
        })
        ->firstOrFail();
    return $room;
});
