/* eslint-disable react/prop-types */


const getVariantClass = (variant) => {
    switch (variant) {
      case "outlined":
        return "border-gray-400 text-gray-400 bg-transparent hover:bg-gray-400 hover:text-white";
      case "filled":
        return "border-blue-600 bg-blue-600 text-white hover:transition-all hover:bg-white hover:text-blue-600 transition ease-in-out delay-150 duration-300"
      default:
        return "border-blue-600 bg-blue-600 text-white hover:transition-all hover:bg-white hover:text-blue-600 transition ease-in-out delay-150 duration-300";
    }
  };


const Button = ({children,variant="filled",className,...rest}) => {

 const variantClasses = getVariantClass(variant);
    
  return (
    <button
    type="submit"
    className={`px-4 py-2 border-2 rounded-md ${variantClasses} ${className}`}
    {...rest}
  >
    {children}
  </button>
  )
}

export default Button