<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('kategori_guru_id')->nullable()->after('role');
            $table->foreign('kategori_guru_id')->references('id')->on('kategori_guru')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['kategori_guru_id']);
            $table->dropColumn('kategori_guru_id');
        });
    }
};