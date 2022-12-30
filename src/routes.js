const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByHandler } = require("./handler");

const routes = [
    {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
    // option: {
    //   cors: {
    //     origin: ['*'],
    //   }
    // } Atau taruh di server supaya cakupannya lebih luas
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByHandler,
  }
]

module.exports = routes;