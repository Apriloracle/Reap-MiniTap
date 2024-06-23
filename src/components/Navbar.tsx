import React from 'react'

const Navbar = () => {
    return (
        <div className='flex w-full text-white py-4 px-8 bg-slate-800'>
            <div className='flex flex-row justify-between w-full'>
                <div>
                    LOGO
                </div>
                <div>
                    Mid Part
                </div>
                {/* <div className='hidden md:flex'>
                <w3m-button />
                </div> */}
            </div>
        </div>
    )
}

export default Navbar
