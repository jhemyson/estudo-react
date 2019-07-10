import React from 'react'

import { Title } from './styles'

function Main(){
  const error = false

  return <Title error={error} >Main <small>test app</small></Title>
}

export default Main
