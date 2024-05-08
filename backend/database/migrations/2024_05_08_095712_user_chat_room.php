<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_chat_room', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class)->index()->references('id')->on('users');
            $table->foreignIdFor(\App\Models\ChatRoom::class)->index()->references('id')->on('chat_rooms');
            $table->foreignIdFor(\App\Models\Message::class, 'last_read_message_id')->nullable()->references('id')->on('messages');
            $table->softDeletes();
            $table->timestamps();
        });

        if (Schema::hasTable('chat_rooms')) {
            $chat_room = \App\Models\ChatRoom::create([
                'name' => 'public',
                'status' => 'active',
                'room_type' => 'public',
                'created_by' => 1,
            ]);
            $chat_room->users()->attach([1,2]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_chat_room');
    }
};
