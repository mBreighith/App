import React, {useReducer, useMemo, useRef} from 'react';
import EventEmitter from 'eventemitter3';

/**
 * ClientContext
 */
const eventClient = new EventEmitter();

export const ClientContext = React.createContext<{eventClient: EventEmitter}>({
    eventClient,
});

/**
 * StoreContext
 */
type State = {[key: string]: any};
type Action = {[key: string]: any};

const initState: State = {};

type ContextState = {
    state: State;
    dispatch: React.Dispatch<Action>;
    contextId: string;
};

const mainReducer = (state: State, action: Action) => ({...state, ...action});

const storeContexts: {[key: string]: React.Context<ContextState>} = {
    default: React.createContext<ContextState>({
        state: {},
        dispatch: _value => {},
        contextId: '',
    }),
};

export const getStoreContext = (contextId?: string) => {
    if (!contextId) {
        return storeContexts.default;
    }

    const currentContext: React.Context<ContextState> = storeContexts[contextId];

    if (currentContext) {
        return currentContext;
    }

    storeContexts[contextId] = React.createContext<ContextState>({
        state: {},
        dispatch: _value => {},
        contextId: '',
    });

    return storeContexts[contextId];
};

interface Props {
    children?: React.ReactNode;
    contextId?: string;
}

export const AppProvider = (props: Props) => {
    const StoreContext = useRef(getStoreContext(props.contextId)).current;
    const [state, dispatch] = useReducer(mainReducer, initState);
    const contextId = useRef(
        props.contextId || Math.random().toString(16).slice(2),
    );

    const storeProviderValue = useMemo(
        () => ({state, dispatch, contextId: contextId.current}),
        [state],
    );
    const clientProviderValue = useMemo(() => ({eventClient}), []);

    return (
        <ClientContext.Provider value={clientProviderValue}>
            <StoreContext.Provider value={storeProviderValue}>
                {props.children}
            </StoreContext.Provider>
        </ClientContext.Provider>
    );
};
