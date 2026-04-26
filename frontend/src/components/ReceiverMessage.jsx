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

const ReceiverMessage = ({ message }) => {
  const { selectedUser } = useSelector(state => state.message)
  const scroll = useRef()

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message.message, message.image])

  return (
    <div ref={scroll} className="flex flex-col items-start gap-[4px] mb-[36px]">
      {/* Bubble */}
      <div className="relative max-w-[65%] min-w-[60px]">
        <div
          className="rounded-[20px] rounded-bl-[4px] overflow-hidden"
          style={{
            background: '#1c1f26',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
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
          className="absolute bottom-0 left-[-7px]"
          width="12" height="12" viewBox="0 0 12 12"
        >
          <path d="M12 12 Q6 12 0 0 L12 0 Z" fill="#1c1f26" />
        </svg>
      </div>

      {/* Meta row — avatar + datetime */}
      <div className="flex items-center gap-[8px] pl-[10px]">
        <div
          className="w-[26px] h-[26px] rounded-full overflow-hidden flex-shrink-0"
          style={{ border: '2px solid rgba(255,255,255,0.1)' }}
        >
          <img
            src={selectedUser?.profileImage || dp}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {formatDateTime(message.createdAt)}
        </span>
      </div>
    </div>
  )
}

export default ReceiverMessage