import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => 
          <p key={part.id}>
            <Part name={part.name} exercises={part.exercises} />
          </p>
        )}
      </>
    )
  }

export default Content