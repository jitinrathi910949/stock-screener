import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

function ConfirmDailogBox(props) {
  const { handleClose, title, message, dialogOpen, clikedOnAgree } = props;
  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button color="warning" onClick={clikedOnAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
ConfirmDailogBox.propTypes = {
  handleClose: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  dialogOpen: PropTypes.bool,
  clikedOnAgree: PropTypes.func
};
export default ConfirmDailogBox;
