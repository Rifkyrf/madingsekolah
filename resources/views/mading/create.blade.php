@extends('layouts.app')

@section('content')
<div class="container-fluid py-4">
    <div class="row">
        <!-- Sidebar Tools -->
        <div class="col-lg-3 col-md-4 mb-4">
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0"><i class="fas fa-tools me-2"></i>Tools Mading</h5>
                </div>
                <div class="card-body">
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" onclick="madingEditor.addText()">
                            <i class="fas fa-font me-2"></i>Tambah Teks
                        </button>
                        <button class="btn btn-success" onclick="madingEditor.addImage()">
                            <i class="fas fa-image me-2"></i>Tambah Gambar
                        </button>
                        <button class="btn btn-info" onclick="madingEditor.addRect()">
                            <i class="fas fa-square me-2"></i>Tambah Kotak
                        </button>
                        <button class="btn btn-warning" onclick="madingEditor.addCircle()">
                            <i class="fas fa-circle me-2"></i>Tambah Lingkaran
                        </button>
                    </div>

                    <hr>

                    <div class="mb-3">
                        <label class="form-label">Warna</label>
                        <input type="color" id="colorPicker" class="form-control form-control-color" value="#000000">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Ukuran Font: <span id="fontSizeValue">20px</span></label>
                        <input type="range" id="fontSize" min="12" max="72" value="20" class="form-range">
                    </div>

                    <hr>

                    <div class="d-grid gap-2">
                        <button class="btn btn-outline-warning" onclick="madingEditor.clearCanvas()">
                            <i class="fas fa-eraser me-2"></i>Bersihkan
                        </button>
                        <button class="btn btn-outline-danger" onclick="madingEditor.deleteSelected()">
                            <i class="fas fa-trash me-2"></i>Hapus Terpilih
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Canvas Area -->
        <div class="col-lg-9 col-md-8">
            <!-- Header -->
            <div class="card mb-4">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                            <h4 class="mb-1">{{ isset($mading) ? 'Edit' : 'Buat' }} Mading Digital</h4>
                            <p class="text-muted mb-0">Buat mading digital yang menarik</p>
                        </div>
                        <div class="d-flex gap-2 flex-wrap">
                            <button onclick="madingEditor.downloadPNG()" class="btn btn-info">
                                <i class="fas fa-download me-2"></i>Download PNG
                            </button>
                            <button onclick="madingEditor.saveDraft()" class="btn btn-warning">
                                <i class="fas fa-save me-2"></i>Simpan Draft
                            </button>
                            <button onclick="madingEditor.publish()" class="btn btn-success">
                                <i class="fas fa-paper-plane me-2"></i>Publikasikan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Canvas Container -->
            <div class="card">
                <div class="card-body text-center">
                    <div class="canvas-wrapper" style="overflow: auto; max-width: 100%;">
                        <canvas id="madingCanvas" class="border" style="max-width: 100%; height: auto;"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
