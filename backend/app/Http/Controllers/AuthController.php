<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller {
    public function __construct(protected AuthService $service) {}

    public function register(Request $request) {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $token = $this->service->register($data);
        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }

    public function login(Request $request) {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $token = $this->service->login($data);
        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }
}