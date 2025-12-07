import React from 'react'
import { Fab, useScrollTrigger, Zoom } from '@mui/material'
import {KeyboardArrowUp} from "@mui/icons-material"
const ScrollToTop = () => {
  return (
    <Zoom in={useScrollTrigger({threshold:50})}>
      <Fab onClick={() => {
        window.scrollTo(0,0);
      }
      } variant='extended' size='small' sx={{ position:"fixed", bottom:33, right:33}} color="primary" aria-label="add">
        <KeyboardArrowUp fontSize="medium" />
      </Fab>
    </Zoom>
  )
}

export default ScrollToTop;
