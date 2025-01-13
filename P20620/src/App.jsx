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
          `${newPersonObj.name} already exists in the phonebook with number ${newPersonObj.number}`
        )
      : // axios.post('http://localhost:3001/persons', newPersonObj)
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
    </div>
  );
};

export default App;
