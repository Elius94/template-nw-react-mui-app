import { configureStore } from '@reduxjs/toolkit';
import utilsReducer from './reducers/utils';
import connectReducer from './reducers/connect';


/**
 * Each reducer has been briefly documented in its respective files
 */
export default configureStore({
    reducer: {
        utils: utilsReducer,
        connect: connectReducer, // Used to store the instance of a backend connection class
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['connect/instance', 'connect/setInstance'],
                ignoredActionPaths: ['connect.instance', 'connect.setInstance'],
                ignoredPaths: ['connect.instance', 'connect.setInstance'],
            },
        }),
});