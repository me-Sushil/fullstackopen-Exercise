const Notification = ({ notification, type }) => {
  if (notification === null) return null;

  return (
    <>
      <p
        style={{
          color: type === "error" ? "red" : "forestgreen",
          background: "lightgrey",
          fontSize: 20,
          border: `2px solid ${type === "error" ? "red" : "forestgreen"}`,
          borderStyle: "solid",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
          width: 630,
          height: 15,
        }}
      >
        {notification}
      </p>
    </>
  );
};
export default Notification;
