<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request) {
        $projects = User::find($request->user_id)->project;
        return response()->json($projects, 200);
    }

    public function store(Request $request) {
        $duplicate = User::find($request->user_id)->project->where('name', $request->name);
        if(count($duplicate)) {
            return response()->json([
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
                    'message' => "Project created successfully!",
                    'project' => $project
                ], 200);
            else 
                return response()->json([
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
                'message' => "Project not found!"
            ], 404);
    }

    public function update(Request $request, $id) {
        $project = Project::find($id);
        if($project) {
            $duplicate = User::find($request->user_id)->project->where('name', $request->name)->where('id', '!=', $id);
            if(count($duplicate)>0) {
                return response()->json([
                    'message' => "Duplicate name for a project!"
                ], 409);
            }
            else {
                $project->update([
                    'name' => $request->name,
                    'description' => $request->description
                ]);
                return response()->json([
                    'message' => "Project updated successfully!",
                    'project' => $project
                ], 200); 
            }
        }
        else 
            return response()->json([
                'message' => "Project not found!"
            ], 404);
    }

    public function destroy(Request $request, $id) {
        $project = Project::find($id);
        if($project) {
            $project->delete();
            return response()->json([
                'message' => "Project deleted successfully!",
                'project' => $project
            ], 200); 
        }
        else
            return response()->json([
                'message' => "Project not found!"
            ], 404);
    }
}