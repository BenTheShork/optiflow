<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Process;
use App\Models\ProcessVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProcessVersionController extends Controller
{
    public function index(Request $request) {
        $process_versions = Process::find($request->process_id)->process_version;
        return response()->json($process_versions, 200);
    }

    public function store(Request $request) {
        $duplicate = Process::find($request->process_id)->process_version->where('major', $request->major)->where('minor', $request->minor)->where('patch', $request->patch);
        if(count($duplicate)>0) {
            return response()->json([
                'message' => "Process version already exists!"
            ], 409);
        }
        else {
            $last_version_id = ProcessVersion::where('process_id', $request->process_id)->latest()->value('id');

            $process_version = ProcessVersion::create([
                'process_id' => $request->process_id,
                'description' => $request->description,
                'major' => $request->major,
                'minor' => $request->minor,
                'patch' => $request->patch,
                'grade' => $request->grade,
                'file' => $request->file,
                'status' => $request->status
            ]);
    
            if($process_version) {
                if($last_version_id) {
                    $last_version = ProcessVersion::find($last_version_id);
                    $children = ProcessVersion::find($last_version_id)->activity;
                    if(count($children)>0)
                        foreach($children as $activity) {
                            $newActivity = Activity::create([
                                'process_version_id' => $process_version->id,
                                'sequence_number' => $activity->sequence_number,
                                'name' => $activity->name,
                                'description' => $activity->description,
                                'duration' => $activity->duration,
                                'num_people' => $activity->num_people
                            ]);
                        }
                    $process_version->file = $last_version->file;
                    $process_version->save();
                }

                DB::table('activity_log')->insert([
                    'user_id' => $request->user_id,
                    'table_name' => 'process_version',
                    'record' => $request->major.'.'.$request->minor.'.'.$request->patch,
                    'action' => 'created'
                ]);

                return response()->json([
                    'message' => "Process version created successfully!",
                    'process_version' => $process_version
                ], 200);
            }
            else 
                return response()->json([
                    'message' => "Error creating process version!"
                ], 500);
        }
    }

    public function show($id) {
        $process_version = ProcessVersion::find($id);
        if($process_version) 
            return response()->json($process_version, 200);        
        else 
            return response()->json([
                'message' => "Process version not found!"
            ], 404);
    }

    public function update(Request $request, $id) {
        $process_version = ProcessVersion::find($id);
        if($process_version) {
            $duplicate = Process::find($request->process_id)->process_version->where('major', $request->major)->where('minor', $request->minor)->where('patch', $request->patch)->where('id', '!=', $id);
            if(count($duplicate)>0) {
                return response()->json([
                    'message' => "Duplicate version for a process!"
                ], 409);
            }
            else {
                $process_version->update([
                    'process_id' => $request->process_id,
                    'description' => $request->description,
                    'major' => $request->major,
                    'minor' => $request->minor,
                    'patch' => $request->patch,
                    'grade' => $request->grade,
                    'file' => $request->file,
                    'status' => $request->status
                ]);

                DB::table('activity_log')->insert([
                    'user_id' => $request->user_id,
                    'table_name' => 'process_version',
                    'record' => $request->major.'.'.$request->minor.'.'.$request->patch,
                    'action' => 'updated'
                ]);

                return response()->json([
                    'message' => "Process version updated successfully!",
                    'process_version' => $process_version
                ], 200); 
            }
        }
        else 
            return response()->json([
                'message' => "Process version not found!"
            ], 404);
    }

    public function destroy(Request $request, $id) {
        $process_version = ProcessVersion::find($id);
        if($process_version) {
            DB::table('activity_log')->insert([
                'user_id' => $request->user_id,
                'table_name' => 'process_version',
                'record' => $process_version->major.'.'.$process_version->minor.'.'.$process_version->patch,
                'action' => 'deleted'
            ]);

            $process_version->delete();

            return response()->json([
                'message' => "Process version deleted successfully!",
                'process_version' => $process_version
            ], 200); 
        }
        else
            return response()->json([
                'message' => "Process not found!"
            ], 404);
    }

    public function destroy_selected(Request $request) {
        $flag = true;
        foreach ($request->ids as $id) {
            $process_version = ProcessVersion::find($id);
            if($process_version) {
                DB::table('activity_log')->insert([
                    'user_id' => $request->user_id,
                    'table_name' => 'process_version',
                    'record' => $process_version->major.'.'.$process_version->minor.'.'.$process_version->patch,
                    'action' => 'deleted'
                ]);

                $process_version->delete(); 
            }
            else {
                $flag = false;
            }
        }
        if($flag) {
            return response()->json([
                'message' => "Versions deleted successfully!",
                'process_version' => $process_version
            ], 200);
        }
        else
            return response()->json([
                'message' => "Versions not found!"
            ], 404);
    }
}
