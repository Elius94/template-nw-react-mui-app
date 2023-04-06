import * as React from 'react';
import logo from './logo192.png';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Grid, Paper, Typography } from '@mui/material';
import { connectTcp, disconnectTcp, selectIsConnected } from './redux/reducers/connect';
import { useDispatch, useSelector } from 'react-redux';
import { setIsTcpSettingsDialogOpen } from './redux/reducers/utils';
import LanIcon from '@mui/icons-material/Lan';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import CircleIcon from '@mui/icons-material/Circle';


export default function StartPage() {
    const isConnected = useSelector(selectIsConnected);
    const [disableConnect, setDisableConnect] = React.useState(false);
    const [disableConnectTimeout] = React.useState(3000);

    const dispatch = useDispatch();

    const handleConnect = () => {
        console.log("Connect");
        dispatch(connectTcp());
        setDisableConnect(true);
        setTimeout(() => {
            setDisableConnect(false);
        }, disableConnectTimeout);
        //dispatch(setIsConnected(true));
    }

    const handleDisconnect = () => {
        console.log("Disconnect");
        dispatch(disconnectTcp());
        setDisableConnect(true);
        setTimeout(() => {
            setDisableConnect(false);
        }, disableConnectTimeout);
    }

    const setTcpIpSettingsDialogOpen = () => {
        console.log("TCP/IP Settings");
        dispatch(setIsTcpSettingsDialogOpen(true));
    }

    return (
        <React.Fragment>
            <Container maxWidth="lg" className='centered'>
                <Grid container spacing={1}>
                    <Grid item xs={12} sx={{ height: '110px'/*, border: '1px solid #9f9f9f'*/, paddingY: 1 }}>
                        {/* Barra di stato */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={3} sx={{}}>
                                <img src={logo} className="logo" alt="logo" height={"95px"} />
                            </Grid>
                            <Grid item xs={12} sm={9} sx={{ /*backgroundColor: 'green'*/ paddingX: 1 }}>
                                <Grid container spacing={2} justifyContent="center" alignItems="center" direction="row" height={"100%"}>
                                    <Grid item xs={12} sm={4} sx={{ /*backgroundColor: 'red'*/ }}>
                                        <Button size='large' variant="outlined" onClick={setTcpIpSettingsDialogOpen} endIcon={<LanIcon fontSize='small' />} disabled={isConnected}>TCP/IP Settings</Button>
                                    </Grid>
                                    <Grid item xs={12} sm={4} sx={{ /*backgroundColor: 'red'*/ }}>
                                        {isConnected ? (
                                            <Button size='large' variant="outlined" color="warning" onClick={handleDisconnect} endIcon={<LinkOffIcon fontSize='small' />} disabled={disableConnect}>Disconnect From Server</Button>
                                        ) : (
                                            <Button size='large' variant="outlined" color="info" onClick={handleConnect} endIcon={<LinkIcon fontSize='small' />} disabled={disableConnect}>Connect To Server</Button>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ height: '500px'/*, border: '1px solid #9f9f9f'*/, paddingY: 1 }}>
                        {/* Central panel */}
                        <Paper elevation={10} sx={{ height: '100%', width: '100%', padding: 1 }}>
                            
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sx={{ height: '10px'/*, border: '1px solid #9f9f9f'*/, paddingY: 1 }}>
                        {/* footer with connection badge (red or green led) */}
                        <Grid container spacing={2} justifyContent="flex-end" alignItems="center" direction="row" height={"100%"}>
                            {isConnected ? (
                                <>
                                    <Grid item xs={1} sx={{ /*backgroundColor: 'red'*/ }}>
                                        <Typography variant="body2" color="success">Online</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ /*backgroundColor: 'red'*/ }}>
                                        <CircleIcon fontSize='small' color='success' />
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid item xs={1} sx={{ /*backgroundColor: 'red'*/ }}>
                                        <Typography variant="body2" color="error">Offline</Typography>
                                    </Grid>
                                    <Grid item xs={1} sx={{ /*backgroundColor: 'red'*/ }}>
                                        <CircleIcon fontSize='small' color='error' />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}



