<?php

namespace App\Models;

use App\Enums\PageStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Post extends Model
{
  use HasFactory, SoftDeletes;

  protected $fillable = ['title', 'short_description', 'category_id', 'thumbnail', 'content', 'slug', 'status', 'user_id'];

  public function setTitleAttribute($value)
  {
      $this->attributes['title'] = $value;
      $this->attributes['slug'] = Str::slug($value);
  }

  public function category()
  {
      return $this->belongsTo(Category::class);
  }

  public function user()
  {
      return $this->belongsTo(User::class);
  }

  public function tags()
  {
    return $this->belongsToMany(Tag::class, 'post_tag', 'post_id', 'tag_id');
  }

  public function scopeGetBySlug($query, $slug)
  {
      return $query->where('slug', $slug);
  }

  public function scopeGetByKeyword($query, $keyword)
  {
      return $query->where('title', 'LIKE', "%$keyword%")
          ->orWhere('short_description', 'LIKE', "%$keyword%")
          ->orWhere('content', 'LIKE', "%$keyword%");
  }

  public function scopeGetTop4($query)
  {
      return $query->orderBy('views', 'DESC')->take(4);
  }

  public function scopedCheckStatus($query) {
    return $query->where('status', PageStatus::ACTIVE);
  }
}
