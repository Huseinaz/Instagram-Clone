<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function likePost(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id'
        ]);

        $postId = $request->post_id;

        $existingLike = Like::where('user_id', Auth::id())
            ->where('post_id', $postId)
            ->first();

        if ($existingLike) {
            return response()->json(['message' => 'You have already liked this post'], 400);
        }

        $like = new Like();
        $like->user_id = Auth::id();
        $like->post_id = $postId;
        $like->save();

        return response()->json(['message' => 'Post liked successfully'], 201);
    }

    public function unlikePost(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id'
        ]);

        $postId = $request->post_id;

        $like = Like::where('user_id', Auth::id())
            ->where('post_id', $postId)
            ->first();

        if (!$like) {
            return response()->json(['message' => 'You have not liked this post'], 400);
        }

        $like->delete();

        return response()->json(['message' => 'Post unliked successfully'], 200);
    }
}
