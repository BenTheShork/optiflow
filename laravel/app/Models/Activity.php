<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Activity extends Model
{
    use HasFactory;

    protected $table = 'activity';

    protected $fillable = [
        'process_version_id',
        'sequence_number',
        'name',
        'description',
        'duration',
        'num_people'
    ];

    public function process_version(): BelongsTo {
        return $this->belongsTo(ProcessVersion::class);
    }
}
