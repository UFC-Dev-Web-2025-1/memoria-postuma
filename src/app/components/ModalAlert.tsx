import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ModalAlertProps {
  titulo: string,
  conteudo: string,
  aberto: boolean,
  setAberto: (valor: boolean) => void;
}

export const ModalAlert: React.FC<ModalAlertProps> = ({ titulo, conteudo, aberto, setAberto }) => {
  const handleClose = () => {
    setAberto(false);
  };

  return (
    <Dialog
      open={aberto}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          handleClose();
        }
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {conteudo}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};
