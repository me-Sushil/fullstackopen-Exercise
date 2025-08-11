import NoteServices from "../services/NoteServices";

const Delete = ({ id, setPersons }) => {
  const handleDelete = () => {
    NoteServices.deleteNote(id)
      .then(setPersons((prev) => prev.filter((p) => p.id !== id)))
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };
  return (
    <>
      <button onClick={handleDelete}>delete</button>
    </>
  );
};

export default Delete;
