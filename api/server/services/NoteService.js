const moment = require("moment");
const {DB} = require("../src/database/database");


class NoteService {

    static async createNote(title, descriptin, notificatonTime, id) {
        try {
            let createdAt = moment().format('YYYY-MM-DD');
            let query = `INSERT INTO notes (created_at, note_title, note_description, notification_time, user_id) VALUES ( '${createdAt}', '${title}', '${descriptin}', '${notificatonTime}', ${id});`;
            return await DB.query(query);
        } catch
            (error) {
            throw error;
        }
    }

    static async getAllNotes(id) {

        try {
            let query = `SELECT id, note_title AS noteTitle, note_description AS noteDescription, notification_time AS notificationTime FROM notes WHERE user_id=${id};`;
            return await DB.query(query);
        } catch
            (error) {
            throw error;
        }
    }

    static async getOneNote(id, userId) {

        try {
            let query = `SELECT id, note_title AS noteTitle, note_description AS noteDescription, notification_time AS notificationTime FROM notes WHERE user_id=${userId} AND id=${id};`;
            return await DB.query(query);
        } catch
            (error) {
            throw error;
        }
    }

    static async updateNote(title, descriptioin, notificationTime, noteId, userId) {
        try {
            let query = `UPDATE notes SET note_title='${title}', note_description='${descriptioin}', notification_time='${notificationTime}' WHERE id=${noteId} AND user_id=${userId}  RETURNING *;`;
            return await DB.query(query);
        } catch
            (error) {
            throw error;
        }
    }

    static async deleteNote(id, userId) {
        try {
            let query = `DELETE FROM notes WHERE id=${id} AND user_id=${userId};`;
            return await DB.query(query);
        } catch
            (error) {
            throw error;
        }

    }

    static async findNote(time) {
        try {
            let query = `SELECT u.first_name AS firstName, u.last_name AS lastName, u.email, n.note_title AS "noteTitle", n.note_description AS "noteDescription" FROM "notes" n LEFT JOIN "users" u ON u.id = n.user_id WHERE n.notification_time = '${time}';`;
            return await DB.query(query);
        } catch
            (error) {
            throw error;
        }

    }
}

module.exports = NoteService;
