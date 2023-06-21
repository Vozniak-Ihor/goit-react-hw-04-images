import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ image, alt, largeImage, handleModalClick }) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => handleModalClick(largeImage)}
    >
      <img
        loading="lazy"
        className={css.ImageGalleryItemImage}
        src={image}
        alt={alt}
        width="360px"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  handleModalClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem