<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
class RoleTableSeeder extends Seeder
{
    public function run()
    {
        $roles = ['Quản trị hệ thống', 'Quản trị viên', 'Biên tập viên', 'Người dùng'];
        foreach ($roles as $role)
        {
            Role::create([
                'name' => $role,
                'slug' => Str::slug($role),
            ]);
        }
    }
}
