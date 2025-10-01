"use client"

import * as React from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

interface DemoAlertProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
}

export function DemoAlert({ isOpen, onClose, title, description }: DemoAlertProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function useDemoAlert() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")

  const showAlert = React.useCallback((alertTitle: string, alertDescription: string) => {
    setTitle(alertTitle)
    setDescription(alertDescription)
    setIsOpen(true)
  }, [])

  const DemoAlertComponent = React.useCallback(() => (
    <DemoAlert
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={title}
      description={description}
    />
  ), [isOpen, title, description])

  return { showAlert, DemoAlertComponent }
}