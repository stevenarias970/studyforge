/*
=========================================
StudyForge
planner-detail.js

Detalle de una materia
=========================================
*/

const PlannerDetail = {

    /*
    =========================================
    Renderizar detalle
    =========================================
    */
   
    

    render(subjectId) {

        this.currentSubjectId = subjectId;

        const subject = PlannerStorage.getSubjectById(subjectId);

        if (!subject) {

            App.renderPlanner();

            return;

        }

        const container = document.getElementById("module-container");

        container.innerHTML = `

            <section class="planner-detail">

                <div class="planner-detail-header">

                    <button
                        class="btn btn-outline"
                        id="back-to-planner">

                        ← Volver

                    </button>

                    <h2>

                        ${subject.nombre}

                    </h2>

                    <p>

                        ${subject.descripcion || "Sin descripción"}

                    </p>

                </div>

                <div class="planner-detail-info">

                    <div class="info-card">

                        <h4>Fecha límite</h4>

                        <p>${Utils.formatDate(subject.fechaLimite)}</p>

                    </div>

                    <div class="info-card">

                        <h4>Tiempo diario</h4>

                        <p>${subject.minutosPorDia} minutos</p>

                    </div>

                    <div class="info-card">

                        <h4>Progreso general</h4>

                        <div class="progress-bar">

                            <div
                                class="progress-fill"
                                style="width:${subject.progreso}%">

                            </div>

                        </div>

                        <p>

                            ${subject.progreso}% completado

                        </p>

                    </div>

                </div>

                <!-- TEMAS -->

                <section class="planner-section">

                    <div class="section-header">

                        <h3>Temas</h3>

                        <button
                            class="btn btn-primary"
                            id="new-topic">

                            + Agregar tema

                        </button>

                    </div>

                    <div id="topics-container">

                        <div class="empty-state">

                            <i data-lucide="book-open"></i>

                            <h3>

                                No hay temas registrados.

                            </h3>

                            <p>

                                Agrega el primer tema para comenzar.

                            </p>

                        </div>

                    </div>

                </section>

                <!-- CRONOGRAMA -->

                <section class="planner-section">

                    <h3>Cronograma</h3>

                    <div id="schedule-container"></div>

                </section>

            </section>

        `;

        this.bindEvents();

        PlannerTopics.render(subjectId);

        PlannerSchedule.render(subjectId);

        lucide.createIcons();

    },

    /*
    =========================================
    Eventos
    =========================================
    */

    bindEvents() {

        document
            .getElementById("back-to-planner")
            .onclick = () => {

                App.renderPlanner();

                Planner.init();

            };

        document
            .getElementById("new-topic")
            .onclick = () => {

                PlannerTopics.openModal();

            };

    }

};