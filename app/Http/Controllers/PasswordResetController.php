<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\PasswordResetToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Inertia\Inertia;

class PasswordResetController extends Controller
{
    public function showRequestForm()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    public function sendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $email = $request->email;
        $otp = (string) rand(100000, 999999);

        PasswordResetToken::where('email', $email)->delete();
        PasswordResetToken::create([
            'email' => $email,
            'token' => $otp,
            'expires_at' => Carbon::now()->addMinutes(15),
        ]);

        try {
            Mail::send('mails.otp', ['otp' => $otp], function ($m) use ($email) {
                $m->to($email)->subject('Kode OTP Reset Password');
            });

            return redirect()->route('password.otp.verify', ['email' => $email])
                             ->with('message', 'Kode OTP telah dikirim ke email Anda.');
        } catch (\Exception $e) {
            PasswordResetToken::where('email', $email)->delete();
            return back()->withErrors(['email' => 'Gagal mengirim OTP ke email ini.']);
        }
    }

    public function showVerifyForm()
    {
        return Inertia::render('Auth/VerifyOtp', [
            'email' => request('email') ?? session('email')
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|string|length:6',
        ]);

        $token = PasswordResetToken::where('email', $request->email)
            ->where('token', $request->otp)
            ->where('expires_at', '>', Carbon::now())
            ->first();

        if (!$token) {
            return back()->withErrors(['otp' => 'Kode OTP tidak valid atau sudah kedaluwarsa.']);
        }

        session(['reset_email' => $request->email]);

        return redirect()->route('password.otp.reset.form');
    }

    public function showResetForm()
    {
        if (!session('reset_email')) {
            return redirect()->route('password.otp.request');
        }

        return Inertia::render('Auth/ResetPassword');
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $email = session('reset_email');
        if (!$email) {
            return redirect()->route('login')->withErrors(['error' => 'Sesi kedaluwarsa.']);
        }

        $user = User::where('email', $email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        PasswordResetToken::where('email', $email)->delete();
        session()->forget('reset_email');

        return redirect()->route('login')->with('success', 'Password berhasil direset! Silakan login kembali.');
    }
}