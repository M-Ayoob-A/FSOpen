const Header = (props) => <h2>{props.course}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part part={part} key={part.id} />)}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = (props) => <h4>total of {props.total} exercises</h4>

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((rollingSum, part) => rollingSum + part.exercises, 0)} />
    </div>
  )
}

export default Course