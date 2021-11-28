const express = require('express');
const router = express.Router();
const NoteController = require('../controllers/NoteController');
const guard = require('../middleware/guard');

router.get('/notes', guard(), NoteController.getAllNotesForUser);
router.get('/notes/:id', guard(), NoteController.getOneNoteForUser);
router.post('/notes', guard(), NoteController.createNoteForUser);
router.put('/notes/:id', guard(), NoteController.updateNoteForUser);
router.delete('/notes/:id', guard(), NoteController.deleteNoteForUser);

module.exports = router;
