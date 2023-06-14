<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class UserController extends Controller
{
    
    //AUTHENTICATION
    function authAPI($jwt)
    {
        try {
            $publicKeys = Http::get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
            $publicKey = $publicKeys[array_key_first($publicKeys->json())];
            $payload = JWT::decode($jwt, new Key($publicKey, 'RS256'));
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
    
    public function store(Request $request) {
        if($this->authAPI($request->token)) {
        //if(1==1) {
            $exists = User::where('username', $request->username)->get();
            if(count($exists)>0) {
                return response()->json($exists[0], 200);
            }
        
            $user = User::create([
                'username' => $request->username
            ]);

            if($user) 
                return response()->json($user, 200);
            else 
                return response()->json([
                    'message' => "Error creating user!"
                ], 500);
        } 
        else 
            return response()->json(['message' => 'Invalid token!'], 403);
    }
}
 