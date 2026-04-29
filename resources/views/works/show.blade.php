@extends('layouts.app')

@section('title', 'Detail Karya')

@section('content')
<div class="container-fluid py-4" style="background-color: #f0f2f5; min-height: 100vh;">
    <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
            <!-- Card Utama -->
            <div class="card shadow-sm border-0" style="border-radius: 16px; overflow: hidden;">
                <!-- Header -->
                <div class="text-white px-4 py-3" style="background: var(--topbar-bg); color: var(--text-color)">
                    <h4 class="mb-0">
                        <i class="fas fa-file-alt me-2"></i>
                        Detail Karya
                    </h4>
                    <p class="mb-0 opacity-75" style="font-size: 0.9rem;">Lihat dan unduh karya siswa</p>
                </div>

                <!-- Body -->
                <div class="card-body p-4">
                    <!-- Informasi Pengunggah (Instagram Style) -->
                    <div class="d-flex align-items-center gap-3 mb-4">
                        <!-- Foto Profil -->
                        <img src="{{ $work->user->profile_photo_url }}"
                             alt="Foto Profil"
                             class="rounded-circle"
                             style="width: 50px; height: 50px; object-fit: cover; border: 2px solid #0d47a1;">

                        <!-- Nama & Info -->
                        <div>
                            <strong>{{ $work->user->name }}</strong>
                            <p class="mb-0 text-muted small">
                                {{ $work->user->nis }} •
                                <span class="badge bg-info">{{ ucfirst($work->user->role) }}</span>
                            </p>
                        </div>
                    </div>

                    <!-- Judul -->
                    <h5 class="fw-bold mb-3">{{ $work->title }}</h5>

                    <!-- Jenis Konten & Tanggal -->
                    <div class="mb-4">
                        @php
                            $typeLabels = [
                                'karya' => 'Karya Siswa',
                                'mading' => 'Mading Digital',
                                'mingguan' => 'weekly',
                                'harian' => 'daily',
                                'prestasi' => 'prestasi',
                                'opini' => 'opini',
                                'event' => 'event',
                            ];
                        @endphp
                        <small class="text-muted">
                            {{ $typeLabels[$work->type] ?? 'Konten' }} •
                            {{ \Carbon\Carbon::parse($work->created_at)->format('d M Y, H:i') }}
                        </small>
                    </div>

                    <!-- Preview Konten (Video, Gambar, Mading, atau Placeholder) -->
                    <div class="text-center mb-4">
                        @php
                            $extension = strtolower($work->file_type);
                            $isImage = in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp']);
                            $isVideo = in_array($extension, ['mp4', 'webm', 'mov', 'avi']);
                            $isMading = $work->type === 'mading';
                        @endphp

                        @if($isMading && $work->design_data)
                            <!-- Mading Canvas Display -->
                            <div class="canvas-container d-inline-block" style="max-width: 100%; overflow: auto;">
                                <canvas id="madingDisplay" style="border: 1px solid #dee2e6; border-radius: 8px; max-width: 100%; height: auto;"></canvas>
                            </div>
                            
                            <!-- Mading Download Button -->
                            <div class="mt-3">
                                <button onclick="downloadMadingPNG()" class="btn btn-info btn-sm">
                                    <i class="fas fa-download me-1"></i>Download PNG
                                </button>
                            </div>
                            
                        @elseif($isImage)
                            <img src="{{ asset('storage/' . $work->file_path) }}"
                                 alt="Gambar Karya"
                                 class="img-fluid rounded"
                                 style="max-height: 400px; object-fit: cover; width: auto;">

                        @elseif($isVideo)
                            <video controls class="w-100 rounded" style="max-height: 400px;">
                                <source src="{{ asset('storage/' . $work->file_path) }}" type="video/{{ $extension }}">
                                Browser Anda tidak mendukung pemutar video.
                            </video>

                        @else
                            <img src="{{ $work->thumbnail_path
                                ? asset('storage/' . $work->thumbnail_path)
                                : asset('storage/icons/file.png') }}"
                                 alt="Thumbnail"
                                 class="img-fluid rounded"
                                 style="max-height: 300px; object-fit: cover; width: auto;">
                        @endif
                    </div>

                    <!-- Deskripsi -->
                    <div class="mb-4">
                        <label class="form-label fw-semibold">Deskripsi</label>
                        <div class="bg-light p-3 rounded" style="white-space: pre-wrap;">
                            {!!
                                preg_replace(
                                    '/(https?:\/\/[^\s]+)/',
                                    '<a href="$1" target="_blank" class="text-primary text-decoration-underline">$1</a>',
                                    htmlspecialchars($work->description ?? 'Tidak ada deskripsi.')
                                )
                            !!}
                        </div>
                    </div>

                    <!-- Interaksi: Like & Komentar -->
                    <div class="row mb-4">
                        <div class="col-6">
                            @if(Auth::check())
                            <!-- Tombol Like dengan class dan data-id -->
                            <button type="button" class="btn {{ $userLiked ? 'btn-danger' : 'btn-outline-primary' }} btn-sm d-flex align-items-center gap-2 like-btn" data-work-id="{{ $work->id }}">
                                <i class="fas fa-heart"></i>
                                <span class="like-count">{{ $work->likes->count() }} Like</span>
                            </button>
                            @else
                                <button class="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2" disabled>
                                    <i class="fas fa-heart"></i>
                                    <span>{{ $work->likes->count() }} Like</span>
                                </button>
                            @endif
                        </div>
                        <div class="col-6">
                            @if(Auth::check())
                                <a href="#commentList" class="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2">
                                    <i class="fas fa-comment"></i>
                                    <span id="commentCount">{{ $comments->count() }} Komentar</span>
                                </a>
                            @else
                                <button class="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2" disabled>
                                    <i class="fas fa-comment"></i>
                                    <span>{{ $comments->count() }} Komentar</span>
                                </button>
                            @endif
                        </div>
                    </div>

                    <!-- Komentar -->
                    <div class="mt-4">
                        <h6>Komentar (<span id="commentCount">{{ $comments->count() }}</span>):</h6>

                        <div id="commentList">
                            @forelse($comments as $comment)
                                <!-- Struktur komentar untuk full page disesuaikan agar seragam -->
                                <!-- Perbaikan: Tempatkan data-comment-id di elemen yang membungkus seluruh isi komentar -->
                                <div class="mb-3 p-2 bg-light rounded" data-comment-id="{{ $comment->id }}">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <div>
                                            <strong>{{ $comment->user->name }}</strong>
                                            <p class="mb-0">{{ $comment->content }}</p>
                                            <small class="text-muted">{{ $comment->created_at->diffForHumans() }}</small>
                                        </div>
                                        @if(Auth::check() && (Auth::id() === $comment->user_id || Auth::user()->isAdmin()))
                                            <div class="btn-group btn-group-sm">
                                                <button class="btn btn-outline-warning edit-comment-btn"
                                                        data-comment-id="{{ $comment->id }}"
                                                        data-comment-content="{{ $comment->content }}"
                                                        title="Edit komentar">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="btn btn-outline-danger delete-comment-btn"
                                                        data-comment-id="{{ $comment->id }}"
                                                        title="Hapus komentar">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            @empty
                                <p class="text-muted"><em>Belum ada komentar.</em></p>
                            @endforelse
                        </div>

                        <!-- Form Komentar -->
                        @if(Auth::check())
                            <!-- Perbaikan: Gunakan class="comment-form" dan method="POST" -->
                            <form class="comment-form mt-3" action="{{ route('comments.store') }}" method="POST" data-work-id="{{ $work->id }}">
                                @csrf
                                <input type="hidden" name="work_id" value="{{ $work->id }}">
                                <div class="input-group">
                                    <input type="text" name="content" class="form-control" placeholder="Tulis komentar..." maxlength="1000" required>
                                    <button class="btn btn-primary" type="submit">Kirim</button>
                                </div>
                                <div class="text-danger mt-2 comment-error" style="display:none;"></div>
                            </form>
                        @else
                            <p class="text-muted mt-2"><small>Login untuk berkomentar.</small></p>
                        @endif
                    </div>

                    <!-- Tombol Bagikan -->
                    <div class="text-center mt-4">
                        <button class="btn btn-outline-info btn-sm" onclick="copyLink()">
                            <i class="fas fa-share-alt me-1"></i> Bagikan Link
                        </button>
                    </div>

                    <!-- Aksi -->
                    <div class="d-flex justify-content-between mt-5">
                        <a href="{{ route('dashboard') }}" class="btn btn-outline-secondary">
                            <i class="fas fa-arrow-left me-1"></i> Kembali
                        </a>
                        @if(auth()->check() && (auth()->id() === $work->user_id || auth()->user()->role === 'admin' || auth()->user()->role === 'guru'))
                        <form method="POST" action="{{ route('work.destroy', $work->id) }}" class="d-inline">
                            @csrf
                            @method('DELETE')
                            <button type="button" class="btn btn-danger btn-sm delete-confirm">
                                <i class="fas fa-trash me-1"></i> Hapus
                            </button>
                        </form>
                    @endif

                        @if(Auth::check() && ($work->user_id == Auth::id() || Auth::user()->isAdmin()))
                            <a href="{{ route('work.edit', $work->id) }}" class="btn btn-warning px-4">
                                <i class="fas fa-edit me-2"></i> Edit
                            </a>
                        @endif

                        <!-- Tombol Unduh / Buka File -->
                        @if($isImage || $isVideo)
                            <a href="{{ asset('storage/' . $work->file_path) }}"
                               class="btn btn-success px-4"
                               target="_blank">
                                <i class="fas fa-download me-2"></i> Unduh
                            </a>
                        @else
                            <a href="{{ asset('storage/' . $work->file_path) }}"
                               class="btn btn-success px-4"
                               target="_blank">
                                <i class="fas fa-cloud-download-alt me-2"></i> Buka File
                            </a>
                        @endif
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center mt-4 text-muted" style="font-size: 0.9rem;">
                © 2025 Bakti Nusantara 666 • Portal Karya Siswa
            </div>
        </div>
    </div>
