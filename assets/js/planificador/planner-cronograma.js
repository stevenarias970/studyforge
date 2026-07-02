/*
=========================================
StudyForge
planner-cronograma.js

Cronograma automático
=========================================
*/

const PlannerSchedule = {

    /*
    =========================================
    Generar cronograma
    =========================================
    */

    render(subjectId) {

        const container = document.getElementById("schedule-container");

        if (!container) return;

        const subject = PlannerStorage.getSubjectById(subjectId);

        if (!subject) return;

        if (subject.temas.length === 0) {

            container.innerHTML = `

                <div class="empty-state">

                    <h3>No hay cronograma disponible.</h3>

                    <p>Agrega temas para comenzar.</p>

                </div>

            `;

            return;

        }

        let html = "";

        subject.temas.forEach(topic => {

            html += `

                <div class="schedule-card">

                    <h4>${topic.nombre}</h4>

                    <p>

                        ⏱ ${topic.tiempoEstimado} minutos

                    </p>

                    <p>

                        Estado: ${topic.estado}

                    </p>

                </div>

            `;

        });

        container.innerHTML = html;

    }

};