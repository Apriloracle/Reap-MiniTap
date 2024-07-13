import React from 'react'

interface ScoreCardProps {
    score: number
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
    return (
        <div className="bg-gradient-to-br from-[#f05e23] to-[#d54d1b] text-white rounded-xl p-6 shadow-lg mb-8 w-40 h-40 flex items-center justify-center">
            <p className="text-6xl font-extrabold">{score}</p>
        </div>
    )
}

export default ScoreCard
