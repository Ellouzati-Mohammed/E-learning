<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $fillable = ['video_url','activity_id'];

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
