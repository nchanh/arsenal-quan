<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'username' => 'required|max:190|unique:users,username,' . $this->user->id,
            'fullname' => 'required|max:190',
            'phone' => 'required|max:15',
            'address' => 'required|max:190',
        ];
    }
}
