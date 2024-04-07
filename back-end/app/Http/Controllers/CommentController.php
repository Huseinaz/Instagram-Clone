<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function addComment(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'comment' => 'required|string',
        ]);

        $postId = $request->post_id;

        $post = Post::findOrFail($postId);

        $comment = new Comment();
        $comment->user_id = Auth::id();
        $comment->post_id = $postId;
        $comment->comment = $request->input('comment');
        $comment->save();

        return response()->json(['message' => 'Comment added successfully'], 201);
    }

    public function deleteComment(Request $request)
    {
        $request->validate([
            'comment_id' => 'required|exists:comments,id',
        ]);

        $commentId = $request->comment_id;

        $comment = Comment::findOrFail($commentId);

        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized to delete this comment'], 401);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }
}
