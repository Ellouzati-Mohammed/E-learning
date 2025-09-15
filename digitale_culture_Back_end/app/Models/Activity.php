<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'activity_type'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function video()
    {
        return $this->hasOne(Video::class, 'activity_id');
    }

    public function pdf()
    {
        return $this->hasOne(Pdf::class, 'activity_id');
    }

    public function quiz()
    {
        return $this->hasOne(Quiz::class);
    }


}
