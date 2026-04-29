<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('works', function (Blueprint $table) {
            if (Schema::hasColumn('works', 'status')) {
                $table->index('status', 'idx_works_status');
            }
            if (Schema::hasColumn('works', 'type')) {
                $table->index('type', 'idx_works_type');
            }
            $table->index('created_at', 'idx_works_created_at');
        });

        Schema::table('osis_members', function (Blueprint $table) {
            $table->index('sekbid', 'idx_osis_sekbid');
            $table->index('angkatan', 'idx_osis_angkatan');
        });

        Schema::table('osis_events', function (Blueprint $table) {
            $table->index('event_date', 'idx_events_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('works', function (Blueprint $table) {
            $table->dropIndex('idx_works_status');
            $table->dropIndex('idx_works_type');
            $table->dropIndex('idx_works_created_at');
        });

        Schema::table('osis_members', function (Blueprint $table) {
            $table->dropIndex('idx_osis_sekbid');
            $table->dropIndex('idx_osis_angkatan');
        });

        Schema::table('osis_events', function (Blueprint $table) {
            $table->dropIndex('idx_events_date');
        });
    }
};
