import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function ErrorPopup({ error, setError }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "left"
      }}
      open={Boolean(error)}
      // autoHideDuration={6000}
      onClose={() => setError("")}
    >
      <SnackbarContent
        style={{ backgroundColor: "red" }}
        aria-describedby="error-message"
        message={<span id="error-message">Error: {error}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setError("")}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
}
