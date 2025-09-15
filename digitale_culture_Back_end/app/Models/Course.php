<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'cours_title',
        'cours_description',
        'duration',
        'domain_id',
    ];

    public function domain()
    {
        return $this->belongsTo(Domain::class);
    }
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}
