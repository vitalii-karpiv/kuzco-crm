import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Card, Typography, Upload, message, Image, Spin, Progress, Button, Tooltip, Popconfirm } from "antd";
import { UploadOutlined, EyeOutlined, StarOutlined, DeleteOutlined } from "@ant-design/icons";
import ImageService from "../../api/services/image-service.js";
import LaptopService from "../../api/services/laptop-service.js";
import LaptopGroupService from "../../api/services/laptop-group-service.js";

const { Dragger } = Upload;

const SUPPORTED_ENTITY_TYPES = {
  laptop: {
    uploadKey: "laptopId",
    listKey: "laptopId",
  },
  laptopGroup: {
    uploadKey: "groupId",
    listKey: "groupId",
  },
};

const getImageUrl = (image) => {
  if (!image) return null;
  return image.s3Url || image.signedUrl || null;
};

export default function ImageManager({
  entityType,
  entityId,
  entity,
  setEntity,
  cardTitle = "Images",
  cardClassName = "",
}) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [settingMainImage, setSettingMainImage] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState(null);
  const uploadInProgress = useRef(false);
  const lastUploadTime = useRef(0);
  const processedFiles = useRef(new Set());

  useEffect(() => {
    if (!entityId || !SUPPORTED_ENTITY_TYPES[entityType]) {
      return;
    }
    loadImages();
    processedFiles.current.clear();
  }, [entityId, entityType]);

  const loadImages = async () => {
    try {
      setLoading(true);
      const listKey = SUPPORTED_ENTITY_TYPES[entityType]?.listKey;
      const payload = listKey ? { [listKey]: entityId } : {};
      const imageList = await ImageService.list(payload);
      setImages(Array.isArray(imageList) ? imageList : []);
    } catch (error) {
      console.error("Failed to load images:", error);
      message.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files) => {
    if (uploadInProgress.current || !SUPPORTED_ENTITY_TYPES[entityType]) {
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

      const uploadKey = SUPPORTED_ENTITY_TYPES[entityType].uploadKey;

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        const formData = new FormData();
        formData.append(uploadKey, entityId);
        formData.append("image", file);

        await ImageService.upload(formData);

        const progress = Math.round(((i + 1) / validFiles.length) * 100);
        setUploadProgress(progress);

        const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
        processedFiles.current.add(fileKey);
      }

      message.success(`${validFiles.length} image${validFiles.length > 1 ? "s" : ""} uploaded successfully`);
      await loadImages();
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

  const handleSetMainImage = async (image) => {
    if (!setEntity) {
      message.warning("Cannot update main image without setter");
      return;
    }

    const selectedImageUrl = getImageUrl(image);
    if (!selectedImageUrl) {
      message.error("Selected image has no URL");
      return;
    }

    try {
      setSettingMainImage(true);
      let updatedEntity = null;

      if (entityType === "laptop") {
        updatedEntity = await LaptopService.update({
          id: entityId,
          imageUrl: selectedImageUrl,
        });
      } else if (entityType === "laptopGroup") {
        updatedEntity = await LaptopGroupService.update({
          id: entityId,
          imageUrl: selectedImageUrl,
        });
      } else {
        message.error("Unsupported entity type");
        return;
      }

      setEntity(updatedEntity);
      message.success("Main image updated successfully");
    } catch (error) {
      console.error("Failed to set main image:", error);
      message.error("Failed to set main image");
    } finally {
      setSettingMainImage(false);
    }
  };

  const handleDeleteImage = async (image) => {
    const imageId = image?.id;
    if (!imageId) return;
    try {
      setDeletingImageId(imageId);
      await ImageService.delete(imageId);

      const shouldClearMainImage = isMainImage(image) && typeof setEntity === "function";
      if (shouldClearMainImage) {
        try {
          let updatedEntity = null;
          if (entityType === "laptop") {
            updatedEntity = await LaptopService.update({
              id: entityId,
              imageUrl: null,
            });
          } else if (entityType === "laptopGroup") {
            updatedEntity = await LaptopGroupService.update({
              id: entityId,
              imageUrl: null,
            });
          }
          if (updatedEntity) {
            setEntity(updatedEntity);
          }
        } catch (clearError) {
          console.error("Failed to clear main image reference:", clearError);
          message.warning("Image removed but main image reference failed to update");
        }
      }

      message.success("Image deleted");
      await loadImages();
    } catch (error) {
      console.error("Failed to delete image:", error);
      message.error("Failed to delete image");
    } finally {
      setDeletingImageId(null);
    }
  };

  const getImageIdentifier = (url) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch (e) {
      const pathPart = url.split("?")[0].split("#")[0];
      return pathPart;
    }
  };

  const isMainImage = (image) => {
    const imageUrl = getImageUrl(image);

    if (entityType === "laptop") {
      if (!entity?.imageUrl || !imageUrl) return false;
      if (entity.imageUrl === imageUrl) return true;

      const mainImagePath = getImageIdentifier(entity.imageUrl);
      const currentImagePath = getImageIdentifier(imageUrl);
      if (mainImagePath && currentImagePath && mainImagePath === currentImagePath) {
        return true;
      }

      const mainBase = entity.imageUrl.split("?")[0].split("#")[0];
      const currentBase = imageUrl.split("?")[0].split("#")[0];
      if (mainBase === currentBase && mainBase) {
        return true;
      }

      if (image.id && entity.imageUrl.includes(image.id)) {
        return true;
      }

      return false;
    }

    if (entityType === "laptopGroup") {
      const currentMain = entity?.imageUrl || entity?.mainImageId;
      if (!currentMain) return false;
      if (imageUrl && currentMain === imageUrl) return true;
      if (image?.id && currentMain === image?.id) return true; // legacy compat
      return false;
    }

    return false;
  };

  const uploadProps = {
    name: "image",
    multiple: true,
    showUploadList: false,
    beforeUpload: () => false,
    onChange: (info) => {
      const { fileList } = info;
      const allFiles = fileList.filter((file) => file.originFileObj).map((file) => file.originFileObj);
      const newFiles = allFiles.filter((file) => {
        const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
        return !processedFiles.current.has(fileKey);
      });

      const now = Date.now();
      if (newFiles.length > 0 && !uploadInProgress.current && now - lastUploadTime.current > 1000) {
        lastUploadTime.current = now;
        handleFileUpload(newFiles);
      }
    },
  };

  const cardClasses = cardClassName || "w-full";

  return (
    <Card bordered={false} hoverable={true} className={cardClasses}>
      <div className={"flex justify-between items-center mb-4"}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {cardTitle}
        </Typography.Title>
        <div className="text-sm text-gray-500">
          {images.length} image{images.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="mb-4">
        <Dragger {...uploadProps} className="h-12" disabled={uploading || !entityId}>
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
            {images.map((image) => {
              const imageUrl = getImageUrl(image);
              return (
                <div key={image.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={imageUrl || undefined}
                      alt="Uploaded image"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      preview={{
                        mask: <EyeOutlined className="text-white text-lg" />,
                      }}
                    />
                  </div>
                  <div className="absolute top-1 right-1 flex flex-col gap-1 items-end">
                    {isMainImage(image) ? (
                      <Tooltip title="Main image">
                        <Button
                          type="primary"
                          size="small"
                          icon={<StarOutlined />}
                          className="bg-yellow-400 border-yellow-400 text-white shadow-md"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Set as main image">
                        <Button
                          type="primary"
                          size="small"
                          icon={<StarOutlined />}
                          className="opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-yellow-400 border-white hover:border-yellow-400 text-gray-600 hover:text-white shadow-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetMainImage(image);
                          }}
                          disabled={settingMainImage}
                          loading={settingMainImage}
                        />
                      </Tooltip>
                    )}
                  </div>
                  <div className="absolute bottom-1 right-1 flex items-end">
                    <Popconfirm
                      title="Delete this image?"
                      okText="Delete"
                      cancelText="Cancel"
                      placement="left"
                      okButtonProps={{ danger: true, loading: deletingImageId === image.id }}
                      onConfirm={async (e) => {
                        e?.stopPropagation?.();
                        await handleDeleteImage(image);
                      }}
                      onCancel={(e) => e?.stopPropagation?.()}
                    >
                      <Button
                        size="small"
                        danger
                        ghost
                        icon={<DeleteOutlined />}
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-red-500 border-white hover:border-red-500 text-red-500 hover:text-white shadow-md"
                        onClick={(e) => e.stopPropagation()}
                        disabled={deletingImageId === image.id}
                      />
                    </Popconfirm>
                  </div>
                </div>
              );
            })}
          </Image.PreviewGroup>
        </div>
      )}
    </Card>
  );
}

ImageManager.propTypes = {
  entityType: PropTypes.oneOf(["laptop", "laptopGroup"]).isRequired,
  entityId: PropTypes.string.isRequired,
  entity: PropTypes.object,
  setEntity: PropTypes.func,
  cardTitle: PropTypes.string,
  cardClassName: PropTypes.string,
};

