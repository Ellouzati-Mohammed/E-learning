<?php

namespace App\Http\Controllers\API;

use App\Models\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Domain;

class CourseController extends Controller
{
    public function index()
    {
        $courses=Course::get();
        return response()->json($courses);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cours_title' => 'required|string|max:255',
            'cours_description' => 'required|string',
            'duration' => 'nullable|numeric',
            'domain_id' => 'required|exists:domains,id',
        ]);

        $course = Course::create($validated);

        return response()->json($course, 201);
    }

    public function show(Course $course)
    {
        // Charger les informations du domaine ainsi que les activités associées
        $course = $course->load([
            'domain',           // Charger le domaine associé au cours
            'activities.pdf',   // Charger les activités PDF
            'activities.video'  // Charger les activités vidéo
        ]);

        return response()->json($course);
    }
    public function showDomainWithCourses(Domain $domain)
    {
        $domain = $domain->load([
            'courses'
        ]);

        return response()->json($domain);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'cours_title' => 'sometimes|string|max:255',
            'cours_description' => 'sometimes|string',
            'duration' => 'nullable|numeric',
            'domain_id' => 'sometimes|exists:domains,id',
        ]);

        $course->update($validated);

        return response()->json($course);
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json(null, 204);
    }
}
