const Notification = ({ notification }) => {
  if (notification === null) return null;

  return (
    <>
      <p className="message">{notification}</p>
    </>
  );
};
export default Notification;
