import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type SimpleBackdropProps = {
  loading: boolean;
};

const SimpleBackdrop = ({ loading }: SimpleBackdropProps) => (
  <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default SimpleBackdrop;
