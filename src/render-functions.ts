import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import type { PixabayImage } from "./types/pixabay";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";

type RenderElements = {
  gallery: Element;
  loader: Element;
  loadMoreButton: Element;
};

type RenderAPI = {
  createGallery: (images: PixabayImage[]) => void;
  clearGallery: () => void;
  showLoader: () => void;
  hideLoader: () => void;
  showLoadMoreButton: () => void;
  hideLoadMoreButton: () => void;
  showToast: (text: string) => void;
};

export function initRender(elements: RenderElements): RenderAPI {
  const { gallery, loader, loadMoreButton } = elements;

  // initial UI state
  (loader as HTMLElement).style.display = "none";
  (loadMoreButton as HTMLElement).style.display = "none";

  const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
  });

  const createGallery = (images: PixabayImage[]): void => {
    const galleryItems = images
        .map(
            (image) => `
          <a href="${image.largeImageURL}">
            <img
              src="${image.webformatURL}"
              alt="${image.tags}"
              title="${image.tags}"
              width="100"
              height="100"
              loading="lazy"
            />
          </a>`
        )
        .join("");

    (gallery as HTMLElement).insertAdjacentHTML("beforeend", galleryItems);
    lightbox.refresh();
  };

  const clearGallery = (): void => {
    (gallery as HTMLElement).innerHTML = "";
  };

  const showLoader = (): void => {
    (loader as HTMLElement).style.display = "block";
  };

  const hideLoader = (): void => {
    (loader as HTMLElement).style.display = "none";
  };

  const showLoadMoreButton = (): void => {
    (loadMoreButton as HTMLElement).style.display = "block";
  };

  const hideLoadMoreButton = (): void => {
    (loadMoreButton as HTMLElement).style.display = "none";
  };

  const showToast = (text: string): void => {
    iziToast.info({ message: text, position: "topRight" });
  };

  return {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    showToast,
  };
}
