import { useEffect, useState } from 'react';
import { carService } from '../services/api.js';

export default function useCars(params = {}) {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function loadCars() {
            try {
                setIsLoading(true);
                setError('');
                const { data } = await carService.getAllCars(params);
                if (isMounted) {
                    setCars(data.data || []);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.response?.data?.message || 'Unable to load cars.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadCars();

        return () => {
            isMounted = false;
        };
    }, [JSON.stringify(params)]);

    return { cars, isLoading, error };
}
