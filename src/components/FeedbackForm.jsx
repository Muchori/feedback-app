import { useContext, useState, useEffect } from 'react'

import FeedbackContext from '../context/FeedbackContext'
import RatingSelect from './RatingSelect'
import Button from './shared/Button'
import Card from './shared/Card'

function FeedbackForm() {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const { addFeedback, editFeedback, updateFeedback } =
    useContext(FeedbackContext)

  useEffect(() => {
    if (editFeedback.edit === true) {
      setBtnDisabled(false)
      setText(editFeedback.item.text)
      setRating(editFeedback.item.rating)
    }
  }, [editFeedback])

  const handleTextChange = (e) => {
    if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setBtnDisabled(false)
      setMessage(null)
    }
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      }
      if (editFeedback.edit === true) {
        updateFeedback(editFeedback.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }
      setText('')
    }

    e.preventDefault()
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
