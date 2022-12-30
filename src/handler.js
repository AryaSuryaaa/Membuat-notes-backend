const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt
  };

  // Up notes to array
  notes.push(newNote);

  // Filter Note
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if(isSuccess) { 
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  } else {
    const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
};

// Menampilkan semua note
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  }
});
// >> Jika tanpa menggunakan tanda kurung // tanda kurung digunakan untuk menghilangkan/pengganti return
// const getAllNotesHandler = () => {
//   return {
//     status: 'success',
//     data: {
//       notes,
//     }
//   }
// };

// Menampilkan note sesuai ID
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];
  // Penjelasan [0] https://www.dicoding.com/academies/261/discussions/181425

  if( note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
  }
}

const editNoteByHandler = (request, h) => {
  const id = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
  
  // menyesuaikan id note yang ingin diubah
  const index = notes.findIndex((note) => note.id === id);

  // bila index bukan bernilai -1, note ditemukan
  if(index !==  -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    }

    const response = h.response ({
      status: 'success',
      message: 'catatan berhasil diperbarui'
    });
    response.code(200);
    return response;
  } else {
    const response = h.response ({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan'
    });
    response.code(404);
    return response;
  }



}

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByHandler};