import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const fetchImages = async (searchQuery, currentPage) => {
  const responce = await axios.get('search/photos', {
    params: {
      query: searchQuery,
      per_page: 10,
      page: currentPage,
      client_id: '1GquzCBaI0UtsoHgcDld8_rWok45jgrQydRDxHwcUwI',
    },
  });
  return responce.data.results;
};
