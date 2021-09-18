<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    public function run()
    {
        Role::truncate();

        $roles = ['Quản trị hệ thống', 'Quản trị viên', 'Biên tập viên', 'Người dùng'];
        foreach ($roles as $role)
        {
            Role::create([
                'name' => $role
            ]);
        }
    }
}
