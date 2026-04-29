<div class="modal fade" id="eventDetailModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 rounded-4 overflow-hidden shadow-lg">
            <div class="modal-header border-0 position-absolute top-0 end-0" style="z-index: 1050;">
                <button type="button" class="btn-close bg-white rounded-circle p-2 shadow-sm" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="row g-0">
                <div class="col-lg-5 bg-light d-flex align-items-center justify-content-center">
                    <img id="modal-event-image" src="" class="w-100 h-100 object-fit-cover" style="min-height: 350px;" onerror="this.src='{{ asset('images/default-event.jpg') }}'">
                </div>
                <div class="col-lg-7">
                    <div class="modal-body p-4 p-lg-5">
                        <span id="modal-event-badge" class="badge mb-3 px-3 py-2 shadow-sm"></span>
                        <h3 id="modal-event-title" class="fw-bold mb-4 text-dark"></h3>

                        <div class="event-meta mb-4 small">
                            <div class="d-flex align-items-center mb-3">
                                <div class="bg-primary bg-opacity-10 text-primary rounded-circle me-3 d-flex align-items-center justify-content-center" style="width: 35px; height: 35px;">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <div>
                                    <span class="text-muted d-block">Tanggal</span>
                                    <strong id="modal-event-date"></strong>
                                </div>
                            </div>
                            <div class="d-flex align-items-center mb-3">
                                <div class="bg-success bg-opacity-10 text-success rounded-circle me-3 d-flex align-items-center justify-content-center" style="width: 35px; height: 35px;">
                                    <i class="fas fa-user-edit"></i>
                                </div>
                                <div>
                                    <span class="text-muted d-block">Penyelenggara</span>
                                    <strong id="modal-event-creator"></strong>
                                </div>
                            </div>
                        </div>

                        <div class="description-section">
                            <h6 class="fw-bold text-dark border-bottom pb-2">Deskripsi Kegiatan</h6>
                            <p id="modal-event-description" class="text-muted" style="font-size: 0.9rem; line-height: 1.6; white-space: pre-line;"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>