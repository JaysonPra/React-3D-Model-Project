import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const Contact = () => {
  return (
    <>
        <Box>
            <Typography variant='h4' textAlign={'center'} color='primary' padding={5} sx={{textDecoration:'underline'}}>
                Contact
            </Typography>
        </Box>
        <Box display={'flex'} padding={4} bgcolor={'#9c27b0'}>
            <Box width={'50%'}>
                <Typography variant='h5'>
                    Address 
                </Typography>
                <Typography variant='h5' color='pink'>
                    Our Store
                </Typography>
                <Typography variant='h5' color='pink'>
                    Lagankhel, Lalitpur
                </Typography>
                <Typography variant='h5' color='pink'>
                    01-54232889
                </Typography>
                <Typography variant='h6' color='pink' sx={{textDecoration:'underline'}}>
                    Email: info@ourstore.com
                </Typography>
                <Typography variant='h6' color='pink' sx={{textDecoration:'underline'}}>
                    Website: Ourstore.com
                </Typography>
            </Box>
            <Box width={'50%'} bgcolor={'#dce775'} padding={5}>
            <Typography variant='h5' color='red'>
                    Form
                </Typography>
                <TextField label='E-mail' placeholder='Enter your email here' fullWidth variant='outlined'></TextField>
                <TextField label='Subject' placeholder='Enter your subject here' fullWidth variant='outlined' type={'email'} sx={{marginTop:'10px'}}></TextField>
                <TextField label='Message' fullWidth sx={{marginTop:'10px'}} multiline rows={5}/>
                <Button variant='contained' fullWidth sx={{marginTop:'10px'}}>Submit</Button>
            </Box>
        </Box>
    </>
  )
}

export default Contact