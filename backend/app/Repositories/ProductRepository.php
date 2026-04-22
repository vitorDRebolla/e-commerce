<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductRepository {
    public function getAll(array $filters): LengthAwarePaginator {
        $query = Product::query()->with('category');

        if (isset($filters['category'])) {
            $query->where('category_id', $filters['category']);
        }

        if (isset($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('description', 'like', '%' . $filters['search'] . '%');
            });
        }

        return $query->paginate(10);
    }

    public function findById(int $id): Product {
        return Product::with('category')->findOrFail($id);
    }

    public function create(array $data): Product {
        return Product::create($data);
    }
}