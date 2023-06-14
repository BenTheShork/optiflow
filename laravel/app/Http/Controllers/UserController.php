<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $exists = User::where('username', $request->username)->get();
        if (count($exists) > 0) {
            $exists[0]->update(['token' => $request->token]);
            return response()->json($exists[0], 200);
        } else {
            $user = User::create([
                'username' => $request->username,
                'token' => $request->token
            ]);

            if ($user)
                return response()->json($user, 200);
            else
                return response()->json([
                    'message' => "Error creating user!"
                ], 500);
        }
    }
}
