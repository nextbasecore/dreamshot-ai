export function getVideoResolution(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    // create a video element
    const video = document.createElement('video')

    // set the source of the video
    video.src = URL.createObjectURL(file)

    // wait for the metadata to be loaded
    video.onloadedmetadata = function () {
      // resolve the promise with the resolution of the video
      resolve({ width: video.videoWidth, height: video.videoHeight })
    }

    // handle error
    video.onerror = function () {
      // reject the promise with the error
      reject(new Error('Failed to load video metadata.'))
    }
  })
}
