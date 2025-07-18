import ReactDom from 'react-dom/client'
import Note from './components/Note'
import { useState } from 'react'
import './App.css'

const Header = (props) => {
  const {name} = props
  return (
      <h2>{name}</h2>
  )
}

const Button = (props) => {
  const {onClick, text} = props
  return (
      <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return <p>{text}: {value}</p>
}

const ConditionalRender = ({ condition, children }) => {
  if(condition > 0) return <>{children}</>
  return null;
}

const Statistics = (props) => {
  const { good, neutral, bad, totalVotes, average, percentagePositive } = props;

  return (
      <>
      <ConditionalRender condition={good > 0}>
        <StatisticLine text='Good' value={good} />
      </ConditionalRender>
      <ConditionalRender condition={neutral > 0}>
        <StatisticLine text='Neutral' value={neutral} />
      </ConditionalRender>
      <ConditionalRender condition={bad > 0}>
        <StatisticLine text='Bad' value={bad} />
      </ConditionalRender>
      <ConditionalRender condition={totalVotes() > 0}>
        <StatisticLine text='All votes' value={totalVotes()} />
      </ConditionalRender>
      <ConditionalRender condition={average() > 0}>
        <StatisticLine text='Average' value={Math.floor(average())} />
      </ConditionalRender>
      <ConditionalRender condition={percentagePositive() > 0}>
        <StatisticLine text='Percentage' value={Math.floor(percentagePositive())} />
      </ConditionalRender>
      </>
  )
}


//
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selectedAnecdote, setSelectedAnecdote] = useState(0)
  const [votes, setVotes] = useState(new Array(8).fill(0))

  const handleGoodClick = () => {
    const newValue = good + 1
    setGood(newValue)
    console.log('good now:', newValue)
  }

  const handleNeutralClick = () => {
    const newValue = neutral + 1
    setNeutral(newValue)
    console.log('neutral now: ', newValue)
  }

  const handleBadClick = () => {
    const newValue = bad + 1
    setBad(newValue)
    console.log('bad now: ', newValue)
  }

  const totalVotes = () => good + neutral + bad
  const average = () => {
    const total = totalVotes()
    return total === 0 ? 0 : (good - bad ) / total
  }
  const percentagePositive = () => (good/totalVotes()) * 100

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const mostVotedIndex = votes.indexOf(Math.max(...votes))
  const highestVoteCount = votes[mostVotedIndex]

  const handleRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelectedAnecdote(randomIndex);
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selectedAnecdote] += 1
    setVotes(newVotes)
    console.log('voted for: ', anecdotes[selectedAnecdote])
  }

  const notes = [
    {
      id: 1,
      content: 'HTML is easy',
      important: true
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false
    },
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      important: true
    }
  ]


  return (
      <body>
      <div className='feedback'>
        <Header name='Give Feedback'/>
        <Button onClick={handleGoodClick} text='Good'/>
        <Button onClick={handleNeutralClick} text='Neutral'/>
        <Button onClick={handleBadClick} text='Bad'/>
      </div>

      <div className='stats-wrapper'>
        <Header name='Stats'/>
        <Statistics good={good}
                    neutral={neutral}
                    bad={bad}
                    totalVotes={totalVotes}
                    average={average}
                    percentagePositive={percentagePositive}/>
      </div>
      <div>
        <Header name='Anecdote of the Day' />
        <p>{anecdotes[selectedAnecdote]}</p>
        <Button onClick={handleRandomAnecdote}
                text='Give me a new Anecdote' />
        <Button onClick={handleVote}
                text='Vote 4 anecdote' />
        <p>Anecdote with most votes: {highestVoteCount}</p>
        <p>{anecdotes[mostVotedIndex]}</p>
      </div>
      <div>
        <ul>
          {notes.map(note =>
            <Note key={note.id} note={note} />
          )}
        </ul>
      </div>
      </body>
  )
}

export default App
