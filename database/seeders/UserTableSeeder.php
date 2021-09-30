<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    public function run()
    {
        User::truncate();

        $faker = Factory::create();

        $roleIdAdminSystem = UserRole::ADMIN_SYSTEM;
        $adminSystem = ['admin', 'admin@gmail.com', 'admin123', 'Admin'];
        $this->insertUser($adminSystem, $roleIdAdminSystem);

        $roleIdModerator = UserRole::MODERATOR;
        $moderators = [
            ['nchanh', 'nchanh@gmail.com', 'admin123', 'Nguyễn Chánh'],
            ['pvvu', 'pvvu@gmail.com', 'admin123', 'Phan Văn Vũ']
        ];
        foreach ($moderators as $user) {
            $this->insertUser($user, $roleIdModerator);
        }

        $roleIdEditor = UserRole::EDITOR;
        $editor = [
            ['lvluu', 'lvluu@gmail.com', 'admin123', 'Lê Văn Lưu'],
            ['nvhduy', 'nvhduy@gmail.com', 'admin123', 'Nguyễn Vũ Hoài Duy'],
            ['lvphi', 'lvphi@gmail.com', 'admin123', 'Lê Văn Phi',]
        ];
        foreach ($editor as $user) {
            $this->insertUser($user, $roleIdEditor);
        }

        $roleIdMember = UserRole::MEMBER;
        $numberCreate = 10;
        for ($i = 0; $i < $numberCreate; $i++) {
            $user = [$faker->userName, $faker->email, 'admin123', $faker->name];
            $this->insertUser($user, $roleIdMember);
        }
    }

    private function insertUser ($user, $roleId)
    {
        $faker = Factory::create();

        User::create([
            'username' => $user[0],
            'email'    => $user[1],
            'password' => $user[2],
            'fullname' => $user[3],
            'phone'    => $faker->e164PhoneNumber,
            'address'  => $faker->address,
            'role_id'  => $roleId,
        ]);
    }
}
