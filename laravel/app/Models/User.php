<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Model
{
    use HasFactory;

    protected $table = 'user';
    protected $fillable = [
        'username',
        'token'
    ];

    public function project(): HasMany {
        return $this->hasMany(Project::class);
    }
}
