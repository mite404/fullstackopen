import { useState } from 'react'
import './App.css'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const Header = (props) => {
    console.log(props)
    return (
        <h1>{props.course}</h1>
    )
  }

  const Part = ({ parts, exercises }) => {
    return (
        <p>{parts} {exercises}</p>
    )
  }

  const Content = ({ parts }) => {

    return (
        <>
          <Part parts={parts[0].name} exercises={parts[0].exercises} />
          <Part parts={parts[1].name} exercises={parts[1].exercises} />
          <Part parts={parts[2].name} exercises={parts[2].exercises} />
        </>
    )
  }

  const Total = ({ text, parts}) => {
    const totalExercises = parts[0].exercises + parts[1].exercises + parts[2].exercises
    return (
        <>
          <p>{text} {totalExercises}</p>
        </>
    )
  }

  return (
      <div>
        <Header course={course} />
          <Content parts={parts} />
          <Total text='Total number of exercises: ' parts={parts} />
      </div>
  )
}

export default App
