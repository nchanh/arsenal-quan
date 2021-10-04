<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
          'title' => 'required|max:190|unique:posts,title,' . $this->post->id,
          'short_description' => 'required',
          'thumbnail' => 'required',
          'content' => 'required',
          'status' => 'required',
          'category_id' => 'required',
        ];
    }

    public function response(array $errors)
    {
        return response()->json($errors, 422);
    }
}