// Load Fabric.js if not already loaded
if (typeof fabric === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js';
    script.onload = function() {
        console.log('Fabric.js loaded successfully');
        initializeCanvas();
    };
    script.onerror = function() {
        console.error('Failed to load Fabric.js');
        alert('Error: Gagal memuat library canvas. Silakan refresh halaman.');
    };
    document.head.appendChild(script);
} else {
    console.log('Fabric.js already loaded');
    document.addEventListener('DOMContentLoaded', initializeCanvas);
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing mading editor...');

    // Tunggu sampai Fabric.js benar-benar siap
    function initializeCanvas() {
        if (typeof fabric === 'undefined') {
            console.log('Waiting for Fabric.js...');
            setTimeout(initializeCanvas, 100);
            return;
        }

        console.log('Initializing canvas with Fabric.js');

        // Responsive canvas size
        const isMobile = window.innerWidth < 768;
        const canvasWidth = isMobile ? 350 : 800;
        const canvasHeight = isMobile ? 500 : 600;

        // Initialize canvas dengan pengaturan optimal
        const canvas = new fabric.Canvas('madingCanvas', {
            width: canvasWidth,
            height: canvasHeight,
            backgroundColor: '#ffffff',
            selection: true,
            preserveObjectStacking: true
        });

        console.log('Canvas initialized successfully');

        // Font size slider update
        const fontSizeSlider = document.getElementById('fontSize');
        const fontSizeValue = document.getElementById('fontSizeValue');
        if (fontSizeSlider && fontSizeValue) {
            fontSizeSlider.addEventListener('input', function() {
                fontSizeValue.textContent = this.value + 'px';
            });
        }

        // Helper functions
        function dataURLToBlob(dataURL) {
            const parts = dataURL.split(';base64,');
            const contentType = parts[0].split(':')[1];
            const raw = window.atob(parts[1]);
            const uint8Array = new Uint8Array(raw.length);
            for (let i = 0; i < raw.length; ++i) {
                uint8Array[i] = raw.charCodeAt(i);
            }
            return new Blob([uint8Array], { type: contentType });
        }

        function showLoading(show = true) {
            document.body.style.opacity = show ? '0.7' : '1';
            document.body.style.pointerEvents = show ? 'none' : 'auto';
        }

        // Mading Editor Object
        window.madingEditor = {
            canvas: canvas,

            addText() {
                const text = prompt('Masukkan teks:');
                if (text) {
                    const textObj = new fabric.Textbox(text, {
                        left: Math.random() * 200 + 50,
                        top: Math.random() * 200 + 50,
                        fontSize: parseInt(fontSizeSlider?.value || 20),
                        fill: document.getElementById('colorPicker')?.value || '#000000',
                        editable: true,
                        width: 200,
                        fontFamily: 'Poppins, Arial, sans-serif'
                    });
                    canvas.add(textObj);
                    canvas.setActiveObject(textObj);
                    canvas.renderAll();
                }
            },

            addRect() {
                const rect = new fabric.Rect({
                    left: Math.random() * 200 + 100,
                    top: Math.random() * 200 + 100,
                    width: 120,
                    height: 80,
                    fill: document.getElementById('colorPicker')?.value || '#000000',
                    selectable: true
                });
                canvas.add(rect);
                canvas.setActiveObject(rect);
                canvas.renderAll();
            },

            addCircle() {
                const circle = new fabric.Circle({
                    left: Math.random() * 200 + 100,
                    top: Math.random() * 200 + 100,
                    radius: 50,
                    fill: document.getElementById('colorPicker')?.value || '#000000',
                    selectable: true
                });
                canvas.add(circle);
                canvas.setActiveObject(circle);
                canvas.renderAll();
            },

            addImage() {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = function(e) {
                    const file = e.target.files[0];
                    if (!file) return;

                    // Check file size (max 2MB)
                    if (file.size > 2 * 1024 * 1024) {
                        alert('Ukuran file terlalu besar. Maksimal 2MB.');
                        return;
                    }

                    showLoading(true);
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        fabric.Image.fromURL(event.target.result, function(img) {
                            const scale = Math.min(200 / img.width, 200 / img.height);
                            img.set({
                                left: Math.random() * 100 + 50,
                                top: Math.random() * 100 + 50,
                                scaleX: scale,
                                scaleY: scale
                            });
                            canvas.add(img);
                            canvas.setActiveObject(img);
                            canvas.renderAll();
                            showLoading(false);
                        });
                    };
                    reader.readAsDataURL(file);
                };
                input.click();
            },

            deleteSelected() {
                const activeObject = canvas.getActiveObject();
                if (activeObject) {
                    canvas.remove(activeObject);
                    canvas.renderAll();
                } else {
                    alert('Pilih objek yang ingin dihapus terlebih dahulu.');
                }
            },

            clearCanvas() {
                if (confirm('Yakin ingin menghapus semua objek?')) {
                    canvas.clear();
                    canvas.backgroundColor = '#ffffff';
                    canvas.renderAll();
                }
            },

            getDesignData() {
                return JSON.stringify(canvas.toJSON(['selectable', 'hasControls', 'hasBorders']));
            },

            loadDesignData(data) {
                if (data && data.objects) {
                    showLoading(true);
                    canvas.loadFromJSON(data, () => {
                        canvas.renderAll();
                        showLoading(false);
                    });
                }
            },

            async saveToServer(title, status) {
                if (!title || !title.trim()) {
                    alert('Judul tidak boleh kosong!');
                    return;
                }

                // Cek apakah ada objek di canvas
                if (canvas.getObjects().length === 0) {
                    alert('Canvas kosong! Tambahkan setidaknya satu objek.');
                    return;
                }

                showLoading(true);

                try {
                    const designData = this.getDesignData();
                    const thumbnailDataUrl = canvas.toDataURL({ format: 'png', quality: 0.8 });

                    const formData = new FormData();
                    formData.append('title', title.trim());
                    formData.append('content', 'Mading Digital');
                    formData.append('design_data', designData);
                    formData.append('status', status);
                    formData.append('thumbnail', dataURLToBlob(thumbnailDataUrl), 'thumbnail.png');

                    const url = @json(isset($mading) ? route('mading.update', $mading) : route('mading.store'));
                    const method = @json(isset($mading) ? 'PUT' : 'POST');

                    if (method === 'PUT') {
                        formData.append('_method', 'PUT');
                    }

                    const response = await fetch(url, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                        }
                    });

                    const data = await response.json();

                    if (data.success) {
                        alert('Mading berhasil disimpan!');
                        window.location.href = '{{ route("mading.index") }}';
                    } else {
                        throw new Error(data.message || 'Gagal menyimpan!');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Terjadi kesalahan: ' + (error.message || 'Gagal menyimpan mading'));
                } finally {
                    showLoading(false);
                }
            },

            saveDraft() {
                const title = prompt('Masukkan judul mading (akan disimpan sebagai draft):');
                if (title) {
                    this.saveToServer(title, 'draft');
                }
            },

            publish() {
                const title = prompt('Masukkan judul mading (akan dipublikasikan):');
                if (title) {
                    this.saveToServer(title, 'published');
                }
            },

            downloadPNG() {
                if (canvas.getObjects().length === 0) {
                    alert('Canvas kosong! Tidak ada yang bisa didownload.');
                    return;
                }

                // Create download link
                const dataURL = canvas.toDataURL({
                    format: 'png',
                    quality: 1.0,
                    multiplier: 2 // Higher resolution
                });

                const link = document.createElement('a');
                link.download = 'mading-digital-' + new Date().getTime() + '.png';
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
                    document.body.removeChild(toast);
                }, 3000);
            }
        };

        // Load existing design if editing
        @if(isset($mading) && $mading->design_data)
            madingEditor.loadDesignData(@json($mading->design_data));
        @endif

        // Responsive canvas resize
        window.addEventListener('resize', function() {
            const newWidth = window.innerWidth < 768 ? 350 : 800;
            const newHeight = window.innerWidth < 768 ? 500 : 600;
            canvas.setDimensions({ width: newWidth, height: newHeight });
        });

        console.log('Mading Editor berhasil diinisialisasi!');
    }

    // Mulai inisialisasi
    initializeCanvas();
});
</script>

<style>
.canvas-wrapper {
    display: inline-block;
    max-width: 100%;
}

.loading {
    opacity: 0.6;
    pointer-events: none;
}

@media (max-width: 768px) {
    .d-grid {
        grid-template-columns: 1fr 1fr;
        gap: 8px;
    }

    .canvas-wrapper {
        width: 100%;
        overflow-x: auto;
    }
}

/* Canvas border styling */
#madingCanvas {
    border: 2px solid #dee2e6;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
@endsection