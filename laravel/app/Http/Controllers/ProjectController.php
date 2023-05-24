<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request) {
        $projects = Project::where('user_id', $request->user_id)->get();
        return response()->json($projects, 200);
    }

    public function store(Request $request) {
        $duplicate = Project::where('user_id', $request->user_id)->where('name', $request->name);
        if(count($duplicate)) {
            return response()->json([
                'status' => 200,
                'message' => "Project already exists!"
            ], 200);
        }
        else {
            $project = Project::create([
                'user_id' => $request->user_id,
                'name' => $request->name,
                'description' => $request->description
            ]);
    
            if($project) 
                return response()->json([
                    'status' => 200,
                    'message' => "Project created successfully!",
                    'project' => $project
                ], 200);
            else 
                return response()->json([
                    'status' => 500,
                    'message' => "Error creating project!"
                ], 500);
        }
    }

    public function show($id) {
        $project = Project::find($id);
        if($project) 
            return response()->json($project, 200);        
        else 
            return response()->json([
                'status' => 404,
                'message' => "Project not found!"
            ]);
    }

    public function update(Request $request, $id) {
        $project = Project::find($id);
        if($project) {
            $duplicate = Project::where('user_id', $request->user_id)->where('name', $request->name)->where('id', '!=', $id);
            if(count($duplicate)>0) {
                return response()->json([
                    'status' => 200,
                    'message' => "Duplicate name for a project!"
                ]);
            }
            else {
                $project->update([
                    'name' => $request->name,
                    'description' => $request->description
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => "Project updated successfully!",
                    'project' => $project
                ]); 
            }
        }
        else 
            return response()->json([
                'status' => 404,
                'message' => "Project not found!"
            ]);
    }

    public function destroy(Request $request, $id) {
        $project = Project::find($id);
        if($project) {
            $project->delete();
            return response()->json([
                'status' => 200,
                'message' => "Project deleted successfully!",
                'project' => $project
            ]); 
        }
        else
            return response()->json([
                'status' => 404,
                'message' => "Project not found!"
            ]);
    }
}