<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActivityLogController extends Controller
{
    public function index(Request $request) {
        $token = User::where('id', $request->user_id)->value('token');
        if($token!=$request->token) {
            return response()->json(['message' => 'Invalid token!'], 403);
        }
        $total = DB::table('activity_log')->where('user_id', $request->user_id)->count();
        if($request->filter!=null) {
            $table_name = $request->filter[0][0];
            $table_name_searchterm = $request->filter[0][2];
            $record = $request->filter[2][0];
            $record_searchterm = $request->filter[2][2];
            $action = $request->filter[4][0];
            $action_searchterm = $request->filter[4][2];
            if($request->take==10) {
                $activity_log = DB::table('activity_log')->where('user_id', $request->user_id)
                    ->where(function ($query) use ($table_name, $table_name_searchterm, $record, $record_searchterm, $action, $action_searchterm) {
                        $query->where($table_name, 'like', '%' . $table_name_searchterm . '%')
                        ->orWhere($record, 'like', '%' . $record_searchterm . '%')
                        ->orWhere($action, 'like', '%' . $action_searchterm . '%');
                    })
                    ->orderBy('created_at', 'DESC')->skip($request->skip)->take(10)->get();
                return response()->json(['data' => $activity_log, 'total' => $total], 200);            }
            if($request->take==20) {
                $activity_log = DB::table('activity_log')->where('user_id', $request->user_id)
                    ->where(function ($query) use ($table_name, $table_name_searchterm, $record, $record_searchterm, $action, $action_searchterm) {
                        $query->where($table_name, 'like', '%' . $table_name_searchterm . '%')
                        ->orWhere($record, 'like', '%' . $record_searchterm . '%')
                        ->orWhere($action, 'like', '%' . $action_searchterm . '%');
                    })
                    ->orderBy('created_at', 'DESC')->skip($request->skip)->take(20)->get();
                return response()->json(['data' => $activity_log, 'total' => $total], 200);            }
            if($request->take==50) {
                $activity_log = DB::table('activity_log')->where('user_id', $request->user_id)
                    ->where(function ($query) use ($table_name, $table_name_searchterm, $record, $record_searchterm, $action, $action_searchterm) {
                        $query->where($table_name, 'like', '%' . $table_name_searchterm . '%')
                        ->orWhere($record, 'like', '%' . $record_searchterm . '%')
                        ->orWhere($action, 'like', '%' . $action_searchterm . '%');
                    })
                    ->orderBy('created_at', 'DESC')->skip($request->skip)->take(50)->get();
                return response()->json(['data' => $activity_log, 'total' => $total], 200);             }
        }
        else {
            if($request->take==10) {
                $activity_log = DB::table('activity_log')->where('user_id', $request->user_id)->orderBy('created_at', 'DESC')->skip($request->skip)->take(10)->get();
                return response()->json(['data' => $activity_log, 'total' => $total], 200);
            }
            if($request->take==20) {
                $activity_log = DB::table('activity_log')->where('user_id', $request->user_id)->orderBy('created_at', 'DESC')->skip($request->skip)->take(20)->get();
                return response()->json(['data' => $activity_log, 'total' => $total], 200);            }
            if($request->take==50) {
                $activity_log = DB::table('activity_log')->where('user_id', $request->user_id)->orderBy('created_at', 'DESC')->skip($request->skip)->take(50)->get();
                return response()->json(['data' => $activity_log, 'total' => $total], 200);            }
        }
    }
}
