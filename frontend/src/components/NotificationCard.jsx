import React from 'react'
import dp from '../assets/dp.webp'

const NotificationCard = ({ noti }) => {
  const isUnread = !noti.isRead

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 12, padding: '12px 14px', borderRadius: 18,
      background: isUnread ? 'rgba(168,85,247,0.06)' : 'rgba(255,255,255,0.03)',
      border: isUnread ? '1px solid rgba(168,85,247,0.15)' : '1px solid rgba(255,255,255,0.06)',
      transition: 'background 0.15s',
    }}>

      {/* Left — avatar + text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>

        {/* Avatar */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 46, height: 46, borderRadius: '50%', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <img
              src={noti.sender?.profileImage || dp}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Unread dot */}
          {isUnread && (
            <span style={{
              position: 'absolute', bottom: 1, right: 1,
              width: 10, height: 10, borderRadius: '50%',
              background: '#a855f7', border: '2px solid #0a0b0f',
            }} />
          )}
        </div>

        {/* Text */}
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'white', flexShrink: 0 }}>
              {noti.sender?.userName}
            </span>
            <span style={{
              fontSize: 13, color: 'rgba(255,255,255,0.45)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {noti.message}
            </span>
          </div>
          {noti.createdAt && (
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', marginTop: 3, display: 'block' }}>
              {new Date(noti.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </div>

      {/* Right — media thumbnail */}
      {(noti.loop || noti.post) && (
        <div style={{
          width: 44, height: 44, borderRadius: 10, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)', flexShrink: 0,
          background: 'rgba(255,255,255,0.04)',
        }}>
          {noti.loop ? (
            <video src={noti.loop?.media} muted preload='none' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : noti.post?.mediaType === 'image' ? (
            <img src={noti.post?.media} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : noti.post ? (
            <video src={noti.post?.media} muted preload='none' loop style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : null}
        </div>
      )}
    </div>
  )
}

export default NotificationCard