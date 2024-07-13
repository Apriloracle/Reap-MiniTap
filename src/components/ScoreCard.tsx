import React from 'react'

interface ScoreCardProps {
    score: number
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
    return (
        <div className="text-white mb-8 w-40 h-40 flex items-center justify-center">
            <div className="flex items-center space-x-2">
                <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 011-1h1V7a1 1 0 012 0v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 01-1-1z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
                <p className="text-3xl font-extrabold">{score}</p>
            </div>
        </div>
    )
}

export default ScoreCard
