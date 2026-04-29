@extends('layouts.app')

@section('content')
<div class="container py-4">
    <div class="d-flex justify-content-between items-center mb-6">
        <h1 class="text-2xl font-bold">Arsip Event OSIS</h1>
        <a href="{{ route('osis.events.index') }}" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Kembali ke Event
        </a>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        @foreach($events as $event)
        <div class="bg-white rounded-lg shadow overflow-hidden opacity-75">
            @if($event->photo)
            <img src="{{ $event->photo_url }}" alt="{{ $event->title }}" class="w-full h-48 object-cover">
            @endif
            <div class="p-4">
                <h3 class="font-bold text-lg mb-2">{{ $event->title }}</h3>
                <p class="text-gray-600 text-sm mb-2">{{ Str::limit($event->description, 100) }}</p>
                <p class="text-gray-500 font-medium mb-3">{{ $event->event_date->format('d M Y') }}</p>
                <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">Selesai</span>
            </div>
        </div>
        @endforeach
    </div>

    {{ $events->links() }}
</div>
@endsection