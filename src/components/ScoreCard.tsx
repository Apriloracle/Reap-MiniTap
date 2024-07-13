import React from 'react'

interface ScoreCardProps {
    score: number
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
    return (
        <div className="text-white mb-8 w-40 h-40 flex items-center justify-center">
            <p className="text-3xl font-extrabold">{score}</p>
        </div>
    )
}

export default ScoreCard
