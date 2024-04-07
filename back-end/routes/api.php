<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::post('user/update', [UserController::class, 'updateUser']);

Route::post('posts', [PostController::class, 'createPost']);
Route::get('posts', [PostController::class, 'getPosts']);

Route::post('follow', [FollowController::class, 'followUser']);
Route::delete('unfollow', [FollowController::class, 'unfollowUser']);

Route::post('like', [LikeController::class, 'likePost']);
Route::delete('unlike', [LikeController::class, 'unlikePost']);

Route::post('comment', [CommentController::class, 'addComment']);
Route::delete('deleteComment', [CommentController::class, 'deleteComment']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
