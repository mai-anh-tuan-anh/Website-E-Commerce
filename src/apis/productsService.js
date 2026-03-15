import axiosClient from './axiosClient';

const getProducts = async (query) => {
    const { sortType, page, limit, search } = query;
    const queryLimit = limit === 'all' ? '' : `&limit=${limit}`;
    const searchQuery = search ? `&search=${encodeURIComponent(search)}` : '';
    const res = await axiosClient.get(
        `/product?sortType=${sortType}&page=${page}${queryLimit}${searchQuery}`
    );
    return res.data;
};
export { getProducts };
