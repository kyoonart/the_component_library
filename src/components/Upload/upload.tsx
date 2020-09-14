import React, { FC, useRef, ChangeEvent } from "react";
import axios from "axios";
import Button from "../Button/button";
export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent: number;
  raw?: File;
  response?: any;
  error?: any;
}
export interface UploadProps {
  /**必选参数, 上传的地址 */
  action: string;
  /**上传的文件列表,*/
  defaultFileList?: UploadFile[];
  /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**文件上传时的钩子 */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /**文件上传成功时的钩子 */
  onSuccess?: (data: any, file: UploadFile) => void;
  /**文件上传失败时的钩子 */
  onError?: (err: any, file: UploadFile) => void;
  /**文件状态改变时的钩子，上传成功或者失败时都会被调用   */
  onChange?: (file: UploadFile) => void;
  /**文件列表移除文件时的钩子 */
  onRemove?: (file: UploadFile) => void;
  /**设置上传的请求头部 */
  headers?: { [key: string]: any };
  /**上传的文件字段名 */
  name?: string;
  /**上传时附带的额外参数 */
  data?: { [key: string]: any };
  /**支持发送 cookie 凭证信息 */
  withCredentials?: boolean;
  /**可选参数, 接受上传的文件类型 */
  accept?: string;
  /**是否支持多选文件 */
  multiple?: boolean;
  /**是否支持拖拽上传 */
  drag?: boolean;
}
const Upload: FC<UploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError } = props;
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (uploadRef.current) {
      uploadRef.current.value = "";
    }
  };
  const uploadFiles = (files: FileList) => {
    const postFile = Array.from(files);
    postFile.forEach((file) => {
      const formData = new FormData();
      formData.append(file.name, file);
      axios
        .post(action, formData, {
          headers: {
            "Content-Type": "multiple/form-data",
          },
          onUploadProgress: (e) => {
            let percentage = Math.round((e.loaded * 100) / e.total) || 0;
            if (percentage < 100) {
              if (onProgress) {
                onProgress(percentage, file);
              }
            }
          },
        })
        .then((resp) => {
          console.log(resp);
          if (onSuccess) {
            onSuccess(resp.data, file);
          }
        })
        .catch((err) => {
          console.log(err);
          if (onError) {
            onError(err, file);
          }
        });
    });
  };
  return (
    <div className="upload-component">
      <Button btnType="primary" onClick={handleClick}>
        点击上传文件
      </Button>
      <input
        type="file"
        style={{ display: "none" }}
        className="upload-file"
        ref={uploadRef}
        onChange={handleFileChange}
      />
    </div>
  );
};
export default Upload;
