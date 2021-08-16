import React from 'react'

const Total= ({parts}) => {
  return (
      <b>
        total of {parts.reduce( ( acc, cur ) =>
        acc + cur.exercises, 0 )} exercises
      </b>

  )
}

export default Total