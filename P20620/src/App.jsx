import { useState, useEffect } from 'react';
import axios from 'axios';

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

const Person = ({ perObj }) => {
  return (
    <div>
      {perObj.name} {perObj.number}
    </div>
  );
};

const PersonsDisplay = ({ multPersons }) => {
  return (
    <div>
      {multPersons.map((person) => (
        <Person perObj={person} key={person.name + person.number} />
      ))}
    </div>
  );
};

// start of app component
const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '123-456-7890' },
    // { name: 'Arto Vance', number: '1325-257-295' },
    // { name: 'what the hell', number: '462-492-9676' },
    // { name: 'divya verma', number: '337-329-4444' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPersons, setFilterPersons] = useState(persons);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      // console.log(response.data);
      setPersons(response.data);
      setFilterPersons(response.data);
    });
  }, []);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setSearchTerm(e.target.value);
    // const searchTerm = e.target.value.toLowerCase();
    const newFilterPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterPersons(newFilterPersons);
  };

  const addNewPerson = (e) => {
    e.preventDefault();

    const newPersonObj = {
      name: newName,
      number: newNumber,
    };

    persons.some(
      (obj) =>
        obj.name === newPersonObj.name && obj.number === newPersonObj.number
    )
      ? alert(
          `${newPersonObj.name} already exists in the phonebook with number ${newPersonObj.number}`
        )
      : (setPersons(persons.concat(newPersonObj)),
        setNewName(''),
        setNewNumber(''),
        setFilterPersons(persons.concat(newPersonObj)));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter searchTerm={searchTerm} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <FormNewPeople
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addNewPerson={addNewPerson}
      />
      <h3>Numbers</h3>
      <PersonsDisplay multPersons={filterPersons} />
    </div>
  );
};

export default App;
