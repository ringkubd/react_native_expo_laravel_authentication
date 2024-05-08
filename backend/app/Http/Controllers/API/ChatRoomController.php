<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\BaseController;
use App\Http\Resources\ChatRoomResource;
use App\Models\ChatRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatRoomController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $rooms = ChatRoom::query()
            ->whereHas('users', function ($query) {
                $query->where('users.id', auth()->id());
            })
            ->orWhere('room_type', 'public')
            ->get();

        return $this->sendResponse(
            ChatRoomResource::collection($rooms),
            'ChatRooms retrieved successfully'
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'room_type' => 'required',
        ]);
        if ($validate->fails()) {
            return $this->sendError($validate->errors(), 422);
        }
        $room = ChatRoom::create([
            ...$validate->validated(),
            'created_by' => auth()->id(),
            'status' => 'active'
        ]);
        $room->users()->attach(auth()->id());
        return $this->sendResponse(new ChatRoomResource($room), 'ChatRoom created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): \Illuminate\Http\JsonResponse
    {
        return $this->sendResponse(new ChatRoomResource(ChatRoom::query()->findOrFail($id)), 'ChatRoom retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): \Illuminate\Http\JsonResponse
    {
        $room = ChatRoom::query()->findOrFail($id);
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'room_type' => 'required',
            'status' => 'required',
        ]);
        if ($validate->fails()) {
            return $this->sendError($validate->errors(), 422);
        }
        $room->update($validate->validated());
        return $this->sendResponse(new ChatRoomResource($room), 'ChatRoom updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): \Illuminate\Http\JsonResponse
    {
        ChatRoom::query()->findOrFail($id)->delete();
        return $this->sendResponse([], 'ChatRoom deleted successfully.');
    }
}
