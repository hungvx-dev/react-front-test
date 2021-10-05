import React from 'react'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog, { DialogProps } from '@mui/material/Dialog'

export interface ConfirmationDialogProps extends DialogProps {
  title: string
  open: boolean
  onCloseDialog: (isOk?: boolean) => void
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  onCloseDialog,
  open,
  title,
  children,
  ...other
}) => {
  const handleCancel = () => {
    onCloseDialog()
  }

  const handleOk = () => {
    onCloseDialog(true)
  }

  return (
    <Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }} maxWidth="xs" open={open} {...other}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}
