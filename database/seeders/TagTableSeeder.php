<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagTableSeeder extends Seeder
{
    public function run()
    {
        Tag::truncate();

        $tags = [
            ['Arsenal', 'Arsenal'],
            ['Champions League', 'Vô địch các Câu lạc bộ châu Âu'],
            ['English Premier League', 'Ngoại hạng Anh'],
            ['Man United', 'Man United'],
            ['Chelsea', 'Chelsea'],
            ['Liverpool', 'Liverpool'],
            ['English Premier League','Ngoại hạng Anh'],
            ['Man City', 'Man City'],
            ['Leicester', 'Leicester'],
            ['Tottenham', 'Tottenham'],
            ['Everton', 'Everton'],
            ['Walford', 'Walford'],
            ['West Ham', 'West Ham'],
        ];

        foreach ($tags as $tag)
        {
            Tag::create([
                'name_en' => $tag[0],
                'name_vi' => $tag[1],
                'slug'    => Str::slug($tag[1]),
            ]);
        }
    }
}
