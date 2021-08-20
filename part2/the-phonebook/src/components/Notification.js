import react from 'react'

const Notification = ({message, color, backgroundColor}) => {
    if (message === '') {
        return null
    }

    const headerStyle = {
        color: color,
        backgroundColor: backgroundColor,
        borderStyle: 'solid',
        borderRadius: '5px',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '10px'
    }

    return (
        <h2 style={headerStyle}>
            {message}
        </h2>
    )
}

export default Notification