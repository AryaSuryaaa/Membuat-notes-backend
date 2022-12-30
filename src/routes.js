const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler } = require("./handler");

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
  }
]

module.exports = routes;