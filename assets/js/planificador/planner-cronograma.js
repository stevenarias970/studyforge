/*
=========================================
StudyForge
planner-cronograma.js
=========================================
*/

const PlannerSchedule = {

    /*
    =========================================
    Generar cronograma automático
    =========================================
    */

    generate(subject) {

        const schedule = [];

        const today = new Date();

        const deadline = new Date(subject.fechaLimite);

        let currentDate = new Date(today);

        subject.temas
        .filter(topic => topic.estado !== "Completado")
        .forEach(topic => {

            let remainingMinutes = topic.tiempoEstimado;

            while (remainingMinutes > 0) {

                const studyMinutes = Math.min(

                    remainingMinutes,

                    subject.minutosPorDia

                );

                schedule.push({

                    fecha: currentDate.toISOString().split("T")[0],

                    tema: topic.nombre,

                    minutos: studyMinutes,

                    estado: topic.estado

                });

                remainingMinutes -= studyMinutes;

                currentDate.setDate(

                    currentDate.getDate() + 1

                );

                if (currentDate > deadline) {

                    return [

                        {

                            error: true,

                            mensaje: "No hay suficientes días para completar este plan."

                        }

                    ];

                }

            }

        });

        return schedule;

    },

    /*
    =========================================
    Mostrar cronograma
    =========================================
    */

    render(subjectId) {

        const container = document.getElementById(

            "schedule-container"

        );

        if (!container) return;

        const subject = PlannerStorage.getSubjectById(

            subjectId

        );

        if (!subject) return;

        if (subject.temas.length === 0) {

            container.innerHTML = `

                <div class="empty-state">

                    <h3>

                        No hay cronograma.

                    </h3>

                </div>

            `;

            return;

        }

        const schedule = this.generate(subject);

                if (schedule[0]?.error) {

                 container.innerHTML = `

                <div class="empty-state">

                    <h3>

                        ⚠️ Tiempo insuficiente

                    </h3>

                    <p>

                        ${schedule[0].mensaje}

                    </p>

                </div>

            `;

            return;

        }

        container.innerHTML = schedule.map(day => `

            <div class="schedule-card">

                <h4>

                    ${Utils.formatDate(day.fecha)}

                </h4>

                <p>

                    📚 ${day.tema}

                </p>

                <p>

                    ⏱ ${day.minutos} minutos

                </p>

            </div>

        `).join("");

    }

};