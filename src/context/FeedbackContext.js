import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from 'react'
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData)
  const [editFeedback, setEditFeedback] = useState({ item: {}, edit: false })

  /**
   * Add feedback
   */
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  /**
   * Edit feedback
   */
  const feedbackEdit = (item) => {
    setEditFeedback({ item, edit: true })
  }

  /**
   * Update feedback
   */
  const updateFeedback = (id, updateItem) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updateItem,
            }
          : item
      )
    )
  }

  /**
   * Delete feedback
   */
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback, //states
        editFeedback,
        deleteFeedback, //functions
        addFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
