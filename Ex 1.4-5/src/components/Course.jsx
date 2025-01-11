const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = (element) => {
  return (
    <p>
      {element.name} {element.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((element) => (
        <Part
          name={element.name}
          exercises={element.exercises}
          key={element.id}
        />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const exerciseSum = parts.reduce(
    (exerciseSum, element) => (exerciseSum += element.exercises),
    0
  );

  return (
    <>
      <p>
        <strong>total of {exerciseSum} exercises</strong>
      </p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
