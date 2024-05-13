import { useState, useEffect } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import { fetchImages } from '../images-api';
import SeachBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [modalState, setModalState] = useState(false);
  const [modalImage, setModalImage] = useState();

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleModalOpen = imageId => {
    setModalState(true);
    setModalImage(() => {
      return images.find(image => image.id === imageId);
    });
  };

  const handleModalClose = () => {
    setModalState(false);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getImages() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchImages(query, page);
        setImages(prevImages => {
          return [...prevImages, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [page, query]);

  return (
    <>
      <SeachBar onSearch={handleSearch} data={query} />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery images={images} onModal={handleModalOpen} />
      )}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      <ImageModal
        modalState={modalState}
        modalImage={modalImage}
        onModalClose={handleModalClose}
      />
    </>
  );
}
