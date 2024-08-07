import { memo } from "react"

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const InputForm = ({ label }) => {
    return (
        <div>
            <label htmlFor="phone">{label}</label>
            <input type='text' id="phone" className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"/>
        </div>
    )
}

export default memo(InputForm)