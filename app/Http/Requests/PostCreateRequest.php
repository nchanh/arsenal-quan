<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostCreateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
          'title' => 'required|max:190|unique:posts',
          'short_description'    => 'required|max:190',
          // 'thumbnail' => 'required',
          'content' => 'required',
          'status' => 'required',
          'category_id' => 'required',
        ];
    }
}
