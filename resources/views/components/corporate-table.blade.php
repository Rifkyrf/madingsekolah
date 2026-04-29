@props(['id', 'title' => null])

<div class="card border-0 shadow-sm overflow-hidden">
    @if ($title)
        <div class="card-header bg-white border-bottom-0 py-3">
            <h5 class="mb-0 fw-bold text-dark">{{ $title }}</h5>
        </div>
    @endif
    <div class="card-body p-0">
        <div class="table-responsive">
            <table id="{{ $id }}"
                {{ $attributes->merge(['class' => 'table table-hover align-middle mb-0 w-100']) }}>
                <thead class="bg-light text-muted text-uppercase small">
                    {{ $thead }}
                </thead>
                <tbody>
                    {{ $slot }}
                </tbody>
            </table>
        </div>
    </div>
</div>

@push('scripts')
    <script>
        $(document).ready(function() {
            if (!$.fn.DataTable.isDataTable('#{{ $id }}')) {
                $('#{{ $id }}').DataTable({
                    responsive: true,
                    dom: '<"d-flex justify-content-between align-items-center p-3 border-bottom"<"d-flex align-items-center"l><"d-flex align-items-center"fB>>t<"d-flex justify-content-between align-items-center p-3 border-top"ip>',
                    buttons: [{
                        extend: 'collection',
                        text: '<i class="fas fa-download me-1"></i> Export',
                        className: 'btn btn-sm btn-outline-secondary',
                        buttons: ['copy', 'excel', 'pdf', 'print']
                    }],
                    language: {
                        search: "_INPUT_",
                        searchPlaceholder: "Cari data...",
                        lengthMenu: "_MENU_",
                        paginate: {
                            previous: '<i class="fas fa-chevron-left"></i>',
                            next: '<i class="fas fa-chevron-right"></i>'
                        }
                    },
                    pageLength: 10,
                    order: [
                        [0, 'desc']
                    ]
                });
            }
        });
    </script>
    <style>
        .dataTables_wrapper .dataTables_filter input {
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            padding: 6px 12px;
            margin-left: 10px;
            font-size: 0.875rem;
        }

        .dataTables_wrapper .dataTables_length select {
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            padding: 5px 10px;
            font-size: 0.875rem;
        }

        .dt-buttons .btn {
            border-radius: 8px !important;
        }
    </style>
@endpush
