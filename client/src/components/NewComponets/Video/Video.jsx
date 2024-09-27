import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Video = () => {
    const [value, setValue] = useState('') // Initialize state with an empty string

    const navigate = useNavigate()

    const handleJoinRoom = useCallback(() => {
        navigate(`/room/${value}`)
    }, [navigate, value])

    return (
        <>
            <div>Video</div>
            <input
                type="text"
                value={value} // Controlled input
                onChange={(e) => setValue(e.target.value)}
                placeholder='Enter Room Code'
            />
            <button onClick={handleJoinRoom}>Join</button>
        </>
    )
}
