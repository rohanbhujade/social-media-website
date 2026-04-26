import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import dp from '../assets/dp.webp'

const formatDateTime = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  const isYesterday = date.toDateString() === yesterday.toDateString()

  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  if (isToday) return time
  if (isYesterday) return `Yesterday · ${time}`
  return `${date.toLocaleDateString([], { day: 'numeric', month: 'short' })} · ${time}`
}

const SenderMessage = ({ message }) => {
  const { userData } = useSelector(state => state.user)
  const scroll = useRef()

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message.message, message.image])

  return (
    <div ref={scroll} className="flex flex-col items-end gap-[4px] mb-[36px]">
      {/* Bubble */}
      <div className="relative max-w-[65%] min-w-[60px]">
        <div
          className="rounded-[20px] rounded-br-[4px] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            boxShadow: '0 4px 24px rgba(168,85,247,0.35)',
          }}
        >
          {message.image && (
            <img
              src={message.image}
              alt=""
              className="w-full max-h-[260px] object-cover"
              style={{ display: 'block' }}
            />
          )}
          {message.message && (
            <div className="px-[16px] py-[10px] text-[15px] text-white leading-[1.55] break-words">
              {message.message}
            </div>
          )}
        </div>

        {/* Tail */}
        <svg
          className="absolute bottom-0 right-[-7px]"
          width="12" height="12" viewBox="0 0 12 12"
          style={{ filter: 'drop-shadow(0 2px 6px rgba(168,85,247,0.25))' }}
        >
          <path d="M0 12 Q6 12 12 0 L0 0 Z" fill="url(#sg)" />
          <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Meta row — avatar + datetime */}
      <div className="flex items-center gap-[8px] pr-[10px]">
        <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {formatDateTime(message.createdAt)}
        </span>
        <div
          className="w-[26px] h-[26px] rounded-full overflow-hidden flex-shrink-0"
          style={{ border: '2px solid rgba(168,85,247,0.5)' }}
        >
          <img
            src={userData?.profileImage || dp}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default SenderMessage