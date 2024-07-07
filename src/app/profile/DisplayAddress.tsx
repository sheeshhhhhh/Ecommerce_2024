import React from 'react'

const DisplayAddress = ({
    address 
} : {
    address?: string | null
}) => {

    let formmatedAddress
    // make this interactable later on where they can show the address without asterisks
    if(address) {
        formmatedAddress = formatText(address, 5, 
        (address.length > 10 ? address.length - 5 : address.length - 15))
    }

    return (
        <div className='flex my-2'>
            <div className='px-2'>
                <h2 className='text-[#555555cc] font-bold'>Address</h2>
            </div>
            <div className='pl-2'>
                {
                address || formmatedAddress ?
                <div>
                    <p className='text-black'>{formmatedAddress}</p>
                </div> :
                <div>
                    <p className='text-[#555555cc] font-semibold'>You can't check out without having an address. {" "}
                        <span className='text-black font-normal'>Edit your pofile</span>
                    </p>
                </div>
                }
            </div>
        </div>
    )
}

export default DisplayAddress

function formatText(input: string, start: number, end: number): string {
    // Ensure start and end indices are within the string length
    if (start < 0 || end >= input.length || start >= end) {
        throw new Error("Invalid start or end index");
    }

    // Replace all digits with asterisks
    const digitFormatted = input.replace(/\d/g, '*');

    // Extract the prefix, middle, and suffix using indices
    const prefix = digitFormatted.slice(0, start);
    const middle = digitFormatted.slice(start, end + 1);
    const suffix = digitFormatted.slice(end + 1);

    // Replace the middle section with asterisks
    const asterisks = '*'.repeat(middle.length);

    // Return the formatted string
    return `${prefix}${asterisks}${suffix}`;
}