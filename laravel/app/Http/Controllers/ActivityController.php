<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ProcessVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActivityController extends Controller
{
    public function index(Request $request) {
        $activities = ProcessVersion::find($request->process_version_id)->activity;
        return response()->json($activities, 200);
    }

    public function store(Request $request) {
        $duplicate = ProcessVersion::find($request->process_version_id)->activity->where('name', $request->name);
        if(count($duplicate)>0) {
            return response()->json([
                'message' => "Activity already exists!"
            ], 200);
        }
        else {
            $num_activities = ProcessVersion::find($request->process_version_id)->activity->count();
            $activity = Activity::create([
                'process_version_id' => $request->process_version_id,
                'sequence_number' => $num_activities+1,
                'name' => $request->name,
                'description' => $request->description,
                'duration' => $request->duration,
                'num_people' => $request->num_people
            ]);
    
            if($activity) {
                DB::table('activity_log')->insert([
                    'user_id' => $request->user_id,
                    'table_name' => 'activity',
                    'record' => $request->name,
                    'action' => 'created'
                ]);

                return response()->json([
                    'message' => "Activity created successfully!",
                    'activity' => $activity
                ], 200);
            }
            else 
                return response()->json([
                    'message' => "Error creating activity!"
                ], 500);
        }
    }

    public function show($id) {
        $activity = Activity::find($id);
        if($activity) 
            return response()->json($activity, 200);        
        else 
            return response()->json([
                'message' => "Activity not found!"
            ], 404);
    }

    public function update(Request $request, $id) {
        $activity = Activity::find($id);
        if($activity) {
            $duplicate = ProcessVersion::find($request->process_version_id)->activity->where('name', $request->name)->where('id', '!=', $id);
            if(count($duplicate)>0) {
                return response()->json([
                    'message' => "Duplicate name for activity!"
                ], 409);
            }
            else {
                $activity->update([
                    'process_version_id' => $request->process_version_id,
                    'sequence_number' => $request->sequence_number,
                    'name' => $request->name,
                    'description' => $request->description,
                    'duration' => $request->duration,
                    'num_people' => $request->num_people
                ]);

                DB::table('activity_log')->insert([
                    'user_id' => $request->user_id,
                    'table_name' => 'activity',
                    'record' => $request->name,
                    'action' => 'updated'
                ]);

                return response()->json([
                    'message' => "Activity updated successfully!",
                    'activity' => $activity
                ], 200); 
            }
        }
        else 
            return response()->json([
                'message' => "Activity not found!"
            ], 404);
    }

    public function destroy(Request $request, $id) {
        $activity = Activity::find($id);
        if($activity) {
            DB::table('activity_log')->insert([
                'user_id' => $request->user_id,
                'table_name' => 'activity',
                'record' => $activity->name,
                'action' => 'deleted'
            ]);

            $activity->delete();
            
            $deleted_sequence_number = $activity->sequence_number;
            $process_version_id = $activity->process_version_id;

            Activity::where('process_version_id', $process_version_id)->where('sequence_number', '>', $deleted_sequence_number)->decrement('sequence_number');

            return response()->json([
                'message' => "Activity deleted successfully!",
                'activity' => $activity
            ], 200); 
        }
        else
            return response()->json([
                'message' => "Activity not found!"
            ], 404);
    }

    public function destroy_selected(Request $request) {
        $flag = true;
        foreach ($request->ids as $id) {
            $activity = Activity::find($id);
            if($activity) {
                DB::table('activity_log')->insert([
                    'user_id' => $request->user_id,
                    'table_name' => 'activity',
                    'record' => $activity->name,
                    'action' => 'deleted'
                ]);

                $activity->delete(); 

                $deleted_sequence_number = $activity->sequence_number;
                $process_version_id = $activity->process_version_id;

                Activity::where('process_version_id', $process_version_id)->where('sequence_number', '>', $deleted_sequence_number)->decrement('sequence_number');
            }
            else {
                $flag = false;
            }
        }
        if($flag) {
            return response()->json([
                'message' => "Activities deleted successfully!",
                'activity' => $activity
            ], 200);
        }
        else
            return response()->json([
                'message' => "Activities not found!"
            ], 404);
    }
}
