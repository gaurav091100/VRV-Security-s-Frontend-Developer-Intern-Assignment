/* eslint-disable react/prop-types */

const InputLabel = ({className,children,...rest}) => {
  return (
    <label className={`block text-sm mb-1 font-medium text-gray-700 ${className}`} {...rest}>{children}
    <span className="text-red-500 text-md">
    {rest.required ? "  *" : null}
    </span>
    </label>
  )
}

export default InputLabel