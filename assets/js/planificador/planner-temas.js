/*
=========================================
StudyForge
planner-temas.js

Vista de temas
=========================================
*/

const PlannerTopics = {

    /*
    =========================================
    Renderizar temas
    =========================================
    */

    render(subjectId) {

        const container = document.getElementById("topics-container");

        if (!container) return;

        const topics = PlannerStorage.getTopics(subjectId);

        if (topics.length === 0) {

            container.innerHTML = `

                <div class="empty-state">

                    <i data-lucide="book-open"></i>

                    <h3>

                        No hay temas registrados.

                    </h3>

                    <p>

                        Agrega el primer tema para comenzar.

                    </p>

                </div>

            `;

            lucide.createIcons();

            return;

        }

        container.innerHTML = topics
            .map(topic => this.topicCard(topic))
            .join("");

        // Activar eventos de Editar y Eliminar
        this.bindTopicEvents();

        lucide.createIcons();
    },

    /*
    =========================================
    Tarjeta de tema
    =========================================
    */

    topicCard(topic) {

    return `

    <div class="topic-card">

        <div class="topic-header">

            <h3>${topic.nombre}</h3>

        </div>

        <div class="topic-info">

            <span>

                📅 ${Utils.formatDate(topic.fechaCreacion)}

            </span>

            <label>

                ⏱

                <input
                    type="number"
                    min="1"
                    class="topic-time"
                    data-id="${topic.id}"
                    value="${topic.tiempoEstimado}">

                min

            </label>

        </div>

        <div class="topic-status-container">

            <label>Estado</label>

            <select
                class="topic-status-select"
                data-id="${topic.id}">

                <option
                    value="Pendiente"
                    ${topic.estado === "Pendiente" ? "selected" : ""}>

                    Pendiente

                </option>

                <option
                    value="En progreso"
                    ${topic.estado === "En progreso" ? "selected" : ""}>

                    En progreso

                </option>

                <option
                    value="Completado"
                    ${topic.estado === "Completado" ? "selected" : ""}>

                    Completado

                </option>

            </select>

        </div>

        <div class="topic-progress">

            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${topic.progreso}%">

                </div>

            </div>

            <small>

                ${topic.progreso}%

            </small>

        </div>

        <div class="topic-actions">

            <button
                class="btn btn-outline edit-topic"
                data-id="${topic.id}">

                Editar

            </button>

            <button
                class="btn btn-danger delete-topic"
                data-id="${topic.id}">

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

    openModal(topic = null) {

        if (document.getElementById("topic-modal")) return;

        document.body.insertAdjacentHTML(

            "beforeend",

            this.renderModal(topic)

        );

        this.bindModalEvents(topic);

    },

    /*
    =========================================
    Cerrar modal
    =========================================
    */

    closeModal() {

        const modal = document.getElementById("topic-modal");

        if (modal) {

            modal.remove();

        }

    },

   /*
    =========================================
    HTML Modal
    =========================================
    */

    renderModal(topic = null) {

        return `

    <div
        id="topic-modal"
        class="modal-wrapper">

        <div class="modal-overlay topic-cancel"></div>

        <div class="modal">

            <div class="modal-header">

                <h2>

                    ${topic ? "Editar Tema" : "Nuevo Tema"}

                </h2>

            </div>

            <div class="modal-body">

                <div class="input-group">

                    <label>

                        Nombre del tema

                    </label>

                    <input
                        id="topic-name"
                        type="text"
                        placeholder="Ej. HTML"
                        value="${topic?.nombre || ""}">

                </div>

            </div>

            <div class="modal-footer">

                <button
                    class="btn btn-outline topic-cancel">

                    Cancelar

                </button>

                <button
                    class="btn btn-primary"
                    id="save-topic">

                    ${topic ? "Actualizar" : "Guardar"}

                </button>

            </div>

        </div>

    </div>

    `;

    },

    /*
    =========================================
    Eventos Modal
    =========================================
    */

    bindModalEvents(topic = null) {

        document
            .querySelectorAll(".topic-cancel")
            .forEach(button => {

                button.onclick = () => {

                    this.closeModal();

                };

            });

        document
            .getElementById("save-topic")
            .onclick = () => {

                const nombre = document
                    .getElementById("topic-name")
                    .value
                    .trim();

                if (!nombre) {

                    alert("Ingresa un nombre para el tema.");

                    return;

                }

                if (topic) {

                    PlannerStorage.updateTopic(

                        PlannerDetail.currentSubjectId,

                        topic.id,

                        {

                            nombre

                        }

                    );

                } else {

                    PlannerStorage.createTopic(

                        PlannerDetail.currentSubjectId,

                        {

                            nombre

                        }

                    );

                }

                this.closeModal();

                PlannerDetail.render(

                    PlannerDetail.currentSubjectId

                );

            };

    },

    /*
    =========================================
    Editar tema
    =========================================
    */

    editTopic(topicId) {

        const topic = PlannerStorage.getTopic(

            PlannerDetail.currentSubjectId,

            topicId

        );

        if (!topic) return;

        this.openModal(topic);

    },

    /*
    =========================================
    Eventos de los temas
    =========================================
    */

    bindTopicEvents() {

        // Cambiar estado
        document
            .querySelectorAll(".topic-status-select")
            .forEach(select => {

                select.onchange = () => {

                    PlannerStorage.updateTopic(

                        PlannerDetail.currentSubjectId,

                        select.dataset.id,

                        {

                            estado: select.value,

                            progreso: select.value === "Completado"
                                ? 100
                                : 0

                        }

                    );

                    PlannerDetail.render(

                        PlannerDetail.currentSubjectId

                    );

                };

            });
        
        // Cambiar tiempo estimado
        document
            .querySelectorAll(".topic-time")
            .forEach(input => {

                input.onchange = () => {

                    PlannerStorage.updateTopic(

                        PlannerDetail.currentSubjectId,

                        input.dataset.id,

                        {

                            tiempoEstimado: Number(input.value)

                        }

                    );

                    Utils.showToast(

                        "Tiempo actualizado."

                    );

                };

            });


        // Editar
        document
            .querySelectorAll(".edit-topic")
            .forEach(button => {

                button.onclick = () => {

                    this.editTopic(button.dataset.id);

                };

            });

        // Eliminar
        document
            .querySelectorAll(".delete-topic")
            .forEach(button => {

                button.onclick = () => {

                    this.deleteTopic(button.dataset.id);

                };

            });

    },

    /*
    =========================================
    Eliminar tema
    =========================================
    */

    deleteTopic(topicId) {

        const topic = PlannerStorage.getTopic(

            PlannerDetail.currentSubjectId,

            topicId

        );

        if (!topic) return;

        Utils.confirmModal(

            `¿Deseas eliminar el tema <b>${topic.nombre}</b>?`,

            () => {

                PlannerStorage.deleteTopic(

                    PlannerDetail.currentSubjectId,

                    topicId

                );

                Utils.showToast(

                    "Tema eliminado correctamente."

                );

                PlannerDetail.render(

                    PlannerDetail.currentSubjectId

                );

            }

        );

    }

};