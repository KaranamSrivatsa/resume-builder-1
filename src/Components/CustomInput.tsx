import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

type customInputProps = {
    label: string
    error: string | undefined | any
    type: string
}


const CustomInput = (props: customInputProps) => {
    const {label, error, type} = props
    return (
    <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              <p className="text-red-600 text-sm">{error}</p>
      
    </div>
  )
}

export default CustomInput
