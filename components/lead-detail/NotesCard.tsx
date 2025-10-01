'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Clock } from 'lucide-react'
import type { Note } from '@/types'

interface NotesCardProps {
  notes: Note[]
  onAddNote: (note: { title: string; content: string }) => void
}

export function NotesCard({ notes, onAddNote }: NotesCardProps) {
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newNote.title.trim() && newNote.content.trim()) {
      onAddNote(newNote)
      setNewNote({ title: '', content: '' })
      setIsAddingNote(false)
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Notes</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
              {notes.length}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAddingNote(true)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Note Form */}
        {isAddingNote && (
          <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded-lg bg-muted/50">
            <div>
              <Label htmlFor="note-title">Title</Label>
              <Input
                id="note-title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                placeholder="Note title..."
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="note-content">Content</Label>
              <Textarea
                id="note-content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                placeholder="Note content..."
                className="mt-1"
                rows={3}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="sm" className="bg-[#0a8126] hover:bg-[#0a8126]/90">
                Add Note
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsAddingNote(false)
                  setNewNote({ title: '', content: '' })
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* Notes List */}
        <div className="space-y-3">
          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No notes yet. Click the + button to add one.
            </p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{note.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatTimestamp(note.timestamp)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{note.content}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}