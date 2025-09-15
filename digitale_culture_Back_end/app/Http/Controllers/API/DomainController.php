<?php

namespace App\Http\Controllers\API;

use App\Models\Domain;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DomainController extends Controller
{
    public function index()
    {
        return response()->json(
            Domain::get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'domain_title' => 'required|string|max:255',
            'domain_description' => 'nullable|string',
            'domain_image_url' => 'required|string',
            'level' => 'required|in:beginner,intermediate,advanced',
        ]);

        $domain = Domain::create($validated);
        return response()->json($domain, 201);
    }

    public function show($id)
    {
        $domain = Domain::with('courses')->findOrFail($id);
        return response()->json($domain);
    }





    public function update(Request $request, Domain $domain)
    {
        $validated = $request->validate([
            'domain_title' => 'sometimes|string|max:255',
            'domain_description' => 'nullable|string',
            'domain_image_url' => 'sometimes|string',
            'level' => 'sometimes|in:beginner,intermediate,advanced',
        ]);

        $domain->update($validated);
        return response()->json($domain);
    }

    public function destroy(Domain $domain)
    {
        $domain->delete();
        return response()->json(null, 204);
    }
}
