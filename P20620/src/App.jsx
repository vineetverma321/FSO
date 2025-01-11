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
