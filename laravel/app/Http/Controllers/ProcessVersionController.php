<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Process;
use App\Models\ProcessVersion;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProcessVersionController extends Controller
{
    public function index(Request $request) {
        $token = User::where('id', $request->user_id)->value('token');
        if($token!=$request->token) {
            return response()->json(['message' => 'Invalid token!'], 403);
        }
        $process_versions = Process::find($request->process_id)->process_version->sortBy(['major', 'minor', 'patch'])->values();
        if(count($process_versions) == 1) {
            $process_version = $process_versions->first();
            $process_version->update(['status' => 1]);
            $process_versions->find($process_version->id);
        }
        return response()->json($process_versions, 200);
    }

    public function store(Request $request) {
        $token = User::where('id', $request->user_id)->value('token');
        if($token!=$request->token) {
            return response()->json(['message' => 'Invalid token!'], 403);
        }
        $count_major =  Process::find($request->process_id)->process_version->where('major', $request->major)->count();
        $count_minor =  Process::find($request->process_id)->process_version->where('minor', $request->minor)->count();
        $count_patch =  Process::find($request->process_id)->process_version->where('patch', $request->patch)->count();
        if($count_major==10) {
            return response()->json([
                'message' => "Major version limit exceeded!"
            ], 403);
        }
        if($count_minor==10) {
            return response()->json([
                'message' => "Minor version limit exceeded!"
            ], 403);
        }
        if($count_patch==10) {
            return response()->json([
                'message' => "Patch version limit exceeded!"
            ], 403);
        }
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
                            Activity::create([
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

                    if($process_version->status = 1) {
                        ProcessVersion::where('process_id', $request->process_id)->where('id', '!=', $process_version->id)->update(['status' => 0]);
                    }
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

    public function show($id, Request $request) {
        $token = User::where('id', $request->user_id)->value('token');
        if($token!=$request->token) {
            return response()->json(['message' => 'Invalid token!'], 403);
        }
        $process_version = ProcessVersion::find($id);
        if($process_version) 
            return response()->json($process_version, 200);        
        else 
            return response()->json([
                'message' => "Process version not found!"
            ], 404);
    }

    public function update(Request $request, $id) {
        $token = User::where('id', $request->user_id)->value('token');
        if($token!=$request->token) {
            return response()->json(['message' => 'Invalid token!'], 403);
        }
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

                if($process_version->status = 1) {
                    ProcessVersion::where('process_id', $request->process_id)->where('id', '!=', $process_version->id)->update(['status' => 0]);
                }

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
        $token = User::where('id', $request->user_id)->value('token');
        if($token!=$request->token) {
            return response()->json(['message' => 'Invalid token!'], 403);
        }
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
        $token = User::where('id', $request->user_id)->value('token');
        if($token!=$request->token) {
            return response()->json(['message' => 'Invalid token!'], 403);
        }
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
