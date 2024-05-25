import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function FileUploader({ files, setFiles }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (file.type.startsWith("image")) {
          // Handle images normally
          const reader = new FileReader();
          reader.onload = () => {
            const base64String = reader.result;
            setFiles((prevFiles) => [
              ...prevFiles,
              {
                file: file,
                preview: base64String,
                progress: 100, // Assuming complete for simplicity
                type: "image",
              },
            ]);
          };
          reader.readAsDataURL(file);
        } else if (file.type.startsWith("video")) {
          // Create a video thumbnail
          const reader = new FileReader();
          reader.onload = () => {
            const video = document.createElement("video");
            video.preload = "metadata";
            video.src = URL.createObjectURL(file);
            video.onloadedmetadata = () => {
              video.currentTime = Math.min(
                Math.max(0, video.duration / 2),
                video.duration - 1
              ); // Seek to middle of video
            };
            video.onseeked = () => {
              const canvas = document.createElement("canvas");
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const thumbnail = canvas.toDataURL("image/png");
              URL.revokeObjectURL(video.src); // Revoke the blob URL
              setFiles((prevFiles) => [
                ...prevFiles,
                {
                  file,
                  preview: thumbnail,
                  progress: 100,
                  type: "video",
                },
              ]);
            };
          };
          reader.readAsDataURL(file);
        }
      });
    },
    [setFiles]
  );

  const handleDelete = (fileToRemove) => (event) => {
    event.stopPropagation();
    setFiles((currentFiles) =>
      currentFiles.filter((file) => file !== fileToRemove)
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*,video/*",
  });

  const ProgressBar = ({ progress }) => (
    <div style={{ width: "100%", backgroundColor: "#ccc" }}>
      <div
        style={{
          height: "10px",
          width: `${progress}%`,
          backgroundColor: "green",
        }}
      ></div>
    </div>
  );

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
            <div style={fileTypeIconContainer}>
              <div style={fileTypeIconStyle}>
                {file.type === "video" ? (
                  <i class="fa-solid fa-video"></i>
                ) : (
                  <i class="fa-solid fa-image"></i>
                )}
              </div>
            </div>
            <div style={thumbInner}>
              <img
                src={file.preview}
                style={img}
                alt={`Preview ${file.file.name}`}
              />
              <ProgressBar progress={file.progress} />
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

const fileTypeIconContainer = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "linear-gradient(45deg, #000000ba, transparent)",
  zIndex: "10",
};

const fileTypeIconStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontSize: "24px",
};

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
  top: 5,
  right: 5,
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
  zIndex: 11,
};

export default FileUploader;
