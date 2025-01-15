import { useState, useEffect } from 'react';
import personService from './services/persons';
import SearchFilter from './components/searchFilter';
import FormNewPeople from './components/FormNewPeople';
import PersonsDisplay from './components/PersonsDisplay';

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
    personService.get().then((people) => {
      // console.log(people);
      setPersons(people);
      setFilterPersons(people);
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
    const newFilterPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterPersons(newFilterPersons);
  };

  const Person = ({ perObj }) => {
    return (
      <div>
        {perObj.name} {perObj.number}{' '}
        <button onClick={() => delPerson(perObj.name, perObj.id)}>
          Delete
        </button>
      </div>
    );
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
          `${newPersonObj.name} already exists in the phonebook with number ${newPersonObj.number}.`
        )
      : (persons.some(
      (obj) =>
        obj.name === newPersonObj.name && obj.number !== newPersonObj.number) 
      ? window.confirm(
          `${newPersonObj.name} already exists in the phonebook with number ${obj.number}. Replace the old number with the new one S{newPersonObj.number}`)
      
      // axios.post('http://localhost:3001/persons', newPersonObj)
        personService.create(newPersonObj).then((person) => {
          setPersons(persons.concat(person)),
            setNewName(''),
            setNewNumber(''),
            setFilterPersons(persons.concat(person));
        });
  };

  const delPerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id).then((deletedPerson) => {
        console.log(deletedPerson);
        setPersons(persons.filter((person) => person.id !== deletedPerson.id));
        setFilterPersons(
          persons.filter((person) => person.id !== deletedPerson.id)
        );
      });
    }
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
      <PersonsDisplay Person={Person} multPersons={filterPersons} />
=======
import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const addNewName = (e) => {
    e.preventDefault();
    const newNameObj = {
      name: newName,
    };
    setPersons(persons.concat(newNameObj));
    setNewName('');
  };

  const Person = ({ perObj }) => {
    return <div>{perObj.name}</div>;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        // <div>{person.name}</div>
        <Person perObj={person} key={person.name} />
      ))}
    </div>
  );
};

export default App;
