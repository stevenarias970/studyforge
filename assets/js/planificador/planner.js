/*
=========================================
StudyForge
planner.js

Controlador del módulo Planificador
=========================================
*/

const Planner = {

    /*
    =========================================
    Inicializar módulo
    =========================================
    */

    init() {

        this.bindEvents();

        this.bindCardEvents();

    },

    /*
    =========================================
    Eventos
    =========================================
    */

    bindEvents() {

        const primaryButton = document.getElementById("primary-action");

        if (!primaryButton) return;

        primaryButton.onclick = () => {

            if (App.currentModule !== "planner") return;

            this.newSubject();

        };

    },

    /*
    =========================================
    Nueva materia
    =========================================
    */

    newSubject() {

        PlannerView.openSubjectModal();

        this.bindCreateEvent();

    },

    /*
    =========================================
    Guardar nueva materia
    =========================================
    */

    bindCreateEvent() {

        const button = document.getElementById("save-subject");

        if (!button) return;

        button.onclick = () => {

            const nombre = document.getElementById("subject-name").value;
            const descripcion = document.getElementById("subject-description").value;
            const fechaLimite = document.getElementById("subject-date").value;
            const minutosPorDia = document.getElementById("subject-minutes").value;

            if (
                !nombre.trim() ||
                !fechaLimite ||
                !minutosPorDia
            ) {

                alert("Completa todos los campos obligatorios.");

                return;

            }

            PlannerStorage.createSubject({

                nombre,
                descripcion,
                fechaLimite,
                minutosPorDia

            });

            PlannerView.closeModal();

            this.refresh();

        };

    },

    /*
    =========================================
    Eventos de las tarjetas
    =========================================
    */

    bindCardEvents() {

        // Botón Editar
        document
            .querySelectorAll(".edit-subject")
            .forEach(button => {

                button.onclick = () => {

                    const id = button.dataset.id;

                    this.editSubject(id);

                };

            });

        // Botón Eliminar
        document
            .querySelectorAll(".delete-subject")
            .forEach(button => {

                button.onclick = () => {

                    const id = button.dataset.id;

                    this.deleteSubject(id);

                };

            });
            // Botón Abrir
            document
                .querySelectorAll(".open-subject")
                .forEach(button => {

                    button.onclick = () => {

                        const id = button.dataset.id;

                        this.openSubject(id);

                    };

                });

    },

    

    /*
    =========================================
    Eliminar materia
    =========================================
    */

        deleteSubject(id) {

        Utils.confirmModal(

        `¿Deseas eliminar esta materia?`,

        () => {

            PlannerStorage.deleteSubject(id);

            Utils.showToast(

                "Materia eliminada."

            );

            this.refresh();

        }

    );

    return;

    },

    /*
    =========================================
    Editar materia
    =========================================
    */

    editSubject(id) {

        const subject = PlannerStorage.getSubjectById(id);

        if (!subject) return;

        PlannerView.openSubjectModal(subject);

        this.bindUpdateEvent(id);

    },

    /*
    =========================================
    Abrir materia
    =========================================
    */

    openSubject(id) {

        PlannerDetail.render(id);

    },

    /*
    =========================================
    Actualizar vista
    =========================================
    */

    refresh() {

        PlannerView.render();

        this.bindCardEvents();

    },
    /*
    =========================================
    Actualizar materia
    =========================================
    */

    bindUpdateEvent(id) {

        const button = document.getElementById("save-subject");

        if (!button) return;

        button.onclick = () => {

            const nombre = document.getElementById("subject-name").value;
            const descripcion = document.getElementById("subject-description").value;
            const fechaLimite = document.getElementById("subject-date").value;
            const minutosPorDia = document.getElementById("subject-minutes").value;

            if (!nombre.trim() || !fechaLimite) {

                alert("Completa los campos obligatorios.");

                return;

            }

            PlannerStorage.updateSubject(id, {

                nombre,
                descripcion,
                fechaLimite,
                minutosPorDia

            });

            PlannerView.closeModal();

            this.refresh();

        };

    }

};