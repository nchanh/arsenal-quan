<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRoleUser
{
  public function handle(Request $request, Closure $next, ...$roles)
  {
      $user = Auth::user();

      foreach ($roles as $role) {
        if ($user->role_id == $role)
          return $next($request);
      }

      return response()->json(['error' => 'Bạn không có quyền truy cập chức năng.']);
  }
}
