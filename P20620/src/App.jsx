import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123 - 456 - 7890' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const addNewPerson = (e) => {
    e.preventDefault();

    const newPersonObj = {
      name: newName,
      number: newNumber,
    };

    // console.log(persons.some((obj) => obj.name === newNameObj.name));

    persons.some(
      (obj) =>
        obj.name === newPersonObj.name && obj.number === newPersonObj.number
    )
      ? alert(
          `${newPersonObj.name} already exists in the phonebook with number ${newPersonObj.number}`
        )
      : (setPersons(persons.concat(newPersonObj)),
        setNewName(''),
        setNewNumber(''));
  };

  const Person = ({ perObj }) => {
    return (
      <div>
        {perObj.name} {perObj.number}
      </div>
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        // <div>{person.name}</div>
        <Person perObj={person} key={person.name + person.number} />
      ))}
    </div>
  );
};

export default App;
