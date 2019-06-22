import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  fontSize: "25px",
  padding: "20px",
  backgroundColor: "#8369c4",
  color: "#fff",
  outline: "dashed",
  outlineColor: "#8369c4",
  transition: "border .24s ease-in-out",
  margin: " 50px auto",
  width: "80%"
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
