<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class FoodNutrientController extends Controller
{
    private $privateApiUrl;

    public function __construct()
    {
        $this->privateApiUrl = env('PRIVATE_API_URL');
    }

    public function nutrients(int $foodId)
    {
        $response = Http::get("{$this->privateApiUrl}/foods/{$foodId}/nutrients");
        return $response->json();
    }

    public function nutrient(Request $request, int $foodId, int $nutrientId) 
    {
        $response = Http::get("{$this->privateApiUrl}/foods/{$foodId}/nutrients/${nutrientId}");
        return $response->json();
    }

    public function addNutrient(Request $request, int $foodId, int $nutrientId)
    {
        $amountPerServing = $request->input('amountPerServing');
        $dataPoints = $request->input('dataPoints');
        $footnote = $request->input('footnote');
        
        $response = Http::put("{$this->privateApiUrl}/foods/{$foodId}/nutrients/{$nutrientId}", [
            'amountPerServing' => $amountPerServing,
            'dataPoints' => $dataPoints,
            'footnote' => $footnote,
        ]);
        return $response->json();
    }

    public function deleteNutrient(Request $request, int $foodId, int $nutrientId)
    {
        $response = Http::delete("{$this->privateApiUrl}/foods/{$foodId}/nutrients/${nutrientId}");
        return $response->json();
    }

}
