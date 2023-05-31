<?php

namespace App\Http\Controllers;

use App\Models\Process;
use App\Models\ProcessVersion;
use Illuminate\Http\Request;

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
            ], 200);
        }
        else {
            $process_version = ProcessVersion::create([
                'process_id' => $request->process_id,
                'description' => $request->description,
                'major' => $request->major,
                'minor' => $request->minor,
                'patch' => $request->patch,
                'total_duration' => $request->total_duration,
                'total_num_people' => $request->total_num_people,
                'grade' => $request->grade
            ]);
    
            if($process_version) 
                return response()->json([
                    'message' => "Process version created successfully!",
                    'process_version' => $process_version
                ], 200);
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
                    'total_duration' => $request->total_duration,
                    'total_num_people' => $request->total_num_people,
                    'grade' => $request->grade
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
}
