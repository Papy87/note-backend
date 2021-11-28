const NotesService = require('../services/NoteService');
const Utils = require('../utils/Util');
const jwtDecode = require("jwt-decode");
const tokenDecoder = require('../middleware/token_decoder');
const emailSender = require('../middleware/email_sender');
const util = new Utils();

class NoteController {
    static async getAllNotesForUser(req, res) {
        let {userId} = await tokenDecoder(req);
        if (!userId) {
            util.setSuccess(400, 'Something wrong with token.');
            return util.send(res);
        }
        try {
            let notes = await NotesService.getAllNotes(userId);
            if (notes.rowCount) {
                util.setSuccess(200, 'All notes retrieved', notes.rows);
            } else {
                util.setSuccess(404, 'No notes found');
            }
            return util.send(res)

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }

    }

    static async getOneNoteForUser(req, res) {
        let noteId = req.params.id;
        let {userId} = await tokenDecoder(req);
        if (!userId) {
            util.setSuccess(400, 'Something wrong with token.');
            return util.send(res);

        }
        try {
            let note = await NotesService.getOneNote(noteId, userId);
            if (note.rowCount) {
                util.setSuccess(200, 'Note retrieved', note.rows[0]);
            } else {
                util.setSuccess(404, 'No note found');
            }
            return util.send(res)

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }

    }

    static async createNoteForUser(req, res) {
        let {noteTitle, noteDescription, notificationTime} = req.body;
        if (!noteTitle || !noteDescription || !notificationTime) {
            util.setSuccess(400, 'Please enter the necessary information.');
            return util.send(res);
        }
        let {userId} = await tokenDecoder(req);
        if (!userId) {
            util.setSuccess(400, 'Something wrong with token.');
            return util.send(res);
        }
        try {

            let note = await NotesService.createNote(noteTitle, noteDescription, notificationTime, userId);
            if (note.rowCount) {
                util.setSuccess(200, 'Successfully made note.');
            } else {
                util.setSuccess(400, 'Unsuccessfully made note');
            }
            return util.send(res);

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }

    }

    static async updateNoteForUser(req, res) {
        let {userId} = await tokenDecoder(req);
        let noteId = req.params.id;
        if (!userId) {
            util.setSuccess(400, 'Something wrong with token.');
            return util.send(res);
        }
        let {noteTitle, noteDescription, notificationTime} = req.body;
        if (!noteTitle || !noteDescription || !notificationTime) {
            util.setSuccess(400, 'Please enter the necessary information.');
            return util.send(res);
        }

        try {
            let updateNote = await NotesService.updateNote(noteTitle, noteDescription, notificationTime, noteId, userId);
            if (updateNote.rowCount) {
                util.setSuccess(200, 'Note successfully changed');
            } else {
                util.setSuccess(400, 'Note change failed');
            }
            return util.send(res)

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }

    }

    static async deleteNoteForUser(req, res) {
        let {userId} = await tokenDecoder(req);
        let noteId = req.params.id;

        if (!userId) {
            util.setSuccess(400, 'Something wrong with token.');
            return util.send(res);
        }
        try {
            let noteForDelete = await NotesService.deleteNote(noteId, userId);
            if (noteForDelete.rowCount) {
                util.setSuccess(200, 'Note successfully deleted', noteForDelete.rows[0]);
            } else {
                util.setSuccess(400, 'Note delete failed');
            }
            return util.send(res)

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async sendNotification(time) {
        let note = await NotesService.findNote(time);
        if (note.rowCount) {
            let email = note.rows[0].email;
            let noteTitle = note.rows[0].noteTitle;
            let noteDescription = note.rows[0].noteDescription;
            let message = `
            NOTE REMINDER
            Note title: ${noteTitle}
            Note description: ${noteDescription}`;
            emailSender.sendNoteNotification(message, email)
        }
    }
}

module.exports = NoteController;
