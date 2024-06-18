import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useTheme } from '@mui/system';
import MenuBar from './elements/MenuBar';

export default function BaseView() {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box>
                <MenuBar
                    sx={{
                        background: {
                            xs: theme.palette.secondary.main,
                            sm: theme.palette.secondary.main
                        },
                        position: 'fixed',
                        display: { xs: 'block', sm: 'block' }
                    }}
                    logoOnFullScreen
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flexGrow: 1,
                    p: '15px',
                    pt: {
                        xs: '65px',
                        sm: '80px'
                    }
                }}>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '1000px'
                    }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
