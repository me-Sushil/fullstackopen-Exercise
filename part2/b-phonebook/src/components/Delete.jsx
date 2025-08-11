import NoteServices from "../services/NoteServices";

const Delete = ({ id, name, setPersons }) => {
  const handleDelete = () => {
   const confirm = window.confirm(`Delete ${name} ?`);
   if(confirm){
    NoteServices.deleteNote(id)
      .then(setPersons((prev) => prev.filter((p) => p.id !== id)))
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
      console.log("Delete success");
    }else{
       console.log("Delete cancelled");
    }
  };
  return (
    <>
      <button onClick={handleDelete}>delete</button>
    </>
  );
};

export default Delete;
