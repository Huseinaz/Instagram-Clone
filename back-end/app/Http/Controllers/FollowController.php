<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    public function followUser(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        $userToFollow = $request->user_id;

        if (Auth::id() == $userToFollow) {
            return response()->json(['message' => 'You cannot follow yourself'], 400);
        }

        $existingFollow = Follow::where('follower_id', Auth::id())
            ->where('following_id', $userToFollow)
            ->first();

        if ($existingFollow) {
            return response()->json(['message' => 'You are already following this user'], 400);
        }

        $follow = new Follow();
        $follow->follower_id = Auth::id();
        $follow->following_id = $userToFollow;
        $follow->save();

        return response()->json(['message' => 'Successfully followed user'], 201);
    }

    public function unfollowUser(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        $userToUnfollow = $request->user_id;

        $existingFollow = Follow::where('follower_id', Auth::id())
            ->where('following_id', $userToUnfollow)
            ->first();

        if (!$existingFollow) {
            return response()->json(['message' => 'You are not following this user'], 400);
        }

        $existingFollow->delete();

        return response()->json(['message' => 'Successfully unfollowed user'], 201);
    }
}
