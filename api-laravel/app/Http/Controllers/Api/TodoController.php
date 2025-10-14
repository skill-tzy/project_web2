<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Tampilkan semua todo (urut dari yang terbaru)
     */
    public function index()
    {
        return Todo::orderByDesc('id')->get();
    }

    /**
     * Simpan todo baru
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'     => 'required|string|max:100',
            'completed' => 'boolean',
        ]);

        $todo = Todo::create($data);

        return response()->json($todo, 201);
    }

    /**
     * Tampilkan detail todo berdasarkan ID
     */
    public function show(Todo $todo)
    {
        return $todo;
    }

    /**
     * Update todo yang sudah ada
     */
    public function update(Request $request, Todo $todo)
    {
        $data = $request->validate([
            'title'     => 'sometimes|string|max:100',
            'completed' => 'sometimes|boolean',
        ]);

        $todo->update($data);

        return $todo;
    }

    /**
     * Hapus todo berdasarkan ID
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response()->noContent(); // 204 No Content
    }
}
