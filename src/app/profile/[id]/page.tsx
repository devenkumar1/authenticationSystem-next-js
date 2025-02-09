import React from 'react'

async function details({params}: any) {
    
    const id = await params.id;

    return (
        <div>
            <h2>Your ID: {id}</h2>
        </div>
    );
}

export default details;
