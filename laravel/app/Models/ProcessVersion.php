<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'num_activities',
        'total_duration',
        'total_num_people',
        'grade',
        'file'
    ];

    public function process(): BelongsTo {
        return $this->belongsTo(Process::class);
    }

    public function activity(): HasMany {
        return $this->hasMany(Activity::class);
    }
}
