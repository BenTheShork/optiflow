<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        $users = User::all();

        return response()->json([
            'status' => 200,
            'users' => $users
        ], 200);
    }

    public function store(Request $request) {
        $user = User::create([
            'username' => $request->username,
            'token' => $request->token
        ]);

        if($user) 
            return response()->json([
                'status' => 200,
                'message' => "User created successfully!"
            ], 200);
        else 
            return response()->json([
                'status' => 500,
                'message' => "Error creating user!"
            ], 500);
    }

    public function show($id) {
        $user = User::find($id);
        if($user) 
            return response()->json([
                'status' => 200,
                'user' => $user
            ]);        
        else 
            return response()->json([
                'status' => 404,
                'message' => "User not found!"
            ]);
    }

    public function update(Request $request, $id) {
        $user = User::find($id);
        if($user) {
            $user->update([
                'username' => $request->username,
                'token' => $request->token
            ]);
            return response()->json([
                'status' => 200,
                'message' => "User updated successfully!",
                'user' => $user
            ]); 
        }
        else 
            return response()->json([
                'status' => 404,
                'message' => "User not found!"
            ]);
    }
}