</div>

<!-- Script Bagikan Link -->
<script>
function copyLink() {
    const url = window.location.href;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link berhasil disalin!\nBagikan ke temanmu 😊');
        }).catch(() => fallbackCopy(url));
    } else {
        fallbackCopy(url);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Link disalin!');
}

// Mading Display Functions
@if(isset($work) && $work->type === 'mading' && $work->design_data)
// Load Fabric.js if not already loaded
if (typeof fabric === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js';
    script.onload = initializeMadingDisplay;
    document.head.appendChild(script);
} else {
    document.addEventListener('DOMContentLoaded', initializeMadingDisplay);
}

function initializeMadingDisplay() {
    const canvas = new fabric.Canvas('madingDisplay', {
        selection: false,
        hoverCursor: 'default',
        moveCursor: 'default'
    });
    
    window.madingDisplayCanvas = canvas;
    
    const designData = @json($work->design_data);
    
    if (designData && designData.objects) {
        canvas.loadFromJSON(designData, function() {
            canvas.forEachObject(function(obj) {
                obj.selectable = false;
                obj.evented = false;
            });
            
            canvas.renderAll();
            
            setTimeout(() => {
                const container = document.querySelector('.canvas-container');
                if (container) {
                    const containerWidth = container.clientWidth - 20;
                    const canvasWidth = canvas.getWidth();
                    
                    if (canvasWidth > containerWidth) {
                        const scale = containerWidth / canvasWidth;
                        canvas.setZoom(scale);
                        canvas.setDimensions({
                            width: containerWidth,
                            height: canvas.getHeight() * scale
                        });
                    }
                }
            }, 100);
        });
    }
}

