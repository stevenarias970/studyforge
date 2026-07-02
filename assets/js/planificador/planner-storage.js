/*
=========================================
StudyForge
planner-storage.js

Manejo de datos del Planificador
=========================================
*/

const PlannerStorage = {

    /*
    =========================================
    Clave de LocalStorage
    =========================================
    */

    STORAGE_KEY: "sf_planificador",

    /*
    =========================================
    Obtener todas las materias
    =========================================
    */

    getSubjects() {

        return Storage.get(this.STORAGE_KEY) || [];

    },

    /*
    =========================================
    Guardar todas las materias
    =========================================
    */

    saveSubjects(subjects) {

        Storage.set(this.STORAGE_KEY, subjects);

    },

    /*
    =========================================
    Crear una nueva materia
    =========================================
    */

    createSubject(data) {

        const subjects = this.getSubjects();

        const subject = {

            id: Utils.uuid(),

            nombre: Utils.cleanText(data.nombre),

            descripcion: Utils.cleanText(data.descripcion),

            fechaLimite: data.fechaLimite,

            minutosPorDia: Number(data.minutosPorDia),

            progreso: 0,

            fechaCreacion: Utils.today(),

            temas: []

        };

        subjects.push(subject);

        this.saveSubjects(subjects);

        return subject;

    },

    /*
    =========================================
    Buscar una materia por ID
    =========================================
    */

    getSubjectById(id) {

        return this.getSubjects().find(subject => subject.id === id);

    },

    /*
    =========================================
    Actualizar una materia
    =========================================
    */

    updateSubject(id, data) {

        const subjects = this.getSubjects();

        const index = subjects.findIndex(subject => subject.id === id);

        if (index === -1) {

            return false;

        }

        subjects[index] = {

            ...subjects[index],

            ...data

        };

        this.saveSubjects(subjects);

        return true;

    },

    /*
    =========================================
    Eliminar una materia
    =========================================
    */

    deleteSubject(id) {

        const subjects = this.getSubjects();

        const filtered = subjects.filter(subject => subject.id !== id);

        this.saveSubjects(filtered);

    },

    /*
    =========================================
    Total de materias
    =========================================
    */

    countSubjects() {

        return this.getSubjects().length;

    },

    /*
    =========================================
    Verifica si existen materias
    =========================================
    */

    hasSubjects() {

        return this.countSubjects() > 0;

    },

    /*
    =========================================
    Eliminar todas las materias
    (Útil para pruebas)
    =========================================
    */

    clearSubjects() {

        this.saveSubjects([]);

    },
    /*
    =========================================
    Obtener temas de una materia
    =========================================
    */

    getTopics(subjectId) {

        const subject = this.getSubjectById(subjectId);

        if (!subject) return [];

        return subject.temas;

    },

    /*
    =========================================
    Agregar tema
    =========================================
    */

    createTopic(subjectId, topic) {

        const subject = this.getSubjectById(subjectId);

        if (!subject) return;

        subject.temas.push({

            id: Utils.uuid(),

            nombre: topic.nombre,

            descripcion: "",

            estado: "Pendiente",

            progreso: 0,

            tiempoEstimado: 60,

            fechaCreacion: Utils.today(),

            fechaActualizacion: Utils.today(),

            tareas: [],

            flashcards: [],

            apuntes: []

        });

        this.updateSubject(subjectId, {

            temas: subject.temas

        });

    },

    /*
    =========================================
    Eliminar tema
    =========================================
    */

    deleteTopic(subjectId, topicId) {

        const subject = this.getSubjectById(subjectId);

        if (!subject) return;

        subject.temas = subject.temas.filter(

            topic => topic.id !== topicId

        );

        this.updateSubject(subjectId, {

            temas: subject.temas

        });

    },
    
    /*
    =========================================
    Obtener un tema
    =========================================
    */

    getTopic(subjectId, topicId) {

        const subject = this.getSubjectById(subjectId);

        if (!subject) return null;

        return subject.temas.find(

            topic => topic.id === topicId

        ) || null;

    },

    /*
    =========================================
    Actualizar tema
    =========================================
    */

    updateTopic(subjectId, topicId, data) {

        const subject = this.getSubjectById(subjectId);

        if (!subject) return;

        const index = subject.temas.findIndex(

            topic => topic.id === topicId

        );

        if (index === -1) return;

        subject.temas[index] = {

            ...subject.temas[index],

            ...data,

            fechaActualizacion: Utils.today()

        };

        this.updateSubject(subjectId, {

            temas: subject.temas

        });

        this.updateSubjectProgress(subjectId);

    },
    /*
    =========================================
    Actualizar progreso de una materia
    =========================================
    */

    updateSubjectProgress(subjectId) {

        const subject = this.getSubjectById(subjectId);

        if (!subject) return;

        const totalTopics = subject.temas.length;

        if (totalTopics === 0) {

            this.updateSubject(subjectId, {

                progreso: 0

            });

            return;

        }

        const completedTopics = subject.temas.filter(

            topic => topic.estado === "Completado"

        ).length;

        const progress = Math.round(

            (completedTopics / totalTopics) * 100

        );

        this.updateSubject(subjectId, {

            progreso: progress

        });

    }

};