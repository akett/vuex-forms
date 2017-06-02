<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class APIController extends Controller
{

    protected function apiResponse($data, $status = 200, $headers = [])
    {
        return response()->json($data);
    }

    public function apiTest(Request $request)
    {
        return $this->apiResponse([
            'all'      => 'seems',
            'to'       => 'be',
            'working'  => 'as',
            'intended' => 'dude'
        ]);
    }

    public function validateFormTest(Request $request)
    {
        $this->validate($request, [
            'name'                  => 'required | min:2',
            'email'                 => 'required | email',
            'phone'                 => 'required | min:10 | max:10',
            'city'                  => 'required | min:3',
            'state'                 => 'required',
            'zip'                   => 'required | min:5 | max: 10',
            'website'               => 'required | url',
            'password'              => 'required | min:4 | confirmed',
            'password_confirmation' => 'required | min:4',
            'shipping_method'       => 'required',
            'terms_and_conditions'  => 'accepted',
        ]);

        $data = $request->only([
            'name',
            'email',
            'phone',
            'city',
            'state',
            'zip',
            'website',
            'password',
            'shipping_method',
            'receive_updates',
            'terms_and_conditions',
        ]);

        return $this->apiResponse($data);
    }
}
