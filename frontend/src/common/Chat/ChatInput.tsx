import React from 'react';
import { Collapse, Grid, TextField, InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import { Box, styled } from '@mui/system';
import SuggestionButton from './SuggestionButton';

type ChatInputProps = {
    className?: string;
    disabled?: boolean;
    value: string;
    setValue: (arg0: string) => void;
    submit: (query?: string) => void;
    showSuggestions?: boolean;
};

function ChatInput({
    className,
    disabled,
    value,
    setValue,
    submit,
    showSuggestions
}: ChatInputProps) {
    return (
        <Box
            className={className}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'end'
            }}>
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 2
                }}>
                <TextField
                    variant="outlined"
                    color="primary"
                    value={value}
                    multiline
                    maxRows={4}
                    onChange={e => setValue(e.target.value)}
                    onKeyUp={e => {
                        if (e.code === 'Enter' && !e.shiftKey && !disabled) {
                            e.preventDefault();
                            submit();
                        }
                    }}
                    label="Stel een vraag..."
                    sx={{
                        flexGrow: 1,
                        mt: 1,
                        '.MuiInputBase-root': { mb: 0 }
                    }}></TextField>
            </Box>
            <IconButton
                sx={{ mb: 0.9 }}
                disabled={disabled || value.length === 0}
                color="primary"
                onClick={() => submit()}>
                <SendIcon />
            </IconButton>
        </Box>
    );
}

export default styled(ChatInput)({ width: '800px' });
