<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller {
    public function __construct(protected ProductService $service) {}

    public function index(Request $request) {
        $filters = $request->only(['category', 'search']);
        $products = $this->service->listProducts($filters);
        return ProductResource::collection($products);
    }

    public function show($id) {
        $product = $this->service->getProduct($id);
        return new ProductResource($product);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'image_url' => 'nullable|url'
        ]);

        $product = $this->service->storeProduct($data);
        return new ProductResource($product);
    }

    public function update(Request $request, $id){
        $product = $this->service->updateProduct($id, $request->all());
        return new ProductResource($product);
    }

    public function destroy($id){
        $this->service->deleteProduct($id);
        return response()->json(['message' => 'Produto removido com sucesso']);
    }
}