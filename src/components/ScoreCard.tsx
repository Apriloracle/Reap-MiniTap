import React from 'react'

interface ScoreCardProps {
    score: number
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
    return (
        <div className="bg-gradient-to-br from-[#f05e23] to-[#d54d1b] text-white rounded-xl p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-2">Your Score</h2>
            <p className="text-4xl font-extrabold">{score}</p>
        </div>
    )
}

export default ScoreCard
