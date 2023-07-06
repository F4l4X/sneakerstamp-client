import React from "react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="text-white font-medium text-[24px] leading-[30px] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] rounded-[10px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-white text-[14px] placeholder:text-[#4b5264] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] rounded-[10px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-white text-[14px] placeholder:text-[#4b5264] sm:min-w-[300px] focus:border-1 focus:border-gray-400"
        />
      )}
    </label>
  );
};

export default FormField;
