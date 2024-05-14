import css from './ImageCard.module.css';

export default function ImageCard({ src, description, imageId, onModal }) {
  return (
    <div className={css.item}>
      <img
        className={css.image}
        src={src}
        alt={description}
        onClick={() => onModal(imageId)}
      />
    </div>
  );
}
