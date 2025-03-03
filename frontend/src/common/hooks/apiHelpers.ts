import { useEffect, useState } from 'react';
import merge from 'lodash/merge';
import { ApiErrorType } from './apiTypes';

export const getAuthenticatedFetch = (
    token: string | undefined,
    otherHeaders?: Record<string, string>
) => {
    if (!token) {
        throw new Error('Cannot use authenticatedFetch without a token.');
    }

    const baseHeaders = {
        ...otherHeaders,
        Authorization: `Token ${token}`
    };

    const baseOptions = {
        headers: baseHeaders
    };

    return async (url: string, options: RequestInit) => {
        const mergedOptions = merge(baseOptions, options);
        return fetch(url, mergedOptions);
    };
};

export const useFetchGet = <Data>(
    defaultUrl: string | null,
    initialData?: Data,
    requiresAuth = false
) => {
    const [url, setUrl] = useState(defaultUrl);
    const [data, setData] = useState<Data | undefined>(initialData);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<ApiErrorType | undefined>();

    useEffect(() => {
        const controller = new AbortController();
        const inner = async () => {
            let client;

            client = fetch;

            setIsPending(true);
            const res = await client(url as string, { signal: controller.signal });
            if (res.ok) {
                const jsonResponse = await res.json();
                setIsPending(false);
                setData(jsonResponse);
                setError(undefined);
            } else {
                setIsPending(false);
                setData(undefined);
                setError({
                    status: res.status,
                    message: res.statusText
                });
            }
        };

        if (url) {
            inner();
        }

        return () => {
            controller.abort(0);
        };
    }, [url]);

    const clear = () => {
        setData(initialData);
        setError(undefined);
        setIsPending(false);
    };

    return {
        data,
        setData,
        isPending,
        error,
        setUrl,
        clear
    };
};

const useFetchPostOrPut = <Data>(initialData?: Data, requiresAuth = false, method = 'POST') => {
    const [data, setData] = useState<Data | undefined>(initialData);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<ApiErrorType>();
    const [numberOfRunningReq, setNumberOfRunningReq] = useState(0);

    useEffect(() => {
        setIsPending(numberOfRunningReq > 0);
    }, [numberOfRunningReq]);

    const send = async (url: string, body: Data) => {
        let client;
        client = fetch;

        setNumberOfRunningReq(previous => previous + 1);
        const res = await client(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (res.ok) {
            const json = await res.json();
            setNumberOfRunningReq(previous => previous - 1);
            setData(json);
            setError(undefined);

            return json;
        }
        setNumberOfRunningReq(previous => previous - 1);
        setData(undefined);
        setError({
            status: res.status,
            message: res.statusText
        });

        return null;
    };

    const clear = () => {
        setData(initialData);
        setError(undefined);
        setIsPending(false);
    };

    return {
        send,
        data,
        setData,
        isPending,
        error,
        clear
    };
};
export const useFetchPost = <Data>(initialData?: Data, requiresAuth = false) =>
    useFetchPostOrPut<Data>(initialData, requiresAuth, 'POST');
export const useFetchPut = <Data>(initialData?: Data, requiresAuth = false) =>
    useFetchPostOrPut<Data>(initialData, requiresAuth, 'PUT');
export const useFetchPatch = <Data>(initialData?: Data, requiresAuth = false) =>
    useFetchPostOrPut<Data>(initialData, requiresAuth, 'PATCH');