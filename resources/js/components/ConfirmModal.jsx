import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function ConfirmModal({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Ya, Lanjutkan',
    cancelText = 'Batal',
    variant = 'warning',
    loading = false,
}) {
    useEffect(() => {
        if (open) {
            Swal.fire({
                title: title,
                text: description,
                icon: variant === 'danger' ? 'error' : variant === 'info' ? 'info' : variant === 'save' ? 'success' : 'warning',
                showCancelButton: true,
                confirmButtonText: confirmText,
                cancelButtonText: cancelText,
                customClass: {
                    confirmButton: variant === 'danger' 
                        ? 'bg-rose-600 hover:bg-rose-700 text-white rounded-xl px-6 py-2 ml-2' 
                        : 'bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 ml-2',
                    cancelButton: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl px-6 py-2'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {
                    onConfirm();
                } else {
                    onClose();
                }
            });
        }
    }, [open, title, description, confirmText, cancelText, variant]);

    return null; /* Render nothing since Swal handles the UI */
}
