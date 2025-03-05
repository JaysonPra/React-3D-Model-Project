import { Grid } from '@mui/material'
import React from 'react'

const Gallery = () => {
  return (
    <>
    <Grid container bgcolor={'gray'}>
        <Grid item xs={12} md={6} lg={4}>
            <img src="./image1.jpg" className='w-100 h-100'/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
            <img src="./image2.jpg" className='w-100 h-100'/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
            <img src="./image3.jpg" className='w-100 h-100'/>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <img src="./image2.jpg" className='w-100 h-100'/>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
            <img src="./image1.jpg" className='w-100 h-100'/>
        </Grid>
    </Grid>
    </>
  )
}

export default Gallery