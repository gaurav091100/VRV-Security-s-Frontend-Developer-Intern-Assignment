/* eslint-disable react/prop-types */

const FormError = ({className,children,...rest}) => {
  return (
    <p className={`text-red-500 text-sm ${className}`} {...rest}>{children}</p>
  )
}

export default FormError