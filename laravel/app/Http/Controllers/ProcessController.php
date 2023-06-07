<?php

namespace App\Http\Controllers;

use App\Models\Process;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProcessController extends Controller
{
    public function index(Request $request) {
        $processes = Project::find($request->project_id)->process;
        return response()->json($processes, 200);
    }

    public function store(Request $request) {
        $duplicate = Project::find($request->project_id)->process->where('name', $request->name);
        if(count($duplicate)>0) {
            return response()->json([
                'message' => "Process already exists!"
            ], 409);
        }
        else {
            $process = Process::create([
                'project_id' => $request->project_id,
                'name' => $request->name,
                'description' => $request->description,
                'status' => $request->status,
            ]);
    
            if($process) {
                DB::table('activity_log')->insert([
                    'user_id' => $request->user_id,
                    'table_name' => 'process',
                    'record' => $request->name,
                    'action' => 'created'
                ]);

                return response()->json([
                    'message' => "Process created successfully!",
                    'process' => $process
                ], 200);
            }
            else 
                return response()->json([
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
                'message' => "Process not found!"
            ], 404);
    }

    public function update(Request $request, $id) {
        $process = Process::find($id);
        if($process) {
            $duplicate = Project::find($request->project_id)->process->where('name', $request->name)->where('id', '!=', $id);
            if(count($duplicate)>0) {
                return response()->json([
                    'message' => "Duplicate name for a process!"
                ], 409);
            }
            else {
                $process->update([
                    'project_id' => $request->project_id,
                    'name' => $request->name,
                    'description' => $request->description,
                    'status' => $request->status
                ]);

                DB::table('activity_log')->insert([
                    'user_id' => $request->user_id,
                    'table_name' => 'process',
                    'record' => $request->name,
                    'action' => 'updated'
                ]);

                return response()->json([
                    'message' => "Process updated successfully!",
                    'process' => $process
                ], 200); 
            }
        }
        else 
            return response()->json([
                'message' => "Process not found!"
            ], 404);
    }

    public function destroy(Request $request, $id) {
        $process = Process::find($id);
        if($process) {
            DB::table('activity_log')->insert([
                'user_id' => $request->user_id,
                'table_name' => 'project',
                'record' => $process->name,
                'action' => 'deleted'
            ]);

            $process->delete();

            return response()->json([
                'message' => "Process deleted successfully!",
                'process' => $process
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
            $process = Process::find($id);
            if($process) {
                DB::table('activity_log')->insert([
                    'user_id' => $request->user_id,
                    'table_name' => 'project',
                    'record' => $process->name,
                    'action' => 'deleted'
                ]);

                $process->delete(); 
            }
            else {
                $flag = false;
            }
        }
        if($flag) {
            return response()->json([
                'message' => "Processes deleted successfully!",
                'process' => $process
            ], 200);
        }
        else
            return response()->json([
                'message' => "Processes not found!"
            ], 404);
    }
}
