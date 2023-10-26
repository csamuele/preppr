import { useDispatch as useReduxDispatch, useStore } from 'react-redux';
import { AppDispatch } from 'App/store';

export const useDispatch = () => {
    const store = useStore();
    return useReduxDispatch<AppDispatch>();
};