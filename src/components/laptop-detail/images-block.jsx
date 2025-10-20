import { Card, Typography, Upload, message, Image, Spin, Progress } from "antd";
import { UploadOutlined, EyeOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import ImageService from "../../api/services/image-service.js";

const { Dragger } = Upload;

export default function ImagesBlock({ laptopId }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const uploadInProgress = useRef(false);
  const lastUploadTime = useRef(0);
  const processedFiles = useRef(new Set());

  useEffect(() => {
    loadImages();
    // Clear processed files when laptop changes
    processedFiles.current.clear();
  }, [laptopId]);

  const loadImages = async () => {
    try {
      setLoading(true);
      const imageList = await ImageService.list({ laptopId });
      setImages(imageList);
    } catch (error) {
      console.error("Failed to load images:", error);
      message.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files) => {
    // Prevent multiple simultaneous uploads
    if (uploadInProgress.current) {
      console.log("Upload already in progress, ignoring duplicate request");
      return;
    }

    try {
      uploadInProgress.current = true;
      setUploading(true);
      setUploadProgress(0);
      setUploadingFiles(files.map((f) => f.name));

      const validFiles = files.filter((file) => {
        const isImage = file.type.startsWith("image/");
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isImage) {
          message.error(`${file.name} is not an image file!`);
          return false;
        }
        if (!isLt5M) {
          message.error(`${file.name} is larger than 5MB!`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) {
        setUploading(false);
        setUploadingFiles([]);
        return;
      }

      // Upload files one by one to avoid overwhelming the server
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        const formData = new FormData();
        formData.append("laptopId", laptopId);
        formData.append("image", file);

        await ImageService.upload(formData);

        // Update progress
        const progress = Math.round(((i + 1) / validFiles.length) * 100);
        setUploadProgress(progress);

        // Mark file as processed
        const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
        processedFiles.current.add(fileKey);
      }

      message.success(`${validFiles.length} image${validFiles.length > 1 ? "s" : ""} uploaded successfully`);
      await loadImages(); // Reload images after upload
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Failed to upload images");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setUploadingFiles([]);
      uploadInProgress.current = false;
    }
  };

  const uploadProps = {
    name: "image",
    multiple: true,
    showUploadList: false,
    beforeUpload: () => {
      // Prevent default upload behavior
      return false;
    },
    onChange: (info) => {
      const { fileList } = info;

      // Get all files that are being added (not already processed)
      const allFiles = fileList.filter((file) => file.originFileObj).map((file) => file.originFileObj);

      // Filter out files that have already been processed
      const newFiles = allFiles.filter((file) => {
        const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
        return !processedFiles.current.has(fileKey);
      });

      // Debounce to prevent multiple rapid calls
      const now = Date.now();
      if (newFiles.length > 0 && !uploadInProgress.current && now - lastUploadTime.current > 1000) {
        lastUploadTime.current = now;
        handleFileUpload(newFiles);
      }
    },
  };

  return (
    <Card bordered={false} hoverable={true} className={"w-2/4 mr-3"}>
      <div className={"flex justify-between items-center mb-4"}>
        <Typography.Title level={4}>Images</Typography.Title>
        <div className="text-sm text-gray-500">
          {images.length} image{images.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Upload Section */}
      <div className="mb-4">
        <Dragger {...uploadProps} className="h-12" disabled={uploading}>
          <p className="ant-upload-drag-icon text-sm">{uploading ? <Spin size="small" /> : <UploadOutlined />}</p>

          <p className="ant-upload-text text-xs">
            {uploading ? `Uploading... ${uploadProgress}%` : "Click or drag images to upload"}
          </p>
          <p className="ant-upload-hint text-xs">
            {uploading
              ? `${uploadingFiles.length} file${uploadingFiles.length > 1 ? "s" : ""} selected`
              : "Multiple files supported • Max 5MB each"}
          </p>
        </Dragger>

        {/* Upload Progress */}
        {uploading && (
          <div className="mt-4">
            <Progress
              percent={uploadProgress}
              size="small"
              status="active"
              showInfo={true}
              format={(percent) => `${percent}%`}
            />
            <div className="text-xs text-gray-500 mt-1">Uploading: {uploadingFiles.join(", ")}</div>
          </div>
        )}
      </div>

      {/* Images Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Spin size="large" />
          <p className="text-sm text-gray-500 mt-2">Loading images...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <UploadOutlined className="text-4xl mb-2" />
          <p>No images uploaded yet</p>
        </div>
      ) : (
        <div className={`grid grid-cols-4 gap-2 ${images.length > 8 ? "max-h-72 overflow-y-auto" : ""}`}>
          <Image.PreviewGroup>
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={image.signedUrl}
                    alt="Laptop image"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    preview={{
                      mask: <EyeOutlined className="text-white text-lg" />,
                    }}
                  />
                </div>
              </div>
            ))}
          </Image.PreviewGroup>
        </div>
      )}
    </Card>
  );
}

ImagesBlock.propTypes = {
  laptopId: PropTypes.string.isRequired,
};
