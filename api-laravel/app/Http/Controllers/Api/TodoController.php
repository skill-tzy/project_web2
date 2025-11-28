<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Tampilkan semua todo (hanya todo milik user yg login)
     */
    public function index(Request $request)
    {
        return Todo::where('user_id', $request->user()->id)
                   ->orderByDesc('id')
                   ->get();
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

        // Tambahkan user_id otomatis
        $data['user_id'] = $request->user()->id;

        $todo = Todo::create($data);

        return response()->json($todo, 201);
    }

    /**
     * Cek kepemilikan todo
     */
    private function authorizeOwner(Todo $todo, Request $request)
    {
        if ($todo->user_id !== $request->user()->id) {
            abort(403, 'Forbidden');
        }
    }

    /**
     * Tampilkan detail todo berdasarkan ID
     */
    public function show(Request $request, Todo $todo)
    {
        $this->authorizeOwner($todo, $request);
        return $todo;
    }

    /**
     * Update todo yang sudah ada
     */
    public function update(Request $request, Todo $todo)
    {
        $this->authorizeOwner($todo, $request);

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
    public function destroy(Request $request, Todo $todo)
    {
        $this->authorizeOwner($todo, $request);

        $todo->delete();

        return response()->noContent(); // 204 No Content
    }
}
