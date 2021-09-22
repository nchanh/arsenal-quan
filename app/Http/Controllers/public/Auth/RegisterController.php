<?php

namespace App\Http\Controllers\public\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $status = 201;
        User::create($request->all());

        return response()->json(['message' => 'Register success'], $status);
    }
}
