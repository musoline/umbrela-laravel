<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;


class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(10)->create();
        User::create([
            'name' => "Test Test",
            'email' => "test@test.com",
            'email_verified_at' => now(),
            'password' => '$2y$10$305xmo7s.rrr5.TfeCbRKu.8HKNvvMyll7feJ49sIvD3Vrl5iNci2', // QWERTY.123
            'remember_token' => Str::random(10),
            'is_admin' => 1
        ]);
    }
}
