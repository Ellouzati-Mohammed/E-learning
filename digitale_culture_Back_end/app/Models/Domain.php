<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    use HasFactory;

    protected $fillable = [
        'domain_title',
        'domain_description',
        'domain_image_url',
        'level',
    ];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
