import Swal from 'sweetalert2/dist/sweetalert2';

export function showSuccessMessage(message) {
    Swal.fire(
        'Éxito',
        message,
        'success'
    );
}


export function showErrorMessage(message) {
    Swal.fire(
        'Error',
        message,
        'error'
    );
}
