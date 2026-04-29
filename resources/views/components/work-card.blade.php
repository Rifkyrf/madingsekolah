<div class="col-md-4 col-12 mb-4">
    <div class="card h-100 work-card shadow-sm border-0 rounded-3 overflow-hidden" 
         style="cursor: pointer; transition: transform 0.3s;"
         onmouseover="this.style.transform='translateY(-5px)'" 
         onmouseout="this.style.transform='translateY(0)'"
         data-bs-toggle="modal" 
         data-bs-target="#workModal" 
         data-work-id="{{ $work->id }}">
        
        <div class="position-relative">
            @php
                $thumb = $work->thumbnail_path ? asset('storage/' . $work->thumbnail_path) : $work->icon;
                if (!$work->thumbnail_path && str_starts_with($work->icon, 'http')) { $thumb = $work->icon; }
            @endphp
            <img src="{{ $thumb }}" 
                 class="card-img-top" 
                 style="height: 200px; object-fit: cover;" 
                 alt="{{ $work->title }}"
                 loading="lazy"
                 onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=No+Preview';">
            
            <div class="position-absolute top-0 end-0 m-2">
                <span class="badge bg-primary shadow-sm" style="font-size: 0.7rem; text-transform: uppercase;">
                    {{ $work->type_label }}
                </span>
            </div>
        </div>

        <div class="card-body d-flex flex-column">
            <h5 class="card-title h6 fw-bold text-dark mb-2">{{ Str::limit($work->title, 45) }}</h5>
            <p class="card-text text-muted small mb-3">{{ Str::limit($work->description, 80) }}</p>
            
            <div class="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <img src="{{ $work->user->profile_photo ? asset('storage/' . $work->user->profile_photo) : 'https://ui-avatars.com/api/?name=' . urlencode($work->user->name ?? 'User') }}" 
                         class="rounded-circle me-2" 
                         style="width: 24px; height: 24px; object-fit: cover;"
                         loading="lazy">
                    <span class="small text-dark fw-semibold">{{ $work->user->name ?? 'Anonim' }}</span>
                </div>
                <small class="text-muted" style="font-size: 0.7rem;">
                    <i class="far fa-clock me-1"></i>{{ $work->created_at->diffForHumans() }}
                </small>
            </div>
        </div>
    </div>
</div>
