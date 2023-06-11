<?php

namespace App\Http\Controllers;

use App\Models\Process;
use App\Models\Project;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ProcessController extends Controller
{
    //AUTHENTICATION
    function authAPI($jwt)
    {
        try {
            $publicKeys = Http::get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
            $publicKey = $publicKeys[array_key_first($publicKeys->json())];
            $payload = JWT::decode($jwt, new Key($publicKey, 'RS256'));
            return true;
        } catch (Exception $e) {
            return false;
        }
    }


    //ROUTES
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

    //INSIGHTS
    public function insights(Request $request) {
        $projects = Project::where('user_id', $request->user_id)->with('process.process_version')->get();
        $num_projects = 0;
        $num_processes = 0;
        $num_activities = 0;
        $avg_processes_per_project = 0;
        $avg_activities_per_process = 0;
        $total_grade = 0;
        $total_duration = 0;
        $total_num_people = 0;
        $min_duration = 9999999;
        $version_min_duration = array();
        $max_duration = 0;
        $version_max_duration = array();
        $min_num_people = 9999999;
        $version_min_num_people = array();
        $max_num_people = 0;
        $version_max_num_people = array();

        foreach ($projects as $project) {
            $num_projects++;
            unset($project->user_id, $project->description, $project->created_at, $project->updated_at);

            foreach ($project->process as $process) {
                $num_processes++;
                unset($process->description, $process->best_version, $process->project_id, $process->created_at, $process->updated_at);

                foreach ($process->process_version as $version) {
                    $num_activities++;
                    $total_grade += $version->grade;
                    $total_duration += $version->total_duration;
                    $total_num_people += $version->total_num_people;
                    if($version->total_duration > $max_duration) {
                        $max_duration = $version->total_duration;
                        $version_max_duration['project_id'] = $project->id;
                        $version_max_duration['project_name'] = $project->name;
                        $version_max_duration['process_id'] = $process->id;
                        $version_max_duration['process_name'] = $process->name;
                        $version_max_duration['version_id'] = $version->id;
                        $version_max_duration['version_number'] = $version->major.'.'.$version->minor.'.'.$version->patch;
                        $version_max_duration['duration'] = $version->total_duration;
                    }
                    if($version->total_num_people > $max_num_people) {
                        $max_num_people = $version->total_num_people;
                        $version_max_num_people['project_id'] = $project->id;
                        $version_max_num_people['project_name'] = $project->name;
                        $version_max_num_people['process_id'] = $process->id;
                        $version_max_num_people['process_name'] = $process->name;
                        $version_max_num_people['version_id'] = $version->id;
                        $version_max_num_people['version_number'] = $version->major.'.'.$version->minor.'.'.$version->patch;
                        $version_max_num_people['num_people'] = $version->total_num_people;
                    }
                    if($version->total_duration < $min_duration) {
                        $min_duration = $version->total_duration;
                        $version_min_duration['project_id'] = $project->id;
                        $version_min_duration['project_name'] = $project->name;
                        $version_min_duration['process_id'] = $process->id;
                        $version_min_duration['process_name'] = $process->name;
                        $version_min_duration['version_id'] = $version->id;
                        $version_min_duration['version_number'] = $version->major.'.'.$version->minor.'.'.$version->patch;
                        $version_min_duration['duration'] = $version->total_duration;
                    }
                    if($version->total_num_people < $min_num_people) {
                        $min_num_people = $version->total_num_people;
                        $version_min_num_people['project_id'] = $project->id;
                        $version_min_num_people['project_name'] = $project->name;
                        $version_min_num_people['process_id'] = $process->id;
                        $version_min_num_people['process_name'] = $process->name;
                        $version_min_num_people['version_id'] = $version->id;
                        $version_min_num_people['version_number'] = $version->major.'.'.$version->minor.'.'.$version->patch;
                        $version_min_num_people['num_people'] = $version->total_num_people;
                    }
                    unset($version->process_id, $version->description, $version->major, $version->minor, $version->patch, $version->file, $version->created_at, $version->updated_at);
                }
            }
        }

        $avg_processes_per_project = $num_processes/$num_projects;
        $avg_activities_per_process = $num_activities/$num_processes;
        $avg_grade_per_process = $total_grade/$num_processes;
        $avg_duration_per_process = $total_duration/$num_processes;
        $avg_num_people_per_process = $total_num_people/$num_processes;

        return response()->json([
            'total_num_projects' => $num_projects,
            'total_num_processes' => $num_processes,
            'total_num_activities' => $num_activities,
            'avg_processes_per_project' =>  number_format(round($avg_processes_per_project, 2), 2),
            'avg_activities_per_process' =>  number_format(round($avg_activities_per_process, 2), 2),
            'avg_grade_per_process' =>  number_format(round($avg_grade_per_process, 2), 2),
            'avg_duration_per_process' => number_format(round($avg_duration_per_process, 2), 2),
            'avg_num_people_per_process' => number_format(round($avg_num_people_per_process, 2), 2),
            'version_max_duration' => $version_max_duration,
            'version_min_duration' => $version_min_duration,
            'version_max_num_people' => $version_max_num_people,
            'version_min_num_people' => $version_min_num_people,
            'projects' => $projects
        ], 200);
    }
}
