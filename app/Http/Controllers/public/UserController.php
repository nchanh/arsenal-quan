<?php

namespace App\Http\Controllers\public;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        return response()->json(null, 404);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update($request->all());

        return response()->json(['message' => 'Update post susscess'], 200);
    }

    public function destroy($id)
    {
        //
    }

    public function getUser() {
      $userId = Auth::user()->id;
      $user = User::with('role')->find($userId);

      return response()->json($user);
    }

    public function updateOnlyImage(Request $request, User $user)
    {
        $user->update($request->all());

        return response()->json(['message' => 'Update post susscess'], 200);
    }

    public function changePassword(ChangePasswordRequest $request, User $user)
    {
        $user->update($request->all());

        return response()->json(['message' => 'Update post susscess'], 200);
    }
}
