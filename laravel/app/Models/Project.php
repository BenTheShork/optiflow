<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use HasFactory;

    protected $table = 'project';
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'num_processes',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
