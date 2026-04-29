@props(['title', 'value', 'icon', 'color' => 'primary', 'percentage' => null, 'up' => true])

<div class="card border-0 shadow-sm h-100 overflow-hidden">
    <div class="card-body p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="stats-icon bg-{{ $color }} bg-opacity-10 text-{{ $color }} rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px;">
                <i class="fas fa-{{ $icon }} fa-lg"></i>
            </div>
            @if ($percentage !== null)
                <div
                    class="badge rounded-pill bg-{{ $up ? 'success' : 'danger' }} bg-opacity-10 text-{{ $up ? 'success' : 'danger' }}">
                    <i class="fas fa-arrow-{{ $up ? 'up' : 'down' }} me-1"></i> {{ $percentage }}%
                </div>
            @endif
        </div>
        <h6 class="text-muted mb-1 fw-medium">{{ $title }}</h6>
        <h3 class="mb-0 fw-bold">{{ $value }}</h3>
    </div>
    <div class="bg-{{ $color }}" style="height: 4px; opacity: 0.2;"></div>
</div>
