import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { UserContext } from '../context/userContext';
import { apiUrl } from '../utils/config';

export function useRegister() {
    const { setIsLoading, setToken } = useContext(UserContext);
    const mutation = useMutation('register', ({ username, password }) =>
        fetch(`${apiUrl()}/auth/register`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ username, password }),
        }).then((r) => r.json()),
    );
    useEffect(() => {
        if (mutation.isSuccess) {
            setIsLoading(true);
            setToken(mutation.data.token);
        }
    }, [mutation.isSuccess]);
    return mutation;
}
