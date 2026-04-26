import React from 'react'
import { useSelector } from 'react-redux'
import dp from '../assets/dp.webp'
import { useNavigate } from 'react-router-dom'
import FollowButton from './FollowButton'

const OtherUser = ({ user }) => {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()

  const isFollowing = userData?.following?.some(f => f._id === user._id)

  return (
    <div
      className="w-full flex items-center justify-between px-[4px] py-[10px] rounded-[14px] group"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        transition: 'background 0.18s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {/* Left: avatar + info */}
      <div
        className="flex items-center gap-[12px] cursor-pointer flex-1 min-w-0"
        onClick={() => navigate(`/profile/${user.userName}`)}
      >
        <div
          className="w-[48px] h-[48px] rounded-full overflow-hidden flex-shrink-0"
          style={{ border: '2px solid rgba(255,255,255,0.08)' }}
        >
          <img src={user.profileImage || dp} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="min-w-0">
          <div
            className="text-white text-[15px] font-[600] truncate"
            style={{ letterSpacing: '-0.1px' }}
          >
            {user.userName}
          </div>
          <div className="text-[12px] truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {user.name}
          </div>
        </div>
      </div>

      {/* Follow button */}
      <FollowButton
        targetUserID={user._id}
        tailwind=""
        style={{
          padding: '6px 18px',
          height: '34px',
          borderRadius: '999px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          flexShrink: 0,
          marginLeft: '12px',
          transition: 'all 0.18s ease',
          background: isFollowing
            ? 'transparent'
            : 'linear-gradient(135deg, #a855f7, #ec4899)',
          color: '#fff',
          border: isFollowing
            ? '1px solid rgba(255,255,255,0.15)'
            : 'none',
          boxShadow: isFollowing
            ? 'none'
            : '0 4px 14px rgba(168,85,247,0.35)',
        }}
      />
    </div>
  )
}

export default OtherUser