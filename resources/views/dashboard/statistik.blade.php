@extends('layouts.app')

@section('title', 'Dashboard Statistik')

@push('styles')
    <!-- DataTables CSS -->
    <link rel="stylesheet" href="https://cdn.datatables.net/2.3.5/css/dataTables.bootstrap5.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* CSS Card Kustom */
        .dashboard-stat-card {
            border: none;
            border-radius: 15px;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            position: relative;
            min-height: 120px;
            margin-bottom: 1.5rem;
        }

        .dashboard-stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .stat-card-1 {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .stat-card-2 {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .stat-card-3 {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }

        .stat-card-4 {
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        }

        .stat-card-content {
            padding: 1.5rem;
            color: white;
            position: relative;
            z-index: 2;
        }

        .stat-icon {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            opacity: 0.3;
            font-size: 3rem;
            z-index: 1;
            color: white;
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            color: white;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            display: block;
        }

        .stat-label {
            font-size: 0.9rem;
            opacity: 0.9;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: white;
            display: block;
        }

        .chart-card {
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            background: white;
        }

        .chart-card:hover {
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
        }

        .chart-card .card-header {
            background: white;
            border-bottom: 1px solid #e3e6f0;
            border-radius: 15px 15px 0 0 !important;
            padding: 1.25rem 1.5rem;
            font-weight: 600;
            color: #2e59d9;
        }

        .chart-container {
            position: relative;
            height: 250px;
            padding: 1rem;
        }

        .badge-status-draft {
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #000;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            border: none;
        }

        .badge-status-published {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: #000;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            border: none;
        }

        .section-title {
            color: #2e59d9;
            font-weight: 700;
            margin-bottom: 1.5rem;
            position: relative;
            padding-bottom: 0.5rem;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 3px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 2px;
        }

        @media (max-width: 768px) {
            .stat-number {
                font-size: 2rem !important;
            }

            .stat-icon {
                font-size: 2rem !important;
            }

            .stat-card-content {
                padding: 1rem !important;
            }
        }
    </style>
@endpush

@section('content')
    <div class="container-fluid py-4">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-5">
            <div>
                <h1 class="h2 text-gray-800 mb-2"><i class="fas fa-chart-line text-primary me-2"></i>Dashboard Statistik
                </h1>
                <p class="text-muted mb-0">Analisis dan insight data karya pengguna</p>
            </div>
        </div>

        <!-- Card Statistik -->
        <div class="row mb-5">
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="dashboard-stat-card stat-card-1">
                    <div class="stat-card-content">
                        <span class="stat-number">{{ $draftCount }}</span>
                        <span class="stat-label">DRAFT</span>
                        <i class="fas fa-file-alt stat-icon"></i>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
                <div class="dashboard-stat-card stat-card-2">
                    <div class="stat-card-content">
                        <span class="stat-number">{{ $publishedCount }}</span>
                        <span class="stat-label">PUBLISHED</span>
                        <i class="fas fa-check-circle stat-icon"></i>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
                <div class="dashboard-stat-card stat-card-3">
                    <div class="stat-card-content">
                        <span class="stat-number">{{ $totalUsers }}</span>
                        <span class="stat-label">TOTAL PENGGUNA</span>
                        <i class="fas fa-users stat-icon"></i>
                    </div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
                <div class="dashboard-stat-card stat-card-4">
                    <div class="stat-card-content">
                        <span class="stat-number">{{ $totalComments }}</span>
                        <span class="stat-label">TOTAL KOMENTAR</span>
                        <i class="fas fa-comments stat-icon"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="row mb-5">
            <div class="col-12 mb-4">
                <h3 class="section-title">Analisis Data</h3>
            </div>

            <div class="col-lg-3 col-md-6 mb-4">
                <div class="chart-card card">
                    <div class="card-header text-center">
                        <i class="fas fa-tasks me-2"></i>Status Karya
                    </div>
                    <div class="card-body p-0">
                        <div class="chart-container">
                            <canvas id="statusChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-3 col-md-6 mb-4">
                <div class="chart-card card">
                    <div class="card-header text-center">
                        <i class="fas fa-file me-2"></i>Jenis File
                    </div>
                    <div class="card-body p-0">
                        <div class="chart-container">
                            <canvas id="fileTypeChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-3 col-md-6 mb-4">
                <div class="chart-card card">
                    <div class="card-header text-center">
                        <i class="fas fa-palette me-2"></i>Jenis Konten
                    </div>
                    <div class="card-body p-0">
                        <div class="chart-container">
                            <canvas id="contentTypeChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-3 col-md-6 mb-4">
                <div class="chart-card card">
                    <div class="card-header text-center">
                        <i class="fas fa-user-tag me-2"></i>Pembagian Pengguna
                    </div>
                    <div class="card-body p-0">
                        <div class="chart-container">
                            <canvas id="roleChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <div class="row">
        <div class="col-12">
            <x-corporate-table id="articleReportTable" title="Laporan Artikel">
                <x-slot name="thead">
                    <tr>
                        <th class="ps-4">Judul</th>
                        <th>Kategori</th>
                        <th>File</th>
                        <th>Status</th>
                        <th>Tipe</th>
                        <th class="pe-4">Tanggal</th>
                    </tr>
                </x-slot>

                @foreach($articles as $article)
                <tr>
                    <td class="ps-4 fw-medium text-dark">{{ Str::limit($article->title, 40) }}</td>
                    <td>
                        <span class="badge bg-soft-primary text-primary px-3 py-2">
                            {{ $article->content_type ?? '-' }}
                        </span>
                    </td>
                    <td>
                        <span class="badge bg-soft-info text-info px-3 py-2">
                            {{ $article->file_type ?? '-' }}
                        </span>
                    </td>
                    <td>
                        <span class="badge {{ $article->status === 'published' ? 'bg-soft-success text-success' : 'bg-soft-warning text-warning' }} px-3 py-2">
                            {{ ucfirst($article->status) }}
                        </span>
                    </td>
                    <td>
                        <span class="badge bg-info text-white px-3 py-2">
                            {{ $article->type_label }}
                        </span>
                    </td>
                    <td class="pe-4 text-muted small">
                        {{ $article->created_at->format('d M Y') }}
                    </td>
                </tr>
                @endforeach
            </x-corporate-table>
        </div>
    </div>
</div>
@endsection

@push('scripts')
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const chartConfig = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 20, usePointStyle: true }
                    }
                }
            };

            // Status Chart
            new Chart(document.getElementById('statusChart'), {
                type: 'doughnut',
                data: {
                    labels: ['Draft', 'Published'],
                    datasets: [{
                        data: [{{ $draftCount }}, {{ $publishedCount }}],
                        backgroundColor: ['#FF6B6B', '#4ECDC4'],
                        borderWidth: 0
                    }]
                },
                options: chartConfig
            });

            // File Type Chart
            const fileTypeLabels = {!! $fileTypeData->pluck('file_type')->toJson() !!};
            const fileTypeCounts = {!! $fileTypeData->pluck('count')->toJson() !!};
            new Chart(document.getElementById('fileTypeChart'), {
                type: 'doughnut',
                data: {
                    labels: fileTypeLabels,
                    datasets: [{
                        data: fileTypeCounts,
                        backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
                        borderWidth: 0
                    }]
                },
                options: chartConfig
            });

            // Content Type Chart
            const contentTypeLabels = {!! $contentTypeData->pluck('content_type')->toJson() !!};
            const contentTypeCounts = {!! $contentTypeData->pluck('count')->toJson() !!};
            new Chart(document.getElementById('contentTypeChart'), {
                type: 'doughnut',
                data: {
                    labels: contentTypeLabels,
                    datasets: [{
                        data: contentTypeCounts,
                        backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
                        borderWidth: 0
                    }]
                },
                options: chartConfig
            });

            // Role Chart
            const roleLabels = {!! $roleData->pluck('name')->map(fn($name) => ucfirst($name))->toJson() !!};
            const roleCounts = {!! $roleData->pluck('users_count')->toJson() !!};
            new Chart(document.getElementById('roleChart'), {
                type: 'doughnut',
                data: {
                    labels: roleLabels,
                    datasets: [{
                        data: roleCounts,
                        backgroundColor: ['#45B7D1', '#96CEB4', '#FFEAA7', '#667eea', '#FF6B6B', '#4ECDC4'],
                        borderWidth: 0
                    }]
                },
                options: chartConfig
            });
        });
    </script>
@endpush