function downloadMadingPNG() {
    const canvas = window.madingDisplayCanvas;
    if (!canvas) {
        alert('Canvas belum siap. Silakan tunggu sebentar.');
        return;
    }
    
    try {
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1.0,
            multiplier: 2
        });
        
        const link = document.createElement('a');
        link.download = 'mading-{{ $work->title }}-' + new Date().getTime() + '.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        const toast = document.createElement('div');
        toast.className = 'alert alert-success position-fixed';
        toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        toast.innerHTML = '<i class="fas fa-check-circle me-2"></i>Mading berhasil didownload sebagai PNG!';
        document.body.appendChild(toast);
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 3000);
        
    } catch (error) {
        console.error('Error downloading PNG:', error);
        alert('Gagal mendownload mading. Silakan coba lagi.');
    }
}
@endif
</script>

<!-- Script Asset -->
<script src="{{ asset('javascript/detail-karya.js') }}" defer></script>

<!-- Style Tambahan -->
<style>
    .form-label {
        font-weight: 600;
        color: #495057;
    }
    .card {
        border-radius: 16px;
    }
    .bg-light {
        border-radius: 8px;
    }
    video {
        max-width: 100%;
        height: auto;
        border-radius: 12px;
    }
    @media (max-width: 576px) {
        .text-center img, video {
            width: 100% !important;
            height: auto !important;
        }
    }
</style>
@endsection