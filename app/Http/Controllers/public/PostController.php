<?php

namespace App\Http\Controllers\public;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostCreateRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with(['category', 'user'])->latest()->get();

        return response()->json($posts);
    }

    public function store(PostCreateRequest $request)
    {
      $userId = Auth::user()->id;
      Post::create($request->all() + ['user_id' => $userId]);

      return response()->json(['message' => 'Insert post susscess'], 201);
    }

    public function show(Post $post)
    {
        return response()->json($post);
    }

    public function update(PostUpdateRequest $request, Post $post)
    {
      $post->update($request->all());

      return response()->json(['message' => 'Update post susscess'], 200);
    }

    public function destroy(Post $post)
    {
      $post->delete();

      return response()->json(null, 204);
    }

    public function getPostPagination()
    {
        $posts = Post::with(['category', 'user'])->latest()->paginate(10);

        return response()->json($posts->toArray());
    }

    public function showBySlug($slug)
    {
        $post = Post::with(['category', 'user'])->getBySlug($slug)->first();

        return response()->json($post);
    }

    public function getCategoryPagination($slug)
    {
        $categoryId = Category::getSlug($slug)->first()->id;
        $posts = Post::with(['category', 'user'])->where('category_id', $categoryId)->paginate(10);

        return response()->json($posts);
    }

    public function searchPosts($keyword)
    {
        $posts = Post::with(['category', 'user'])->getByKeyword($keyword)->paginate(10);

        return response()->json($posts);
    }
}
