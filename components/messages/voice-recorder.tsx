"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, Square, Play, Pause, Send, X } from "lucide-react"

interface VoiceRecorderProps {
  onSend: (audioBlob: Blob) => void
  onCancel: () => void
}

export function VoiceRecorder({ onSend, onCancel }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [waveform, setWaveform] = useState<number[]>([])

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    startRecording()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" })
        setAudioBlob(blob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)

      // Start duration timer
      intervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 1)
        // Simulate waveform data
        setWaveform((prev) => [...prev.slice(-20), Math.random() * 100])
      }, 100)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      onCancel()
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }

  const playRecording = () => {
    if (audioBlob && !isPlaying) {
      const audio = new Audio(URL.createObjectURL(audioBlob))
      audioRef.current = audio
      audio.play()
      setIsPlaying(true)
      audio.onended = () => setIsPlaying(false)
    } else if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSend = () => {
    if (audioBlob) {
      onSend(audioBlob)
    }
  }

  return (
    <div className="bg-muted rounded-full px-4 py-2 flex items-center gap-3">
      {/* Record/Stop Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={isRecording ? stopRecording : startRecording}
        className={`h-8 w-8 rounded-full ${isRecording ? "bg-destructive text-destructive-foreground" : ""}`}
      >
        {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>

      {/* Waveform Visualization */}
      <div className="flex-1 flex items-center gap-1 h-8">
        {waveform.map((height, index) => (
          <div
            key={index}
            className="w-1 bg-primary rounded-full transition-all duration-100"
            style={{ height: `${Math.max(2, height / 5)}px` }}
          />
        ))}
      </div>

      {/* Duration */}
      <span className="text-sm text-muted-foreground min-w-[40px]">{formatDuration(duration / 10)}</span>

      {/* Play Button (when not recording) */}
      {!isRecording && audioBlob && (
        <Button variant="ghost" size="icon" onClick={playRecording} className="h-8 w-8">
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      )}

      {/* Send Button */}
      {!isRecording && audioBlob && (
        <Button onClick={handleSend} size="icon" className="h-8 w-8 rounded-full">
          <Send className="h-4 w-4" />
        </Button>
      )}

      {/* Cancel Button */}
      <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
