<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AppAPIAuthenticationController extends Controller
{

    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user){
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        if ($user && Hash::check($request->password, $user->password)){
            $token = $user->createToken($user->first_name)->plainTextToken;
            Auth::login($user);
            return response()->json([
                'token' => $token,
                'user' => new UserResource($user),
            ]);
        }
        return response()->json([
            'message' => 'Unauthorized'
        ], 401);
    }

    public function logout(Request $request): \Illuminate\Http\JsonResponse
    {
        // Revoke the token that was used to authenticate the current request...
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logged out'
        ]);

    }

}
