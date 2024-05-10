"use client";

function Select({
  onSelect,
  options,
}: {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}) {
  return (
    <select
      onChange={(e) => {
        onSelect(e.target.value);
      }}
      className=" block w-full border text-sm p-2 focus:ring-blue-400 bg-gray-300 text-black rounded-md"
    >
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
}

export default Select;
