<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Course;
use Illuminate\Http\Request;

class ActivityController extends Controller
{


    public function index()
    {
        $activities = Activity::with(['video','pdf','quiz.answers'])->get();

        return response()->json([
             $activities
        ]);
    }

    public function showActivityWithCourse(Course $course)
    {
        // Charge les relations nécessaires
        $course->load([
            'activities.pdf',
            'activities.video',
            'activities.quiz.answers'
        ]);

        // Groupe les activités par type
        $pdfs = $course->activities->where('activity_type', 'pdf')->values();
        $videos = $course->activities->where('activity_type', 'video')->values();
        $quizzes = $course->activities->where('activity_type', 'quiz')->values();

        // Convertit le modèle Course en tableau pour modification
        $courseData = $course->toArray();

        // Remplace le tableau "activities" par les groupes
        $courseData['activities'] = [
            'pdfs' => $pdfs,
            'videos' => $videos,
            'quizzes' => $quizzes,
        ];

        return response()->json($courseData);
    }



    public function store(Request $request)
{
    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
        'activity_type' => 'required|in:video,pdf,quiz',
        // Champs spécifiques selon le type
        'pdf_title' => 'required_if:activity_type,pdf|string|max:255',
        'pdf_url' => 'required_if:activity_type,pdf|url',

        'video_title' => 'nullable|string|max:255',
        'video_url' => 'required_if:activity_type,video|url',
        'duration' => 'nullable|numeric|min:1',

        'question' => 'required_if:activity_type,quiz|string',
        'answers' => 'required_if:activity_type,quiz|array|min:1',
        'answers.*.reponse' => 'required|string',
        'answers.*.correct' => 'boolean',
    ]);

    // Création de l'activité principale
    $activity = Activity::create([
        'course_id' => $validated['course_id'],
        'activity_type' => $validated['activity_type'],
    ]);

    if ($activity->activity_type === 'pdf') {
        $activity->pdf()->create([
            'pdf_title' => $validated['pdf_title'],
            'pdf_url' => $validated['pdf_url'],
        ]);
    } elseif ($activity->activity_type === 'video') {
        $activity->video()->create([
            'video_url' => $validated['video_url'],
        ]);
    }elseif ($activity->activity_type === 'quiz') {
        $quiz = $activity->quiz()->create([
            'question' => $validated['question'],
        ]);

        foreach ($validated['answers'] as $answer) {
            $quiz->answers()->create([
                'reponse' => $answer['reponse'],
                'correct' => $answer['correct'] ?? false,
            ]);
        }
    }

    return response()->json([
        $activity->load(['pdf', 'video', 'quiz.answers'])
    ], 201);
}




public function update(Request $request, $id)
{
    $activity = Activity::findOrFail($id);

    $validated = $request->validate([
        'activity_type' => 'in:video,pdf,quiz',
        'pdf_title' => 'nullable|string|max:255',
        'pdf_url' => 'nullable|url',

        'video_title' => 'nullable|string|max:255',
        'video_url' => 'nullable|url',
        'duration' => 'nullable|numeric|min:1',

        'question' => 'nullable|string',
        'answers' => 'nullable|array|min:1',
        'answers.*.reponse' => 'required_with:answers|string',
        'answers.*.correct' => 'boolean',
    ]);

    // Si on veut changer le type (rare, mais possible)
    if (isset($validated['activity_type'])) {
        $activity->activity_type = $validated['activity_type'];
        $activity->save();
    }

    // Mise à jour selon le type actuel
    if ($activity->activity_type === 'pdf' && $activity->pdf) {
        $activity->pdf->update([
            'pdf_title' => $validated['pdf_title'] ?? $activity->pdf->pdf_title,
            'pdf_url' => $validated['pdf_url'] ?? $activity->pdf->pdf_url,
        ]);
    } elseif ($activity->activity_type === 'video' && $activity->video) {
        $activity->video->update([
            'video_url' => $validated['video_url'] ?? $activity->video->video_url,
        ]);
    } elseif ($activity->activity_type === 'quiz' && $activity->quiz) {
        $activity->quiz->update([
            'question' => $validated['question'] ?? $activity->quiz->question,
        ]);

        // Si tu veux remplacer les réponses :
        if (isset($validated['answers'])) {
            $activity->quiz->answers()->delete();
            foreach ($validated['answers'] as $answer) {
                $activity->quiz->answers()->create([
                    'reponse' => $answer['reponse'],
                    'correct' => $answer['correct'] ?? false,
                ]);
            }
        }
    }

    return response()->json([
        'message' => 'Activité mise à jour avec succès',
        'activity' => $activity->load(['pdf', 'video', 'quiz.answers'])
    ]);
}

public function destroy($id)
{
    $activity = Activity::findOrFail($id);
    $activity->delete(); // Les sous-modèles (pdf, video, quiz + answers) seront supprimés automatiquement

    return response()->json([
        'message' => 'Activité supprimée avec succès',
        'deleted_id' => $id
    ]);
}



}
