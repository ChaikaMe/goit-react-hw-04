import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallry.module.css';

export default function ImageGallery({ images, onModal }) {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <li key={image.id} onClick={() => onModal(image.id)}>
          <ImageCard src={image.urls.small} alt={image.alt_description} />
        </li>
      ))}
    </ul>
  );
}
