<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request) {
        $user = User::where('username', $request->username)->first();
        if($user) 
            return response()->json($user, 200);      
        else 
            return response()->json([
                'message' => "User not found!"
            ], 404);
    }

    public function store(Request $request) {
        $user = User::create([
            'username' => $request->username,
            'token' => $request->token
        ]);

        if($user) 
            return response()->json([
                'message' => "User created successfully!",
                'user' => $user
            ], 200);
        else 
            return response()->json([
                'message' => "Error creating user!"
            ], 500);
    }

    public function update(Request $request, $id) {
        $user = User::find($id);
        if($user) {
            $user->update([
                'token' => $request->token
            ]);
            return response()->json([
                'message' => "Token updated successfully!",
                'user' => $user
            ], 200); 
        }
        else 
            return response()->json([
                'status' => 404,
                'message' => "User not found!"
            ]);
    }

}
