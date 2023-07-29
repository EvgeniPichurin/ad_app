import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from "@mui/material";
import React from "react";

type Props = {
    open: boolean;
    title: string;
    content: string;
    confirmHandler: (flag: boolean) => void
}
const ActionConfirmation: React.FC<Props> = ({open, title, content, confirmHandler}) => {
    return <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {content}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => confirmHandler(false)}>ביטול</Button>
            <Button onClick={() => confirmHandler(true)} autoFocus>אישור</Button>
        </DialogActions>
    </Dialog>

}
export default ActionConfirmation