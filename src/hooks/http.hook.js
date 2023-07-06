import { useState, useCallback } from "react";

// function useHttp() {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);

//     const request = useCallback( async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

//         setLoading(true);

//         try {
//             const response = await fetch(url, {method, body, headers});

//             if (!response.ok) {
//                 throw new Error(`Could not fetch ${url}, status ${response.status}`)
//             }

//             const data = await response.json();
//             return data;

//         } catch(e) {
//             setLoading(false);
//             setError(e.message);

//             throw e;
//         }

//     }, [])

//     const clearError = () => {
//         setError(false);
//     }

//     return {loading, error, request, clearError} 
// }

// export default useHttp;

function useHttp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    

    const request = useCallback( async (url, {method = 'GET', headers = {'Content-Type': 'application/json'}, body = null}) => {
        setLoading(true);

        try {
            const response = await fetch(url, {method, headers, body});

            if (!response.ok) {
                throw new Error (`Couldn't fetch ${url} status ${response.status}`)
            }

            setLoading(false);
            const data = await response.json()
            return data;

        } catch(e) {
            setLoading(false)
            setError(true);
            throw e;
        }
    }, []);

    const clearError = () => {
        setError(false);
    }

    return {loading, error, request, clearError}
}

export default useHttp;