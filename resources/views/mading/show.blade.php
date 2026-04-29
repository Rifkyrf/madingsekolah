@extends('layouts.app')

@section('content')
<div class="container py-4">
    <!-- Header -->
    <div class="card mb-4">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-start flex-wrap">
                <div class="mb-3 mb-md-0">
                    <h2 class="mb-2">{{ $mading->title }}</h2>
                    <div class="d-flex align-items-center text-muted small flex-wrap">
                        <span class="me-3"><i class="fas fa-user me-1"></i>{{ $mading->user->name }}</span>
                        <span class="me-3"><i class="fas fa-calendar me-1"></i>{{ $mading->created_at->format('d M Y') }}</span>
                        <span class="badge {{ $mading->status === 'published' ? 'bg-success' : 'bg-warning' }}">
                            {{ ucfirst($mading->status) }}
                        </span>
                    </div>
                </div>
                
                <div class="d-flex gap-2 flex-wrap">
                    <a href="{{ route('mading.index') }}" class="btn btn-secondary btn-sm">
                        <i class="fas fa-arrow-left me-1"></i>Kembali
                    </a>
                    
                    <button onclick="downloadMadingPNG()" class="btn btn-info btn-sm">
                        <i class="fas fa-download me-1"></i>Download PNG
                    </button>
                    
                    @auth
                        @if(auth()->id() === $mading->user_id || auth()->user()->isAdmin())
                            <a href="{{ route('mading.edit', $mading) }}" class="btn btn-warning btn-sm">
                                <i class="fas fa-edit me-1"></i>Edit
                            </a>
                            <form method="POST" action="{{ route('mading.destroy', $mading) }}" class="d-inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Yakin hapus mading ini?')">
                                    <i class="fas fa-trash me-1"></i>Hapus
                                </button>
                            </form>
                        @endif
                    @endauth
                </div>
            </div>
        </div>
    </div>

    <!-- Mading Display -->
    <div class="card mb-4">
        <div class="card-header text-center">
            <h5 class="mb-0"><i class="fas fa-newspaper me-2"></i>Mading Digital</h5>
        </div>
        <div class="card-body text-center">
            <div class="canvas-container d-inline-block" style="max-width: 100%; overflow: auto;">
                <canvas id="madingDisplay" style="border: 1px solid #dee2e6; border-radius: 8px; max-width: 100%; height: auto;"></canvas>
            </div>
            
            @if($mading->description && $mading->description !== 'Mading Digital')
                <div class="mt-4 p-3 bg-light rounded">
                    <h6 class="fw-bold mb-2">Deskripsi:</h6>
                    <p class="mb-0 text-muted">{{ $mading->description }}</p>
                </div>
            @endif
        </div>
    </div>

    <!-- Comments Section -->
    @auth
    <div class="card">
        <div class="card-header">
            <h6 class="mb-0"><i class="fas fa-comments me-2"></i>Komentar</h6>
        </div>
        <div class="card-body">
            <!-- Add Comment Form -->
            <form class="mb-4" onsubmit="addComment(event)">
                <div class="d-flex gap-3">
                    <img src="{{ auth()->user()->profile_photo ? asset('storage/' . auth()->user()->profile_photo) : 'https://ui-avatars.com/api/?name=' . urlencode(auth()->user()->name) . '&background=1a4b8c&color=fff&size=40' }}" 
                         class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;">
                    <div class="flex-fill">
                        <textarea name="comment" class="form-control mb-2" rows="3" placeholder="Tulis komentar..." required></textarea>
                        <button type="submit" class="btn btn-primary btn-sm">
                            <i class="fas fa-paper-plane me-1"></i>Kirim
                        </button>
                    </div>
                </div>
            </form>
            
            <!-- Comments List -->
            <div id="commentsList">
                <div class="text-center text-muted py-4">
                    <i class="fas fa-comment-slash fa-2x mb-2"></i>
                    <p class="mb-0">Belum ada komentar. Jadilah yang pertama!</p>
                </div>
            </div>
        </div>
    </div>
    @endauth
</div>

