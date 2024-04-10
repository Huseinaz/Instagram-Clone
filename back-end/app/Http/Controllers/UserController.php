<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    public function getUser()
    {
        // $user_id = auth()->user()->id;
        $user_id = 1;
        $user = User::find($user_id);
        return response()->json([
            'user' => $user
        ]);
    }

    public function updateUser(Request $request)
    {
        $request->validate([
            'profile_picture' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'string',
            'email' => 'string|email',
            'bio' => 'string',
        ]);

        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user_id = auth()->user()->id;

        $user = User::find($user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }


        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move(public_path('/profile_pictures/'), $filename);

            // Remove existing profile picture if it exists
            if ($user->profile_picture && File::exists(public_path('/profile_pictures/') . $user->profile_picture)) {
                File::delete(public_path('/profile_pictures/') . $user->profile_picture);
            }

            // Save the new profile picture filename to the user model
            $user->profile_picture = $filename;
        }

        // Update other user fields
        if ($request->filled('name')) {
            $user->name = $request->input('name');
        }

        if ($request->filled('email')) {
            $user->email = $request->input('email');
        }

        if ($request->filled('bio')) {
            $user->bio = $request->input('bio');
        }

        // Save the user model
        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }
}
