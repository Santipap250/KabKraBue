// Photo gallery data. To add a new photo: drop the file into
// /public/images/gallery/ and add one entry below. Nothing else needs
// to change — the ImageGallery component reads entirely from this file.

export interface GalleryImage {
  id: string;
  src: string; // path relative to /public
  alt: string;
  caption?: string;
  category: "landscape" | "people" | "culture" | "nature" | "village";
  width: number; // intrinsic width, for aspect-ratio-correct placeholders
  height: number;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "gallery-01",
    src: "/images/gallery/gallery-01.jpg",
    alt: "Rice terraces at sunrise near KabKraBue",
    caption: "[TODO: คำบรรยายภาพ]",
    category: "landscape",
    width: 1600,
    height: 1067,
  },
  {
    id: "gallery-02",
    src: "/images/gallery/gallery-02.jpg",
    alt: "Village elder walking along a paddy path",
    caption: "[TODO: คำบรรยายภาพ]",
    category: "people",
    width: 1200,
    height: 1500,
  },
  {
    id: "gallery-03",
    src: "/images/gallery/gallery-03.jpg",
    alt: "Traditional wooden house in KabKraBue",
    caption: "[TODO: คำบรรยายภาพ]",
    category: "village",
    width: 1600,
    height: 1067,
  },
  {
    id: "gallery-04",
    src: "/images/gallery/gallery-04.jpg",
    alt: "River mist over the fields at dawn",
    caption: "[TODO: คำบรรยายภาพ]",
    category: "nature",
    width: 1600,
    height: 2000,
  },
  {
    id: "gallery-05",
    src: "/images/gallery/gallery-05.jpg",
    alt: "Local festival procession",
    caption: "[TODO: คำบรรยายภาพ]",
    category: "culture",
    width: 1600,
    height: 1067,
  },
  {
    id: "gallery-06",
    src: "/images/gallery/gallery-06.jpg",
    alt: "Children playing near the water buffalo",
    caption: "[TODO: คำบรรยายภาพ]",
    category: "people",
    width: 1200,
    height: 1500,
  },
  {
    id: "gallery-07",
    src: "/images/gallery/gallery-07.jpg",
    alt: "Sunset silhouette over the rice fields",
    caption: "[TODO: คำบรรยายภาพ]",
    category: "landscape",
    width: 1600,
    height: 900,
  },
  {
    id: "gallery-08",
    src: "/images/gallery/gallery-08.jpg",
    alt: "Weaving craft detail",
    caption: "[TODO: คำบรรยายภาพ]",
    category: "culture",
    width: 1200,
    height: 1500,
  },
];
