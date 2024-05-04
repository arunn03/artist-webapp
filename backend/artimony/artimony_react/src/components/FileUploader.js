import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function FileUploader({ files, setFiles }) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setFiles((prevFiles) => [
          ...prevFiles,
          {
            file: file,
            preview: base64String,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleDelete = (fileToRemove) => (event) => {
    event.stopPropagation();
    setFiles((currentFiles) =>
      currentFiles.filter((file) => file !== fileToRemove)
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      <div style={messageStyle(files.length)}>
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div style={thumbsContainer}>
        {files.map((file, index) => (
          <div key={index} style={thumb}>
            <div style={thumbInner}>
              <img
                src={file.preview}
                style={img}
                alt={`Preview ${file.file.name}`}
              />
              <button style={deleteButton} onClick={handleDelete(file)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const dropzoneStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 5,
  borderColor: "#fcb603",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "100%",
  minHeight: "100px",
  position: "relative",
  height: "90%",
  overflow: "scroll",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

dropzoneStyle["::-webkit-scrollbar"] = {
  display: "none",
};

const messageStyle = (fileCount) => ({
  textAlign: "center",
  width: "100%",
  margin: "20px",
});

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
  position: "relative",
  justifyContent: "center",
};

const thumb = {
  display: "inline-flex",
  flexDirection: "column",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginRight: 8,
  width: 120,
  height: 120,
  boxSizing: "border-box",
  position: "relative",
};

const thumbInner = {
  position: "relative",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const deleteButton = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "20px",
  height: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  border: "none",
  borderRadius: "50%",
  fontSize: "16px",
  fontWeight: "bold",
  lineHeight: "20px",
  textAlign: "center",
  cursor: "pointer",
  padding: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default FileUploader;
