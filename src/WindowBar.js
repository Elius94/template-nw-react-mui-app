import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logo from './logo192.png';
import IconMinimize from '@mui/icons-material/MinimizeSharp';
import AspectRatioSharpIcon from '@mui/icons-material/AspectRatioSharp';
import Crop32SharpIcon from '@mui/icons-material/Crop32Sharp';
import IconClose from '@mui/icons-material/CloseSharp';
import './WindowBar.css';
import { Box, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectApplicationName, setGuiPage } from './redux/reducers/utils';
import { disconnectTcp, selectInstance } from './redux/reducers/connect';
const GUI = require('nw.gui');

export default function WindowBar() {
    const applicationName = useSelector(selectApplicationName)
    const Connect = useSelector(selectInstance)
    const [isMaximized, setIsMaximized] = React.useState(false);

    const dispatch = useDispatch();

    React.useEffect(() => {
        var win = GUI.Window.get();

        // Get the minimize event
        win.on('loaded', function () {
            // Hide window
            GUI.Window.get().show();
        });

        win.resizeTo(800, 700);
        //win.setResizable(false);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleAction = (action) => {
        switch (action) {
            case 'minimize':
                GUI.Window.get().minimize();
                break;
            case 'maximize':
                if (GUI.Window.get().cWindow.state === 'maximized') {
                    GUI.Window.get().unmaximize();
                    setIsMaximized(false);
                } else {
                    GUI.Window.get().maximize();
                    setIsMaximized(true);
                }
                break;
            case 'close':
                dispatch(disconnectTcp())
                GUI.Window.get().close(false);
                break;
            case 'home':
                if (Connect && Connect.isConnected()) {
                    Connect.disconnect();
                }
                dispatch(setGuiPage('start'));
                break;
            default:
                console.log('unknown action');
                break;
        }
    }

    return (
        <AppBar position="static" className={'windowBar'} component="nav">
            <Toolbar sx={{ minHeight: 'unset', height: 'inherit' }} variant="dense">
                <Tooltip title="Go to home page" arrow>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} className={'windowBarButtons'} onClick={() => handleAction('home')}>
                        <img src={logo} className="barLogo" alt="logo" height={20} />
                    </IconButton>
                </Tooltip>
                <Typography variant="subtitle2" color="gray" component="div">
                    {applicationName}
                </Typography>
                <Box sx={{ position: 'absolute', right: 0 }}>
                    <IconButton color="default" className={'windowBarButtons'} onClick={() => handleAction('minimize')}>
                        <IconMinimize />
                    </IconButton>
                    <IconButton color="default" className={'windowBarButtons'} onClick={() => handleAction('maximize')}>
                        {isMaximized ? <Crop32SharpIcon /> : <AspectRatioSharpIcon />}
                    </IconButton>
                    <IconButton color="default" className={'windowBarButtons'} onClick={() => handleAction('close')}>
                        <IconClose />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
