import CircularProgress from "@mui/material/CircularProgress";

const LoadingScreen = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "auto",
      }}>
      <CircularProgress />
    </div>
  );
};

export default LoadingScreen;
