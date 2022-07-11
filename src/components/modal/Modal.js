import React from "react";
import { Box, Modal } from "@mui/material";

function ModalComponent(props) {
    const styles = {
        modalStyle: {
            position: "absolute",
            margin: '50vh 50vw',
            transform: "translate(-50%, -50%)",
            minWidth: "50%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            padding: 2,
        }
    }
    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Box sx={styles.modalStyle}>
                {props.children}
            </Box>
        </Modal>
    );
}

export default ModalComponent;