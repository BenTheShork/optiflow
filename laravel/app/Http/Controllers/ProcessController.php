<?php

namespace App\Http\Controllers;

use App\Models\Process;
use App\Models\Project;
use Illuminate\Http\Request;

class ProcessController extends Controller
{
    public function index(Request $request) {
        $processes = Project::find($request->project_id)->process;
        return response()->json($processes, 200);
    }

    public function store(Request $request) {
        $duplicate = Project::find($request->project_id)->process->where('name', $request->name);
        if(count($duplicate)) {
            return response()->json([
                'status' => 200,
                'message' => "Process already exists!"
            ], 200);
        }
        else {
            $process = Process::create([
                'project_id' => $request->project_id,
                'name' => $request->name,
                'description' => $request->description,
                'status' => $request->status,
            ]);
    
            if($process) 
                return response()->json([
                    'status' => 200,
                    'message' => "Process created successfully!",
                    'process' => $process
                ], 200);
            else 
                return response()->json([
                    'status' => 500,
                    'message' => "Error creating process!"
                ], 500);
        }
    }

    public function show($id) {
        $process = Process::find($id);
        if($process) 
            return response()->json($process, 200);        
        else 
            return response()->json([
                'status' => 404,
                'message' => "Project not found!"
            ]);
    }

    public function update(Request $request, $id) {
        $process = Process::find($id);
        if($process) {
            $duplicate = Project::find($request->project_id)->process->where('name', $request->name)->where('id', '!=', $id);
            if(count($duplicate)>0) {
                return response()->json([
                    'status' => 200,
                    'message' => "Duplicate name for a process!"
                ]);
            }
            else {
                $process->update([
                    'name' => $request->name,
                    'description' => $request->description,
                    'status' => $request->status
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => "Process updated successfully!",
                    'process' => $process
                ]); 
            }
        }
        else 
            return response()->json([
                'status' => 404,
                'message' => "process not found!"
            ]);
    }

    public function destroy(Request $request, $id) {
        $process = Process::find($id);
        if($process) {
            $process->delete();
            return response()->json([
                'status' => 200,
                'message' => "Process deleted successfully!",
                'process' => $process
            ]); 
        }
        else
            return response()->json([
                'status' => 404,
                'message' => "Process not found!"
            ]);
    }
}
