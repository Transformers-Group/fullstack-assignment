import React from 'react';
import { styled } from '@mui/system';
import { Button, Typography } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

type SuggestionButtonProps = {
    className?: string;
    children: string;
    onClick: () => void;
};

function SuggestionButton({ className, children, onClick }: SuggestionButtonProps) {
    return (
        <Button
            variant="outlined"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                textTransform: 'none',
                height: '100%'
            }}
            className={className}
            onClick={onClick}>
            <Typography sx={{ flexGrow: 1, m: 0 }}>{children}</Typography>
            <AutoFixHighIcon />
        </Button>
    );
}

export default styled(SuggestionButton)({});
