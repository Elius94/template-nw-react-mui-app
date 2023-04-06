import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fork } from 'child_process';
import path from 'path';

export const connect = createSlice({
    name: 'connect',
    initialState: {
        instance: null,
        isConnected: false,
        ip: "192.168.0.10",
        port: 80,
    },
    reducers: {
        reset(state) {
            state.availableConfigurations = [];
        },
        setInstance(state, action) {
            state.instance = action.payload;
        },
        setIsConnected(state, action) {
            state.isConnected = action.payload;
        },
        setIp(state, action) {
            state.ip = action.payload;
            console.log("Set IP", action.payload);
            if (state.instance) {
                state.instance.send({ event: "changeSettings", data: { ip: action.payload, port: state.port } });
            }
        },
        setPort(state, action) {
            state.port = action.payload;
            console.log("Set port", action.payload);
            if (state.instance) {
                state.instance.send({ event: "changeSettings", data: { ip: state.ip, port: action.payload } });
            }
        },
        setupClient(state, action) {
            if (state.instance == null) {
                //const tcpConnect = new TcpConnect();               
                state.instance = fork(path.join(process.cwd(), "/tcp.js"), [state.ip, state.port, state.outputDirectory]);
            } else {
                console.log("Already created tcp client");
            }
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(connectTcp.fulfilled, (state, action) => {
            // Add user to the state array
            console.log("Connected", action);
            console.log("Waiting for connection feedback");
            //state.isConnected = action.payload;
        })
        builder.addCase(connectTcp.rejected, (state, action) => {
            // Add user to the state array
            console.log("Error connecting", action);
            state.isConnected = action.payload;
        })
        builder.addCase(disconnectTcp.fulfilled, (state, action) => {
            // Add user to the state array
            console.log("Connected", action);
            state.isConnected = action.payload;
        })
        builder.addCase(disconnectTcp.rejected, (state, action) => {
            // Add user to the state array
            console.log("Error connecting", action);
            state.isConnected = action.payload;
        })
    },
});

export const connectTcp = createAsyncThunk(
    'connect/connectTcp',
    async (arg, { getState }) => {
        const state = getState();
        if (state.connect.isConnected) {
            console.log("Already connected");
            return new Promise((reject) => { reject(false) });
        }
        if (state.connect.ip == null) {
            console.log("Invalid IP");
            return new Promise((reject) => { reject(false) });
        }
        if (state.connect.port == null) {
            console.log("Invalid port");
            return new Promise((reject) => { reject(false) });
        }

        const res = await new Promise((resolve, reject) => {
            state.connect.instance.send({ event: 'connect' }, (error) => {
                if (error) {
                    console.log("Error connecting to server");
                    reject(error);
                }
                resolve(true);
            });
        });

        return res;
    }
)

export const disconnectTcp = createAsyncThunk(
    'connect/disconnectTcp',
    async (arg, { getState }) => {
        const state = getState();
        if (!state.connect.isConnected) {
            console.log("Already disconnected");
            return new Promise((reject) => { reject(true) });
        }

        const res = await new Promise((resolve, reject) => {
            state.connect.instance.send({ event: 'disconnect' }, (error) => {
                if (error) {
                    console.log("Error disconnecting from server");
                    reject(error);
                }
                resolve(false);
            });
        });

        return res;
    }
)

export const {
    setInstance,
    reset,
    setIsConnected,
    setIp,
    setPort,
    setupClient,
} = connect.actions;

/* Selectors */
export const selectInstance = state => state.connect.instance;
export const selectIsConnected = state => state.connect.isConnected;
export const selectIp = state => state.connect.ip;
export const selectPort = state => state.connect.port;

export default connect.reducer;