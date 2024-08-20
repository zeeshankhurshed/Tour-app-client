import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './features/userSlice';
import tourReducer from './features/tourSlice';

// Combine reducers
const rootReducer = combineReducers({
    user: userReducer,
    tour:tourReducer,
});
// Configuration for redux-persist
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'user'],
};
// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
    reducer: persistedReducer, // Use the persisted reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializableCheck for persistence
        }),
});
// Create the persistor
export const persistor = persistStore(store);

// Export the store as well
export default store;
