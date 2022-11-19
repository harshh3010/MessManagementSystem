const ErrorPage = (props) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <p style={{ fontWeight: "bold", fontSize: "24px" }}>
        Oops! An Error Occurred.
      </p>
      <p style={{ marginTop: "5px", fontStyle: "italic" }}>
        {props.error || "Unable to display this page!"}
      </p>
    </div>
  );
};

export default ErrorPage;
