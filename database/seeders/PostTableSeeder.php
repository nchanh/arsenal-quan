<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostTableSeeder extends Seeder
{
    public function run()
    {
        Post::truncate();

        $faker = Factory::create();
        $numberCreate = 50;
        for ($i = 0; $i < $numberCreate; $i++)
        {
          $title = $faker->sentence($nbWords = 10, $variableNbWords = true);
          $slug = Str::slug($title);
            Post::create([
                'title' => $title,
                'short_description' => $faker->sentence($nbWords = 15, $variableNbWords = true),
                'content' =>  $faker->randomHtml(5, 8),
                'slug' =>  $slug,
                'category_id' => Category::inRandomOrder()->first()->id,
                'user_id' => User::inRandomOrder()->first()->id,
            ]);
            sleep(1);
        }
    }
}
