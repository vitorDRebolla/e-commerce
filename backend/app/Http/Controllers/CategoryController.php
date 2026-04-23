<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    protected $service;

    public function __construct(CategoryService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $categories = $this->service->getAllCategories();
        return CategoryResource::collection($categories);
    }
}