const FormNewPeople = ({
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
  addNewPerson,
}) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name:{' '}
        <input
          name="name"
          value={newName}
          onChange={handleNewName}
          autoComplete="off"
        />
      </div>
      <div>
        number:{' '}
        <input
          name="number"
          value={newNumber}
          onChange={handleNewNumber}
          autoComplete="off"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default FormNewPeople;
