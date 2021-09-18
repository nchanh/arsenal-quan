<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategoryTableSeeder extends Seeder
{
    public function run()
    {
        Category::truncate();

        $categories = [
            ['Arsenal news', 'Tin Arsenal'],
            ['Analytical news', 'Tin phân tích'],
            ['Side news', 'Tin ngoài lề'],
            ['Transfer news', 'Tin chuyển nhượng'],
            ['Match Schedule', 'Lịch thi đấu'],
            ['Football commentary', 'Nhận định bóng đá']
        ];

        foreach ($categories as $category)
        {
            Category::create([
                'name_en' => $category[0],
                'name_vi' =>  $category[1],
                'slug'    => Str::slug($category[1]),
                'user_id'   => UserRole::ADMIN_SYSTEM,
            ]);
        }
    }
}
