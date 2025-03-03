import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePrevious = (value: any) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export function useLocalStorage(key: string, initialDefault: any) {
    const [val, setVal] = useState(() => {
        const localStorageVal = localStorage.getItem(key);

        return localStorageVal !== null ? JSON.parse(localStorageVal) : initialDefault;
    });

    useEffect(() => {
        if (localStorage.getItem(key) === null) {
            setVal(initialDefault);
        }
    }, [key, initialDefault]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(val));
    }, [val, key]);

    return [val, setVal];
}

/**
 * A hook to manage search params state,
 * it will automatically update the search params when the state changes
 * @param searchParamName - the name of the search param to use
 * @param defaultValue - the default value to use if the search param is not present
 * @param isValid - a function (typeguard) to validate the search param, if not provided, the search param is considered valid
 *
 * @returns a tuple containing the search param state and a function to set the search param state
 */
export function useSearchParamsState<T = string>(
    searchParamName: string,
    defaultValue?: T,
    isValid?: (value: any) => value is T
): [T | undefined, (value: T) => void] {
    const [searchParams, setSearchParams] = useSearchParams();

    const acquiredSearchParam = searchParams.get(searchParamName);
    let searchParamsState = defaultValue;

    if (acquiredSearchParam !== null) {
        if (isValid ? isValid(acquiredSearchParam) : true) {
            searchParamsState = acquiredSearchParam as unknown as T;
        }
    }

    const setSearchParamsState = (newState: T) => {
        const next: { [key: string]: string } = {
            ...[...searchParams.entries()].reduce(
                (o, [key, value]) => ({ ...o, [key]: value }),
                {}
            ),
            [searchParamName]: String(newState)
        };
        setSearchParams(next);
    };

    return [searchParamsState, setSearchParamsState];
}
