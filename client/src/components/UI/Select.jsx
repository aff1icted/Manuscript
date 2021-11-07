import react from "react"


const Select = ({options, DefaultValue, value, onChange}) =>{
  return (
    <select value
        value={value}
        onChange={Event=>onChange(Event.target.value)}
    >
        <option disabled value="">{DefaultValue}</option>
        {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
    </select>

  );
};

export default Select;