export const preloadImages = (urls) => {
  return Promise.all(
    urls.map((url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = resolve;
      });
    }),
  );
};

export const preloadSounds = (urls) => {
  return Promise.all(
    urls.map((url) => {
      return new Promise((resolve) => {
        const audio = new Audio();
        audio.src = url;
        audio.oncanplaythrough = resolve;
        audio.onerror = resolve;

        setTimeout(resolve, 2000);
      });
    }),
  );
};

export const preloadAssets = async (imageUrls = [], soundUrls = []) => {
  await Promise.all([preloadImages(imageUrls), preloadSounds(soundUrls)]);
};
