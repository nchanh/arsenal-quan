<?php

namespace App\Http\Controllers\public\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $status = 400;
        $rememberMe = true;
        $fieldType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email'  : 'username';
        $inputUser = [
            $fieldType => $request->username,
            'password' => $request->password,
        ];

        if (Auth::attempt($inputUser, $rememberMe)) {
            $status = 201;
            $user = Auth::user();
            $roleId =  $user->role_id;
            $userOutput = [];
            $userOutput['fullname'] = $user->fullname;
            $userOutput['token'] = $user->createToken('App')->accessToken;
            $userOutput['role'] = Role::find($roleId)->slug;

            return response()->json(['data' => $userOutput], $status);
        }

        return response()->json(['message' => 'Username or email address incorrect.'], $status);
    }

    public function logout() {
        $status = 401;
        if (Auth::check()) {
            $status = 204;
            Auth::user()->oauthAcessTokens()->delete();
            return response()->json(['message' => 'Logged'], $status);
        }
        return response()->json(['message' => 'Unauthorised'], $status);
    }
}
