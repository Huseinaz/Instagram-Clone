<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function createPost(Request $request)
    {
        $this->validate($request, [
            'caption' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $image = $request->file('image');
        $imageName = time() . '.' . $image->extension();
        $image->move(public_path('images'), $imageName);

        $post = new Post();
        $post->user_id = Auth::id();
        $post->caption = $request->caption;
        $post->image = $imageName;
        $post->save();

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post,
        ], 201);
    }

    public function getPosts()
    {
        $posts = Post::with('user')->latest()->get();

        return response()->json([
            'posts' => $posts,
        ], 200);
    }
}
