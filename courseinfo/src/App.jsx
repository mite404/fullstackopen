import { useState } from 'react'
import './App.css'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
      <div>
        {courses.map(course =>
            <Course key={course.id} course={course}/>
        )}
      </div>
  )
}


const Course = ({ course }) => {
  return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
  )
}

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Content = ({ parts }) => {
  return (
      <p>
        {parts.map(part =>
            <Part key={part.id} part={part} />
        )}
      </p>
  )
}

const Part = ({ part }) => {
  return (
      <p>
        {part.name} - Exercises: {part.exercises}
      </p>
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
      <p>
        <strong>Total of {totalExercises} exercises</strong>
      </p>
  )
}

export default App
