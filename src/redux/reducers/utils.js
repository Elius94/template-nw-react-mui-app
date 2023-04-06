import { createSlice } from '@reduxjs/toolkit';

export const utils = createSlice({
    name: 'utils',
    initialState: {
        guiPage: 'start',
        applicationName: 'NW.js React App',
        loader: false,
        isTcpSettingsDialogOpen: false,
        isOutputSettingsDialogOpen: false,
    },
    reducers: {
        setGuiPage: (state, action) => {
            state.guiPage = action.payload;
        },
        setApplicationName: (state, action) => {
            state.applicationName = action.payload;
        },
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
        setIsTcpSettingsDialogOpen: (state, action) => {
            state.isTcpSettingsDialogOpen = action.payload;
        },
        setIsOutputSettingsDialogOpen: (state, action) => {
            state.isOutputSettingsDialogOpen = action.payload;
        },
    },
});

export const {
    setGuiPage,
    setApplicationName,
    setLoader,
    setIsTcpSettingsDialogOpen,
    setIsOutputSettingsDialogOpen,
} = utils.actions;

/* Selectors */
export const selectGuiPage = state => state.utils.guiPage;
export const selectApplicationName = state => state.utils.applicationName;
export const selectLoader = state => state.utils.loader;
export const selectIsTcpSettingsDialogOpen = state => state.utils.isTcpSettingsDialogOpen;
export const selectIsOutputSettingsDialogOpen = state => state.utils.isOutputSettingsDialogOpen;

export default utils.reducer;