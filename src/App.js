import './App.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { selectGuiPage } from './redux/reducers/utils';
import StartPage from './StartPage';
import * as React from 'react';
import WindowBar from './WindowBar';
import { SnackbarProvider } from 'notistack';
import TcpIpSettingsDialog from './UiTools/TcpIpSettingsDialog';
import { disconnectTcp, selectInstance, setIsConnected, setupClient } from './redux/reducers/connect';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const instance = useSelector(selectInstance);
  const guiPage = useSelector(selectGuiPage)
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (instance) {
      instance.on('error', (error) => {
        console.log(error);
        dispatch(disconnectTcp());
      });
      instance.on('exit', (code) => {
        if (code !== 0) {
          console.error(`Worker stopped with exit code ${code}`);
          dispatch(disconnectTcp());
        }
      });
      instance.on('message', (message) => {
        console.log(message);
        if (message.event === "error") {
          console.error("[TCP]", message.err);
          dispatch(disconnectTcp());
        }
        if (message.event === "connected") {
          dispatch(setIsConnected(true));
        }
        if (message.event === "closed") {
          dispatch(setIsConnected(false));
        }
      });
    }
  }, [instance, dispatch]);

  React.useEffect(() => {
    dispatch(setupClient());
  }, [dispatch]);

  const Router = () => {
    switch (guiPage) {
      case 'start':
        return <StartPage />
      default:
        return <div>ERROR</div>
    }
  }

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <div className="App">
          <WindowBar />
          <div className="App-Content">
            <Router />
          </div>
        </div>
        <TcpIpSettingsDialog />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
