import { Button, Typography } from '@mui/material'
import React from 'react'

const Services = () => {
  return (
    <>
    <div>
      <Typography variant='h4' color='primary' padding={2} sx={{textDecoration:'underline'}}>Services</Typography>
    </div>
      <div className="flex p-5 justify-between">
        <div className='py-2 fs-5'>
        <i class="bi bi-amazon">Amazon</i>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed architecto iusto, qui consequuntur hic libero accusantium nemo asperiores! Dignissimos laborum atque odio vel nulla cumque nesciunt repellendus officia? Nostrum, nihil.</p>
        <Button variant='contained' sx={{marginTop:'10px'}}>More...</Button>
        </div>
        <div className='py-2 fs-5'>
        <i class="bi bi-apple">Apple</i>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed architecto iusto, qui consequuntur hic libero accusantium nemo asperiores! Dignissimos laborum atque odio vel nulla cumque nesciunt repellendus officia? Nostrum, nihil.</p>
        <Button variant='contained' sx={{marginTop:'10px'}}>More...</Button>
        </div>
        <div className='py-2 fs-5'>
        <i class="bi bi-amd">AMD</i>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed architecto iusto, qui consequuntur hic libero accusantium nemo asperiores! Dignissimos laborum atque odio vel nulla cumque nesciunt repellendus officia? Nostrum, nihil.</p>
        <Button variant='contained' sx={{marginTop:'10px'}}>More...</Button>
        </div>
      </div>
    </>
  )
}

export default Services