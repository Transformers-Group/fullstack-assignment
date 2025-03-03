import React from 'react';
import { Box, styled } from '@mui/system';
import Card from '../ui/Card';

type HumanTextMessageProps = {
    className?: string;
    message: string;
};
function HumanTextMessage({ className, message }: HumanTextMessageProps) {
    return (
        <Box className={className}>
            <Box
                sx={{
                    width: '100%',
                    pl: {
                        xs: '25px',
                        md: '45%'
                    },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'left',
                    alignItems: 'top'
                }}>
                <Card
                    sx={{
                        width: '100%',
                        p: 2,
                        whiteSpace: 'pre-wrap',
                        backgroundColor: t => t.palette.secondary.main,
                        mr: t => t.spacing(1)
                    }}>
                    {message}
                </Card>
            </Box>
        </Box>
    );
}

export default styled(HumanTextMessage)({
    width: '100%'
});
