'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

interface Question {
  id: number
  title: string
  locked: boolean
}

export default function AdminPage() {
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    // Fetch questions
    const fetchQuestions = async () => {
      const response = await fetch('/api/admin/questions')
      if (response.ok) {
        const data = await response.json()
        setQuestions(data)
      }
    }
    fetchQuestions()
  }, [])

  const handleLockToggle = async (questionId: number) => {
    const response = await fetch(`/api/admin/questions/${questionId}/toggle-lock`, {
      method: 'POST',
    })

    if (response.ok) {
      setQuestions(questions.map(q => 
        q.id === questionId ? { ...q, locked: !q.locked } : q
      ))
    } else {
      alert('Failed to toggle lock')
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>
      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="flex items-center justify-between p-4 border rounded">
            <span>{question.title}</span>
            <Button onClick={() => handleLockToggle(question.id)}>
              {question.locked ? 'Unlock' : 'Lock'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

