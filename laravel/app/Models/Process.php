<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Process extends Model
{
    use HasFactory;

    protected $table = 'process';
    protected $fillable = [
        'project_id',
        'name',
        'description',
        'num_versions',
        'best_version',
        'status',
    ];

    public function project(): BelongsTo {
        return $this->belongsTo(Project::class);
    }

    public function process_version(): HasMany {
        return $this->hasMany(ProcessVersion::class);
    }
}
