import NoteServices from "../services/NoteServices";

const Delete = ({ id, name, setPersons, setMessage }) => {
  const handleDelete = () => {
    const confirm = window.confirm(`Delete ${name} ?`);
    if (confirm) {
      NoteServices.deleteNote(id)
        .then(setPersons((prev) => prev.filter((p) => p.id !== id)))
        .catch((error) => {
          setMessage(error);

          setTimeout(() => {
            setMessage("message here");
          }, 1500);

          console.error("Error deleting note:", error);
        });
      console.log("Delete success");
      setMessage("Delete success");

      setTimeout(() => {
        setMessage("message here");
      }, 1500);
      
    } else {
      console.log("Delete cancelled");
      setMessage("Delete cancelled");

      setTimeout(() => {
        setMessage("message here");
      }, 1500);
    }
  };
  return (
    <>
      <button onClick={handleDelete}>delete</button>
    </>
  );
};

export default Delete;
