import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectIp, selectPort, setIp, setPort } from '../redux/reducers/connect';
import { checkIfValidIP } from '../utils/utils.mjs';
import { useSnackbar } from 'notistack';
import { selectIsTcpSettingsDialogOpen, setIsTcpSettingsDialogOpen } from '../redux/reducers/utils';
import { log } from '../utils/log';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TcpIpSettingsDialog(props) {
    const open = useSelector(selectIsTcpSettingsDialogOpen);
    const ipAddress = useSelector(selectIp);
    const port = useSelector(selectPort);
    const [tmpIpAddress, setTmpIpAddress] = React.useState(ipAddress);
    const [tmpPort, setTmpPort] = React.useState(port);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleClose = (confirm) => {
        if (confirm) {
            if (checkIfValidIP(ipAddress)) {
                dispatch(setIp(tmpIpAddress));
                enqueueSnackbar('IP address is valid', { variant: 'success' });
                log(`TCP/IP settings set to ${tmpIpAddress}:${tmpPort}`)
            } else {
                enqueueSnackbar('IP address is invalid', { variant: 'error' });
                return;
            }
            if (port > 0 && port < 65536) {
                dispatch(setPort(tmpPort));
                enqueueSnackbar('Port is valid', { variant: 'success' });
                log(`TCP/IP settings set to ${tmpIpAddress}:${tmpPort}`)
            } else {
                enqueueSnackbar('Port is invalid', { variant: 'error' });
                return;
            }
        }
        dispatch(setIsTcpSettingsDialogOpen(false)); // close the dialog box after confirming
    };

    return (
        <div>
            <Dialog
                sx={{ zIndex: 9999, marginY: 1 }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>TCP/IP Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Use this form to setup the connection to the server. 
                    </DialogContentText>
                    {/* IP and port settings (form built using MuiMaterial) */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="IpAddress"
                        label="IP Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setTmpIpAddress(e.target.value)}
                        value={tmpIpAddress}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Port"
                        label="Port"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setTmpPort(e.target.value)}
                        value={tmpPort}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)}>Cancel</Button>
                    <Button onClick={() => handleClose(true)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
