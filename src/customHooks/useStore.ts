import {useCallback, useContext, useRef} from 'react';
import {getStoreContext} from '../AppProvider';

type Value<T> = T extends any ? T | ((prevValue: T) => T) : never;

/**
 * OVERRIDDEN: value indicates that the default is overridden by setValue callback
 */
const defaultValues: {[key: string]: 'OVERRIDDEN'} = {};

export const useStore = <T = undefined>(
    key: string,
    defaultValue?: T,
    contextId?: string,
): [T, (value: Value<T>) => void] => {
    const dispatch = useContext(getStoreContext(contextId)).dispatch;
    const storeValue = useContext(getStoreContext(contextId))?.state?.[key];
    const isDefaultValueOverridden = !!defaultValues[key];

    const value: T = isDefaultValueOverridden ? storeValue : defaultValue;
    const valueRef = useRef<T>();
    valueRef.current = value;

    const setValue = useCallback(
        (nextValue: Value<T>) => {
            defaultValues[key] = 'OVERRIDDEN';

            if (typeof nextValue === 'function') {
                dispatch({
                    [key]: nextValue(valueRef.current),
                });
            } else {
                dispatch({
                    [key]: nextValue,
                });
            }
        },
        [dispatch, key],
    );

    return [value, setValue];
};
