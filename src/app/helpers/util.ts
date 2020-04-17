
import Swal from 'sweetalert2/dist/sweetalert2';

export let Util = {

    removeAccents(string: String) {
        return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    },

    showErrorMessage(message) {
        Swal.fire(
            'Error',
            message,
            'error'
        )
    },

    showSuccessMessage(message) {
        Swal.fire(
            'Success',
            message,
            'success'
        )
    }



}