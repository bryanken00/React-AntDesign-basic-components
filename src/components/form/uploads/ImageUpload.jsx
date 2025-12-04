import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";

const { Dragger } = Upload;

const COLORS = {
  primary: "#001861",
  primaryLight: "#002B8C",
  primaryLighter: "#E8EBF5",
  accent: "#FF6B35",
  success: "#00C48C",
  warning: "#FFA94D",
  info: "#4E8CFF",
  background: "#F8F9FC",
  cardBg: "#FFFFFF",
  textPrimary: "#1A202C",
  textSecondary: "#718096",
};

const ImageUpload = ({ value = [], onChange, maxSize = null }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Preview selected image
  const handlePreview = () => {
    if (value && value.length > 0) {
      setPreviewImage(value[0].url || value[0].thumbUrl);
      setPreviewVisible(true);
    }
  };

  const onUpload = async ({ file, onSuccess }) => {
    const objectURL = URL.createObjectURL(file);
    const newFile = {
      uid: file.uid || String(Date.now()),
      name: file.name,
      status: "done",
      url: objectURL,
      thumbUrl: objectURL,
      originFileObj: file,
      size: file.size,
      type: file.type,
    };
    onChange?.([newFile]);
    onSuccess?.("ok");
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      Modal.error({
        title: "Invalid File Type",
        content: "You can only upload image files!",
      });
      return Upload.LIST_IGNORE;
    }

    if (maxSize !== null) {
      const isWithinLimit = file.size / 1024 / 1024 < maxSize;
      if (!isWithinLimit) {
        Modal.error({
          title: "File Too Large",
          content: `Image must be smaller than ${maxSize}MB!`,
        });
        return Upload.LIST_IGNORE;
      }
    }

    return true;
  };

  const handleRemove = () => {
    onChange?.([]);
    message.success("Image removed successfully");
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const hasImage = value && value.length > 0;

  return (
    <div>
      {!hasImage ? (
        <ImgCrop rotationSlider aspect={1}>
          <Dragger
            name="image"
            accept="image/*"
            beforeUpload={beforeUpload}
            customRequest={onUpload}
            showUploadList={false}
            style={{
              border: `2px dashed ${COLORS.primaryLighter}`,
              borderRadius: 16,
              background: COLORS.background,
            }}
            className="custom-dragger"
          >
            <div style={{ padding: "48px 24px" }}>
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    margin: "0 auto",
                    background: `linear-gradient(135deg, ${COLORS.warning}, #FFB86B)`,
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(255, 169, 77, 0.25)",
                  }}
                >
                  <UploadOutlined style={{ fontSize: 40, color: "#fff" }} />
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: COLORS.textPrimary,
                    marginBottom: 12,
                  }}
                >
                  Click or drag image to upload
                </p>
                <p
                  style={{
                    fontSize: 16,
                    color: COLORS.textSecondary,
                    marginBottom: 16,
                  }}
                >
                  Support for JPG, JPEG, PNG files only
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: COLORS.textSecondary,
                  }}
                >
                  Maximum file size: 5MB
                </p>
              </div>
            </div>
          </Dragger>
        </ImgCrop>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                background: "linear-gradient(135deg, #F8F9FC 0%, #E8EBF5 100%)",
                borderRadius: 16,
                padding: 32,
                minHeight: 300,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 512,
                }}
              >
                <div
                  style={{
                    background: COLORS.cardBg,
                    padding: 16,
                    borderRadius: 16,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    border: `2px solid ${COLORS.primaryLighter}`,
                    transition: "all 0.3s ease",
                  }}
                  className="image-preview-card"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={handlePreview}
                  >
                    <img
                      src={value[0].url || value[0].thumbUrl}
                      alt="Product preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: 320,
                        borderRadius: 12,
                        objectFit: "contain",
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              background: COLORS.primaryLighter,
              borderRadius: 16,
              padding: 24,
              border: `1px solid ${COLORS.primaryLighter}`,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 24,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    color: COLORS.textSecondary,
                    fontWeight: 600,
                    marginBottom: 8,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  File Name
                </div>
                <div
                  style={{
                    color: COLORS.textPrimary,
                    fontWeight: 500,
                    fontSize: 16,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={value[0].name}
                >
                  {value[0].name}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    color: COLORS.textSecondary,
                    fontWeight: 600,
                    marginBottom: 8,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  File Size
                </div>
                <div
                  style={{
                    color: COLORS.textPrimary,
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  {formatFileSize(value[0].size || 0)}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    color: COLORS.textSecondary,
                    fontWeight: 600,
                    marginBottom: 8,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  File Type
                </div>
                <div
                  style={{
                    color: COLORS.textPrimary,
                    fontWeight: 500,
                    fontSize: 16,
                    textTransform: "uppercase",
                  }}
                >
                  {value[0]?.type?.split?.("/")?.[1] || "Unknown"}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleRemove}
              size="large"
              style={{
                minWidth: 160,
                height: 48,
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 15,
                boxShadow: "0 2px 8px rgba(255, 107, 53, 0.2)",
              }}
            >
              Remove Image
            </Button>
          </div>
        </div>
      )}

      <style>{`
        .custom-dragger:hover {
          border-color: ${COLORS.primary} !important;
          background: ${COLORS.primaryLighter} !important;
        }
        .image-preview-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
          transform: translateY(-2px);
        }
      `}</style>

      <Modal
        open={previewVisible}
        title={
          <span
            style={{ fontSize: 18, fontWeight: 700, color: COLORS.primary }}
          >
            Image Preview
          </span>
        }
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width={800}
        centered
        styles={{
          content: {
            borderRadius: 16,
            overflow: "hidden",
          },
        }}
      >
        <img
          alt="preview"
          style={{
            width: "100%",
            maxHeight: "70vh",
            objectFit: "contain",
            borderRadius: 12,
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default ImageUpload;
