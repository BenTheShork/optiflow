<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActivityLogController extends Controller
{
    public function index(Request $request) {
        $activity_log = DB::table('activity_log')->where('user_id', $request->user_id)->orderBy('created_at', 'DESC')->paginate(50);
        return response()->json($activity_log, 200);
    }
}
