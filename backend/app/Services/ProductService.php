<?php

namespace App\Services;

use App\Repositories\ProductRepository;

class ProductService {
    public function __construct(protected ProductRepository $repository) {}

    public function listProducts(array $filters) {
        return $this->repository->getAll($filters);
    }

    public function getProduct(int $id) {
        return $this->repository->findById($id);
    }

    public function storeProduct(array $data) {
        return $this->repository->create($data);
    }

    public function updateProduct($id, array $data) {
        return $this->repository->update($id, $data);
    }

    public function deleteProduct($id) {
        return $this->repository->delete($id);
    }
}