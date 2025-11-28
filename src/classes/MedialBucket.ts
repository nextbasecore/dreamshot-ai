import { CDN_ENDPOINT } from "@/constants/runtime.constants";
import { default as axios, default as axiosMain } from "axios";
import axiosRetry from "axios-retry";

export class MediaBucket {
  client = axiosMain.create();

  type: string | undefined = undefined;
  constructor() {
    axiosRetry(this.client, { retries: 3 });
  }

  public async uploadFile(file: File, fileName: string) {
    const uploadUrl = await this.getUploadUrl(fileName);

    await this.client.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    return this.getDownloadUrl(fileName);
  }

  private async getDownloadUrl(fileName: string) {
    const encodedName = encodeURIComponent(fileName);
    return CDN_ENDPOINT + "/" + encodedName;
  }

  public async uploadFromUri(imageUri: string, fileName: string) {
    const blob = await fetch(imageUri).then((res) => res.blob());
    const uploadUrl = await this.getUploadUrl(fileName);

    await axios.put(uploadUrl, blob, {
      headers: {
        "Content-Type": blob.type,
      },
    });

    return this.getDownloadUrl(fileName);
  }

  private async getUploadUrl(fileName: string) {
    const res = await axios.get("https://core.faceswapper.ai" + "/media/get-upload-url", {
      params: {
        fileName,
        projectId: "faceswapper",
      },
    });

    return res.data as string;
  }
}