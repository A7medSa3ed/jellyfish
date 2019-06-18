import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function ErrorPopup({ error, setError }) {
  const renderableError = error instanceof Error ? error.message : error;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "left"
      }}
      open={Boolean(error)}
      // autoHideDuration={6000}
      onClose={() => setError(null)}
    >
      <SnackbarContent
        style={{ backgroundColor: "red" }}
        aria-describedby="error-message"
        message={<span id="error-message">Error: {renderableError}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setError(null)}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
}
