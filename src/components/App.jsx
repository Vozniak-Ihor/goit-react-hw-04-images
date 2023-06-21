import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import api from '../service/image-service';
import css from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isEmpty: false,
    isVisible: false,
    error: null,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }

  onSubmit = value => {
    this.setState({
      images: [],
      query: value,
      page: 1,
      isEmpty: false,
      isVisible: false,
      error: null,
      isLoading: true,
      loader: true,
      showModal: false,
      largeImage: '',
    });
  };

  getPhotos = (query, page) => {
    api
      .fetchImages(query, page)
      .then(response => {
        return response.json();
      })
      .then(({ hits, totalHits, page }) => {
        if (hits.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }

        if (totalHits > 12) {
          this.setState(prevState => ({
            isEmpty: false,
            images: page === 1 ? hits : [...prevState.images, ...hits],
            showButton: page < Math.ceil(totalHits / 12),
            isVisible: true,
            isLoading: false,
          }));
        } else {
          this.setState(prevState => ({
            isEmpty: false,
            images: page === 1 ? hits : [...prevState.images, ...hits],
            showButton: page < Math.ceil(totalHits / 12),
            isVisible: false,
            isLoading: false,
          }));
        }
      })

      .catch(error => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoader: false, loader: false });
      });
  };

  handleModalClick = largeImage => {
    this.setState({ largeImage, showModal: true });
    // console.log(this.state.largeImage);
  };

  onLoadeMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, loader: true }));
  };

  onClose = () => {
    this.setState({ showModal: false });
  };
  render() {
    const {
      images,
      isEmpty,
      isVisible,
      error,
      largeImage,
      isLoading,
      loader,
      showModal,
    } = this.state;
    return (
      <>
        <div className={css.App}>
          <Searchbar onSubmit={this.onSubmit} />
          {isEmpty && (
            <b textalign="center">Sorry. There are no images ... 😭</b>
          )}
          {error && <b textAlign="center">Sorry.{error} 😭</b>}
          <ImageGallery
            images={images}
            handleModalClick={this.handleModalClick}
          />
          {isVisible && (
            <Button
              onLoadeMore={this.onLoadeMore}
              isLoading={this.state.isLoading}
              text={isLoading ? 'Loading' : 'Show more'}
            />
          )}
          {loader && <Loader />}
          {showModal && (
            <Modal largeImage={largeImage} onClose={this.onClose} />
          )}
        </div>
      </>
    );
  }
}
