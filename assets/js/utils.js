/*
=========================================
StudyForge
utils.js

Funciones reutilizables
=========================================
*/

const Utils = {

    /*
    =========================================
    Genera un ID único
    =========================================
    */
    uuid() {

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {

        const r = Math.random() * 16 | 0;

        const v = c === "x"
             ? r
            : (r & 0x3 | 0x8);

            return v.toString(16);

        });

    },

    /*
    =========================================
    Fecha de hoy (YYYY-MM-DD)
    =========================================
    */
    today() {

        return new Date().toISOString().split("T")[0];

    },

    /*
    =========================================
    Fecha legible
    Ej: 2026-06-25 → 25/06/2026
    =========================================
    */
    formatDate(date) {

        if (!date) return "";

        const options = {

            day: "2-digit",
            month: "2-digit",
            year: "numeric"

        };

        return new Date(date).toLocaleDateString("es-CR", options);

    },

    /*
    =========================================
    Días entre dos fechas
    =========================================
    */
    daysBetween(start, end) {

        const first = new Date(start);
        const second = new Date(end);

        const difference = second - first;

        return Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

    },

    /*
    =========================================
    Capitalizar texto
    =========================================
    */
    capitalize(text) {

        if (!text) return "";

        return text.charAt(0).toUpperCase() + text.slice(1);

    },

    /*
    =========================================
    Eliminar espacios dobles
    =========================================
    */
    cleanText(text) {

        return text.trim().replace(/\s+/g, " ");

    },

    /*
    =========================================
    Toast temporal
    =========================================
    */
    showToast(message, type = "success") {

        const container = document.getElementById("toast-container");

        if (!container) return;

        const toast = document.createElement("div");

        toast.className = `toast toast-${type}`;

        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {

            toast.classList.add("toast-show");

        }, 10);

        setTimeout(() => {

            toast.classList.remove("toast-show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    },

    /*
    =========================================
    Debounce
    =========================================
    */
    debounce(callback, delay = 300) {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                callback(...args);

            }, delay);

        };

    },

    /*
    =========================================
    Confirmación simple
    =========================================
    */
    confirm(message) {

        return window.confirm(message);

    },

    /*
    =========================================
    Porcentaje
    =========================================
    */
    percentage(current, total) {

        if (total === 0) return 0;

        return Math.round((current / total) * 100);

    },

    /*
    =========================================
    Formatear minutos
    =========================================
    */
    formatMinutes(minutes) {

        const hours = Math.floor(minutes / 60);

        const mins = minutes % 60;

        if (hours === 0) {

            return `${mins} min`;

        }

        if (mins === 0) {

            return `${hours} h`;

        }

        return `${hours} h ${mins} min`;

    },

    /*
    =========================================
    Copia profunda de objetos
    =========================================
    */
    clone(object) {

        return structuredClone(object);

    },

    /*
    =========================================
    Modal de confirmación
    =========================================
    */

    confirmModal(message, onConfirm) {

        if (document.getElementById("confirm-modal")) return;

        document.body.insertAdjacentHTML(

            "beforeend",

            `

    <div id="confirm-modal" class="modal-wrapper">

        <div class="modal-overlay"></div>

        <div class="modal">

            <div class="modal-header">

                <h2>Confirmar acción</h2>

            </div>

            <div class="modal-body">

                <p>${message}</p>

            </div>

            <div class="modal-footer">

                <button
                    id="confirm-cancel"
                    class="btn btn-outline">

                    Cancelar

                </button>

                <button
                    id="confirm-ok"
                    class="btn btn-danger">

                    Eliminar

                </button>

            </div>

        </div>

    </div>

    `

        );

        document
            .getElementById("confirm-cancel")
            .onclick = () => {

                document
                    .getElementById("confirm-modal")
                    .remove();

            };

        document
            .getElementById("confirm-ok")
            .onclick = () => {

                onConfirm();

                document
                    .getElementById("confirm-modal")
                    .remove();

            };

    }

};