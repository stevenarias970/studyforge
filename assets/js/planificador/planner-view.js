/*
=========================================
StudyForge
planner-view.js

Vista del Planificador
=========================================
*/

const PlannerView = {

    /*
    =========================================
    Render principal
    =========================================
    */

    render() {

        const container = document.getElementById("module-container");

        const subjects = PlannerStorage.getSubjects();

        if (subjects.length === 0) {

            this.renderEmpty(container);

            return;

        }

        this.renderSubjects(container, subjects);

    },

    /*
    =========================================
    Estado vacío
    =========================================
    */

    renderEmpty(container) {

        container.innerHTML = `

            <section class="planner">

                <div class="planner-header">

                    <div>

                        <h2>Planificador de Estudio</h2>

                        <p>

                            Organiza todas tus materias.

                        </p>

                    </div>

                </div>

                <div class="empty-state">

                    <i data-lucide="book-open"></i>

                    <h3>

                        No hay materias.

                    </h3>

                    <p>

                        Presiona "Nueva materia"
                        para comenzar.

                    </p>

                </div>

            </section>

        `;

        lucide.createIcons();

    },

    /*
    =========================================
    Mostrar materias
    =========================================
    */

    renderSubjects(container, subjects) {

        container.innerHTML = `

            <section class="planner">

                <div class="planner-header">

                    <div>

                        <h2>Planificador de Estudio</h2>

                        <p>

                            ${subjects.length} materias registradas

                        </p>

                    </div>

                </div>

                <div class="planner-grid">

                    ${subjects.map(subject => this.subjectCard(subject)).join("")}

                </div>

            </section>

        `;

        lucide.createIcons();

    },

    /*
    =========================================
    Tarjeta
    =========================================
    */

    subjectCard(subject) {

        return `

            <div class="subject-card">

                <h3>

                    ${subject.nombre}

                </h3>

                <p>

                    ${subject.descripcion}

                </p>

                <div class="subject-info">

                    <span>

                        <i data-lucide="calendar"></i>

                        ${Utils.formatDate(subject.fechaLimite)}

                    </span>

                    <span>

                        <i data-lucide="clock-3"></i>

                        ${subject.minutosPorDia} min diarios

                    </span>

                </div>

                <div class="subject-progress">

                    <div class="subject-progress-header">

                        <span>

                            Progreso

                        </span>

                        <span>

                            ${subject.progreso}%

                        </span>

                    </div>

                    <div class="progress">

                        <div
                            class="progress-bar"
                            style="width:${subject.progreso}%">

                        </div>

                    </div>

                </div>

                <div class="subject-actions">

                <button
                    class="btn btn-primary open-subject"
                    data-id="${subject.id}">

                    Abrir

                </button>

                <button
                    class="btn btn-outline edit-subject"
                    data-id="${subject.id}">

                    Editar

                </button>

                <button
                    class="btn btn-danger delete-subject"
                    data-id="${subject.id}">

                    Eliminar

                </button>

            </div>
            </div>

        `;

    },

        /*
        =========================================
        Abrir modal
        =========================================
        */

        openSubjectModal(subject = null) {

            if (document.getElementById("planner-modal")) return;

            document.body.insertAdjacentHTML(

                "beforeend",

                this.renderModal(subject)

            );

            lucide.createIcons();

            this.bindModalEvents();

        },

        /*
        Cerrar modal
        */

        closeModal() {

            const modal = document.getElementById("planner-modal");

            if (modal) {

                modal.remove();

            }

        },

        /*
        Eventos del modal
        */

        bindModalEvents() {

            const modal = document.getElementById("planner-modal");

            if (!modal) return;

            modal
                .querySelector(".btn-cancel")
                .addEventListener("click", () => {

                    this.closeModal();

                });

            modal
                .querySelector(".modal-overlay")
                .addEventListener("click", () => {

                    this.closeModal();

                });

        },

        /*
        =========================================
        HTML del modal
        =========================================
        */

        renderModal(subject = null) {

            return `

        <div
            id="planner-modal"
            class="modal-wrapper">

            <div class="modal-overlay"></div>

            <div class="modal">

                <div class="modal-header">

                    <h2>

                        ${subject ? "Editar Materia" : "Nueva Materia"}

                    </h2>

                    <button
                        class="btn-close btn-cancel">

                        <i data-lucide="x"></i>

                    </button>

                </div>

                <div class="modal-body">

                    <div class="input-group">

                        <label>

                            Nombre

                        </label>

                        <input
                            id="subject-name"
                            type="text"
                            placeholder="Ej. Programación Web"
                            value="${subject?.nombre || ""}">

                    </div>

                    <div class="input-group">

                        <label>

                            Descripción

                        </label>

                        <textarea
                            id="subject-description"
                            placeholder="Describe la materia">${subject?.descripcion || ""}</textarea>

                    </div>

                    <div class="input-group">

                        <label>

                            Fecha límite

                        </label>

                        <input
                            id="subject-date"
                            type="date"
                            value="${subject?.fechaLimite || ""}">

                    </div>

                    <div class="input-group">

                        <label>

                            Minutos por día

                        </label>

                        <input
                            id="subject-minutes"
                            type="number"
                            min="10"
                            value="${subject?.minutosPorDia || 60}">

                    </div>

                </div>

                <div class="modal-footer">

                    <button
                        class="btn btn-outline btn-cancel">

                        Cancelar

                    </button>

                    <button
                        class="btn btn-primary"
                        id="save-subject">

                        ${subject ? "Actualizar" : "Guardar"}

                    </button>

                </div>

            </div>

        </div>

        `;

        },

    /*
    =========================================
    Modal eliminar
    =========================================
    */

    openDeleteModal(subject) {

        if (document.getElementById("delete-modal")) return;

        document.body.insertAdjacentHTML(

            "beforeend",

            this.renderDeleteModal(subject)

        );

        this.bindDeleteEvents(subject.id);

        lucide.createIcons();

    },

    closeDeleteModal() {

        const modal = document.getElementById("delete-modal");

        if (modal) {

            modal.remove();

        }

    },

    bindDeleteEvents(id) {

        document
            .querySelector(".delete-cancel")
            .onclick = () => {

                this.closeDeleteModal();

            };

        document
            .querySelector(".delete-overlay")
            .onclick = () => {

                this.closeDeleteModal();

            };

        document
            .querySelector(".delete-confirm")
            .onclick = () => {

                PlannerStorage.deleteSubject(id);

                this.closeDeleteModal();

                Planner.refresh();

            };

        },

        renderDeleteModal(subject) {

            return `

        <div
            id="delete-modal"
            class="modal-wrapper">

            <div class="modal-overlay delete-overlay"></div>

            <div class="modal">

                <div
                    style="
                        text-align:center;
                        margin-bottom:20px;
                    ">

                    <i
                        data-lucide="trash-2"
                        style="
                            width:70px;
                            height:70px;
                            color:#ef4444;
                        ">

                    </i>

                    <h2
                        style="
                            margin-top:15px;
                        ">

                        ¿Eliminar materia?

                    </h2>

                    <p
                        style="
                            color:#666;
                        ">

                        Esta acción no se puede deshacer.

                    </p>

                    <h3
                        style="
                            margin-top:20px;
                            color:#ef4444;
                        ">

                        ${subject.nombre}

                    </h3>

                </div>

                <div
                    style="
                        display:flex;
                        justify-content:flex-end;
                        gap:12px;
                    ">

                    <button
                        class="btn btn-outline delete-cancel">

                        Cancelar

                    </button>

                    <button
                        class="btn btn-danger delete-confirm">

                        Eliminar

                    </button>

                </div>

            </div>

        </div>

        `;

    }
    



};