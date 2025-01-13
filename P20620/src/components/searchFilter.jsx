const SearchFilter = ({ searchTerm, handleFilter }) => {
  return (
    <div>
      filter shown with{'  '}
      <input
        name="filter"
        value={searchTerm}
        onChange={handleFilter}
        autoComplete="off"
      />
    </div>
  );
};

export default SearchFilter;
