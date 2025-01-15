const PersonsDisplay = ({ Person, multPersons }) => {
  return (
    <div>
      {multPersons.map((person) => (
        <Person perObj={person} key={person.name + person.number} />
      ))}
    </div>
  );
};

export default PersonsDisplay;
