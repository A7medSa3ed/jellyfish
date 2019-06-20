import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  width: "50%",
  // flex: 1,
  // display: "flex",
  // flexDirection: "column",
  // alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: "15px ",
  borderColor: "#8369C4",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#x",
  outline: "none",
  transition: "border .24s ease-in-out",
  margin: " 50px auto"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

function Dropzone({ text, setFiles }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: "image/*", onDrop: setFiles });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragAccept, isDragActive, isDragReject]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Dropzone;
