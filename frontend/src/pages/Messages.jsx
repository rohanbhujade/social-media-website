import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import OnlineUsers from '../components/onlineUsers'
import dp from '../assets/dp.webp'
import { setSelectedUser } from '../redux/messageSlice'

const Messages = () => {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)
  const { onlineUsers } = useSelector(state => state.socket)
  const { prevChatUsers } = useSelector(state => state.message)
  const dispatch = useDispatch()

  const onlineFollowing = userData?.following?.filter(u => onlineUsers?.includes(u._id)) || []

  return (
    <div
      className="w-full min-h-[100vh] flex flex-col"
      style={{ background: '#0a0b0f' }}
    >
      <style>{`
        .msg-scroll::-webkit-scrollbar { display: none; }
        .msg-scroll { scrollbar-width: none; }
        .chat-row { transition: background 0.18s ease; }
        .chat-row:hover { background: rgba(255,255,255,0.04); }
        .online-pill { animation: pulseRing 2s ease-in-out infinite; }
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(168,85,247,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(168,85,247,0); }
        }
      `}</style>

      {/* Header */}
      <div
        className="flex items-center gap-[14px] px-[20px] py-[16px] sticky top-0 z-10"
        style={{
          background: 'rgba(10,11,15,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="lg:hidden w-[36px] h-[36px] flex items-center justify-center rounded-full flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <MdOutlineKeyboardBackspace className="text-white w-[18px] h-[18px]" />
        </button>
        <h1 className="text-white text-[20px]" style={{ fontWeight: 700, letterSpacing: '-0.3px' }}>
          Messages
        </h1>
      </div>

      {/* Online now strip */}
      {onlineFollowing.length > 0 && (
        <div className="px-[20px] pt-[20px] pb-[4px]">
          <p className="text-[11px] font-[600] uppercase tracking-[1.5px] mb-[14px]"
            style={{ color: 'rgba(255,255,255,0.25)' }}>
            Active Now
          </p>
          <div className="flex gap-[20px] overflow-x-auto pb-[16px] msg-scroll">
            {onlineFollowing.map((user) => (
              <div
                key={user._id}
                className="flex flex-col items-center gap-[8px] flex-shrink-0 cursor-pointer"
                onClick={() => { dispatch(setSelectedUser(user)); navigate('/messageArea') }}
              >
                <div className="relative">
                  <div
                    className="w-[54px] h-[54px] rounded-full overflow-hidden online-pill"
                    style={{ border: '2px solid #a855f7' }}
                  >
                    <img src={user.profileImage || dp} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span
                    className="absolute bottom-[1px] right-[1px] w-[13px] h-[13px] rounded-full"
                    style={{
                      background: '#22c55e',
                      border: '2px solid #0a0b0f',
                    }}
                  />
                </div>
                <span className="text-[11px] text-white font-[500] max-w-[54px] truncate text-center">
                  {user.userName}
                </span>
              </div>
            ))}
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0 8px' }} />
        </div>
      )}

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto msg-scroll px-[12px] pt-[8px]">
        {prevChatUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-[80px] gap-[12px]">
            <div
              className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
              style={{ background: 'rgba(168,85,247,0.1)' }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.3)' }}>No conversations yet</p>
          </div>
        )}

        {prevChatUsers.map((user) => {
          const isOnline = onlineUsers?.includes(user._id)
          return (
            <div
              key={user._id}
              className="chat-row flex items-center gap-[14px] px-[10px] py-[12px] rounded-[16px] cursor-pointer"
              onClick={() => { dispatch(setSelectedUser(user)); navigate('/messageArea') }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-[52px] h-[52px] rounded-full overflow-hidden"
                  style={{
                    border: isOnline ? '2px solid #a855f7' : '2px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <img src={user.profileImage || dp} alt="" className="w-full h-full object-cover" />
                </div>
                {isOnline && (
                  <span
                    className="absolute bottom-[1px] right-[1px] w-[13px] h-[13px] rounded-full"
                    style={{ background: '#22c55e', border: '2px solid #0a0b0f' }}
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-white text-[15px] font-[600] truncate">{user.userName}</div>
                {isOnline ? (
                  <div className="text-[12px] font-[500]" style={{ color: '#a855f7' }}>Active now</div>
                ) : (
                  <div className="text-[12px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{user.name}</div>
                )}
              </div>

              {/* Chevron */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M9 18l6-6-6-6" stroke="rgba(255,255,255,0.2)" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Messages