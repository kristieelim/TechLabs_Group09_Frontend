import React from 'react'

export default function StorePage() {
    return (
        <div>
            <h1>Store Page</h1>
            <p id="count-el">food</p>
            <h2 id="count-el">0</h2>
            <button id="increment-btn" onclick="increment()">+</button>
            <button id="decrease-btn" onclick="decrease()">-</button>
            <button id="delete-btn" onclick="delete()">Delete</button>
        </div>
    )
}
