<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProcessVersion extends Model
{
    use HasFactory;

    protected $table = 'process_version';

    protected $fillable = [
        'process_id',
        'description',
        'major',
        'minor',
        'patch',
        'total_duration',
        'total_num_people',
        'grade'
    ];

    public function process(): BelongsTo {
        return $this->belongsTo(Process::class);
    }
}
