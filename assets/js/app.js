/*
=========================================
StudyForge
app.js
Control principal de la aplicación
=========================================
*/

const App = {

    currentModule: "dashboard",

    modules: {

        dashboard: {
            title: "Dashboard",
            description: "Bienvenido a StudyForge",
            action: "Nueva materia"
        },

        planner: {
            title: "Planificador",
            description: "Organiza tus materias y temas de estudio",
            action: "Nueva materia"
        },

        flashcards: {
            title: "Flashcards",
            description: "Aprende usando repetición espaciada",
            action: "Nueva flashcard"
        },

        pomodoro: {
            title: "Pomodoro",
            description: "Gestiona tus sesiones de estudio",
            action: "Iniciar sesión"
        },

        notes: {
            title: "Apuntes",
            description: "Escribe y organiza tus notas",
            action: "Nuevo apunte"
        },

        settings: {
            title: "Configuración",
            description: "Preferencias de la aplicación",
            action: "Guardar cambios"
        }

    },

    init() {

        this.cacheDOM();

        this.bindEvents();

        this.loadModule(this.currentModule);

    },

    cacheDOM() {

        this.menuItems = document.querySelectorAll(".menu-item");

        this.pageTitle = document.getElementById("page-title");

        this.pageDescription = document.getElementById("page-description");

        this.primaryButton = document.getElementById("primary-action");

        this.container = document.getElementById("module-container");

    },

    bindEvents() {

        this.menuItems.forEach(button => {

            button.addEventListener("click", () => {

                const module = button.dataset.module;

                this.loadModule(module);

            });

        });

    },

    loadModule(module) {

        this.currentModule = module;

        this.updateSidebar();

        this.updateHeader();

        this.renderModule();

    },

    updateSidebar() {

        this.menuItems.forEach(button => {

            button.classList.remove("active");

            if (button.dataset.module === this.currentModule) {

                button.classList.add("active");

            }

        });

    },

    updateHeader() {

        const info = this.modules[this.currentModule];

        this.pageTitle.textContent = info.title;

        this.pageDescription.textContent = info.description;

        this.primaryButton.innerHTML = `
            <i data-lucide="plus"></i>
            ${info.action}
        `;

        lucide.createIcons();

    },

    renderModule() {

        switch (this.currentModule) {

            case "dashboard":

                this.renderDashboard();

                break;

            case "planner":

                this.renderPlanner();

                break;

            case "flashcards":

                this.renderPlaceholder(
                    "Flashcards",
                    "Este módulo será desarrollado en los próximos días."
                );

                break;

            case "pomodoro":

                this.renderPlaceholder(
                    "Pomodoro",
                    "Este módulo será desarrollado en los próximos días."
                );

                break;

            case "notes":

                this.renderPlaceholder(
                    "Apuntes",
                    "Este módulo será desarrollado en los próximos días."
                );

                break;

            case "settings":

                this.renderPlaceholder(
                    "Configuración",
                    "Próximamente podrás personalizar la aplicación."
                );

                break;

        }

    },

    renderDashboard() {

        this.container.innerHTML = `

            <section class="welcome">

                <div class="welcome-card">

                    <h2>
                        Bienvenido a StudyForge
                    </h2>

                    <p>

                        Organiza todas tus materias, utiliza la técnica
                        Pomodoro, crea Flashcards y lleva el control
                        completo de tu progreso académico.

                    </p>

                    <button class="btn btn-primary">

                        Comenzar

                    </button>

                </div>

            </section>

        `;

    },

    renderPlanner() {

        this.container.innerHTML = `

            <section class="planner">

                <div class="planner-header">

                    <div>

                        <h2>Planificador de Estudio</h2>

                        <p>

                            Crea tus materias y organiza todos tus temas.

                        </p>

                    </div>

                </div>

                <div class="empty-state">

                    <i data-lucide="book-open"></i>

                    <h3>

                        Aún no tienes materias.

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

    renderPlaceholder(title, description) {

        this.container.innerHTML = `

            <section class="welcome">

                <div class="welcome-card">

                    <h2>

                        ${title}

                    </h2>

                    <p>

                        ${description}

                    </p>

                </div>

            </section>

        `;

    }

};

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});