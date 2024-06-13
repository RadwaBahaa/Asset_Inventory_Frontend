const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

const SearchBar = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  return (
    <Select
      mode="multiple"
      placeholder="Search"
      value={selectedItems}
      onChange={setSelectedItems}
      style={{
        width: '300px', // Adjust the width as needed
      }}
      options={filteredOptions.map((item) => ({
        value: item,
        label: item,
      }))}
    />
  );
};
export default SearchBar;