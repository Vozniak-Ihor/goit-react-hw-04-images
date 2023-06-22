import ImageGallery from './ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import api from '../service/image-service';
import css from './App.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [showButton, setShowButton] = useState(false);


  useEffect(() => {
    getPhotos(query, page);
  }, [query, page]);

  const onSubmit = value => {
    setImages([]);
    setQuery(value);
    setPage(1);
    setIsEmpty(false);
    setIsVisible(false);
    setError(null);
    setIsLoading(true);
  };

  const getPhotos = (query, page) => {
    api
      .fetchImages(query, page)
      .then(response => {
        return response.json();
      })
      .then(({ hits, totalHits, page }) => {
        if (hits.length === 0) {
          setIsEmpty(true);
          return;
        }

        if (totalHits > 12) {
          setIsEmpty(false);
          setImages(prevState => (page === 1 ? hits : [...prevState, ...hits]));
          setShowButton(page < Math.ceil(totalHits / 12));
          setIsVisible(true);
          isLoading(false);
        } else {
          setIsEmpty(false);
          setImages(prevState => (page === 1 ? hits : [...prevState, ...hits]));
          setShowButton(page < Math.ceil(totalHits / 12));
          setIsVisible(false);
          isLoading(false);
        }
      })

      .catch(error => {
        setError(error);
      })
      .finally(() => {
        // this.setState({ isLoader: false, loader: false });
        setLoader(false);
      });
  };

  const handleModalClick = largeImage => {
    // this.setState({ largeImage, showModal: true });
    // console.log(this.state.largeImage);
    setLargeImage(largeImage);
    setShowModal(true);
  };

  const onLoadeMore = () => {
    // this.setState(prevState => ({ page: prevState.page + 1, loader: true }));
    setPage(prevState => prevState.page + 1);
    setLoader(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={css.App}>
        <Searchbar onSubmit={onSubmit} />
        {isEmpty && <b textalign="center">Sorry. There are no images ... 😭</b>}
        {error && <b textAlign="center">Sorry.{error} 😭</b>}
        <ImageGallery images={images} handleModalClick={handleModalClick} />
        {isVisible && (
          <Button
            onLoadeMore={onLoadeMore}
            isLoading={isLoading}
            text={isLoading ? 'Loading' : 'Show more'}
          />
        )}
        {loader && <Loader />}
        {showModal && <Modal largeImage={largeImage} onClose={onClose} />}
      </div>
    </>
  );
}
