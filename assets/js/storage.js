/*
=========================================
StudyForge
storage.js

Manejo centralizado de LocalStorage
=========================================
*/

const Storage = {

    /*
    ==========================
    Obtener información
    ==========================
    */

    get(key) {

        try {

            const data = localStorage.getItem(key);

            if (!data) return null;

            return JSON.parse(data);

        } catch (error) {

            console.error("Error al obtener datos:", error);

            return null;

        }

    },

    /*
    ==========================
    Guardar información
    ==========================
    */

    set(key, value) {

        try {

            localStorage.setItem(

                key,

                JSON.stringify(value)

            );

            return true;

        } catch (error) {

            console.error("Error al guardar datos:", error);

            return false;

        }

    },

    /*
    ==========================
    Eliminar una clave
    ==========================
    */

    remove(key) {

        localStorage.removeItem(key);

    },

    /*
    ==========================
    Verificar existencia
    ==========================
    */

    exists(key) {

        return localStorage.getItem(key) !== null;

    },

    /*
    ==========================
    Limpiar todo
    ==========================
    */

    clear() {

        localStorage.clear();

    },

    /*
    ==========================
    Obtener todas las claves
    ==========================
    */

    keys() {

        return Object.keys(localStorage);

    },

    /*
    ==========================
    Inicializar una colección

    Solo la crea si no existe.
    ==========================
    */

    initCollection(key, defaultValue = []) {

        if (!this.exists(key)) {

            this.set(key, defaultValue);

        }

    },

    /*
    ==========================
    Agregar elemento
    ==========================
    */

    push(key, item) {

        const collection = this.get(key) || [];

        collection.push(item);

        this.set(key, collection);

    },

    /*
    ==========================
    Reemplazar colección
    ==========================
    */

    update(key, collection) {

        this.set(key, collection);

    }

};


/*
=========================================
Colecciones iniciales
=========================================
*/

Storage.initCollection("sf_planificador");

Storage.initCollection("sf_flashcards");

Storage.initCollection("sf_notes");

Storage.initCollection("sf_pomodoro");