<script>
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
    // Initialize display canvas
    const canvas = new fabric.Canvas('madingDisplay', {
        selection: false,
        hoverCursor: 'default',
        moveCursor: 'default'
    });
    
    // Store canvas reference globally for download function
    window.madingDisplayCanvas = canvas;
    
    // Load and display mading design
    @if($mading->design_data)
        const designData = @json($mading->design_data);
        
        if (designData && designData.objects) {
            canvas.loadFromJSON(designData, function() {
                // Make all objects non-selectable and non-movable
                canvas.forEachObject(function(obj) {
                    obj.selectable = false;
                    obj.evented = false;
                });
                
                canvas.renderAll();
                
                // Responsive canvas sizing
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
        } else {
            showPlaceholder(canvas, 'Data mading tidak valid');
        }
    @else
        showPlaceholder(canvas, 'Mading tidak dapat ditampilkan');
    @endif
    
    // Responsive canvas resize
    window.addEventListener('resize', function() {
        const container = document.querySelector('.canvas-container');
        if (container) {
            const containerWidth = container.clientWidth - 20;
            const originalWidth = @json($mading->design_data['width'] ?? 800);
            
            if (containerWidth < originalWidth) {
                const scale = containerWidth / originalWidth;
                canvas.setZoom(scale);
                canvas.setDimensions({
                    width: containerWidth,
                    height: (canvas.getHeight() / canvas.getZoom()) * scale
                });
            }
        }
    });
}

function showPlaceholder(canvas, message) {
    const text = new fabric.Text(message, {
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        originX: 'center',
        originY: 'center',
        fontSize: 20,
        fill: '#666',
        selectable: false,
        fontFamily: 'Poppins, Arial, sans-serif'
    });
    canvas.add(text);
    canvas.renderAll();
}

// Comment functionality
function addComment(event) {
    event.preventDefault();
    
    const form = event.target;
    const textarea = form.querySelector('textarea[name="comment"]');
    const comment = textarea.value.trim();
    
    if (!comment) return;
    
    // Simple UI update (in real app, send to server)
    const commentsList = document.getElementById('commentsList');
    const commentHtml = `
        <div class="d-flex gap-3 mb-3 p-3 bg-light rounded">
            <img src="{{ auth()->user()->profile_photo ? asset('storage/' . auth()->user()->profile_photo) : 'https://ui-avatars.com/api/?name=' . urlencode(auth()->user()->name) . '&background=1a4b8c&color=fff&size=32' }}" 
                 class="rounded-circle" style="width: 32px; height: 32px; object-fit: cover;">
            <div class="flex-fill">
                <div class="fw-bold small">{{ auth()->user()->name }}</div>
                <div class="text-muted small mt-1">${comment}</div>
                <div class="text-muted" style="font-size: 11px; margin-top: 4px;">Baru saja</div>
            </div>
        </div>
    `;
    
    if (commentsList.innerHTML.includes('Belum ada komentar')) {
        commentsList.innerHTML = commentHtml;
    } else {
        commentsList.insertAdjacentHTML('afterbegin', commentHtml);
    }
    
    textarea.value = '';
}

// Download mading as PNG
function downloadMadingPNG() {
    const canvas = document.getElementById('madingDisplay');
    if (!canvas) {
        alert('Canvas tidak ditemukan!');
        return;
    }
    
    // Get fabric canvas instance
    const fabricCanvas = canvas.fabric || window.madingDisplayCanvas;
    if (!fabricCanvas) {
        alert('Canvas belum siap. Silakan tunggu sebentar.');
        return;
    }
    
    try {
        // Create high-quality PNG
        const dataURL = fabricCanvas.toDataURL({
            format: 'png',
            quality: 1.0,
            multiplier: 2 // Higher resolution
        });
        
        // Create download link
        const link = document.createElement('a');
        link.download = 'mading-{{ $mading->title }}-' + new Date().getTime() + '.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
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
</script>

<style>
.canvas-container {
    display: inline-block;
    max-width: 100%;
}

.canvas-container canvas {
    display: block;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .canvas-container {
        width: 100%;
    }
    
    .d-flex.gap-2 {
        gap: 4px !important;
    }
    
    .btn-sm {
        padding: 4px 8px;
        font-size: 12px;
    }
}
</style>
@endsection