import React, { useEffect } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NotificationCard from '../components/NotificationCard'
import axios from 'axios'
import { serverUrl } from '../App'
import { setNotificationData } from '../redux/userSlice'

const Notifications = () => {
  const navigate = useNavigate()
  const { notificationData } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const fetchNotifications = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getAllNotifications`,
        { withCredentials: true }
      )
      dispatch(setNotificationData(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  const markAsRead = async () => {
    try {
      const ids = notificationData.map(n => n._id)
      await axios.post(
        `${serverUrl}/api/user/markAsRead`,
        { notificationId: ids },
        { withCredentials: true }
      )
      await fetchNotifications()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    markAsRead()
  }, [])

  const unreadCount = notificationData?.filter(n => !n.isRead).length

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#0a0b0f' }}>
      <style>{`
        .n-scroll::-webkit-scrollbar { display: none; }
        .n-scroll { scrollbar-width: none; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .noti-item { animation: fadeUp 0.25s ease forwards; opacity: 0; }
      `}</style>

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '16px 20px',
        background: 'rgba(10,11,15,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <button
  onClick={() => navigate('/')}
  className="lg:hidden w-[36px] h-[36px] rounded-full border border-white/10 bg-transparent flex items-center justify-center cursor-pointer flex-shrink-0"
>
  <MdOutlineKeyboardBackspace style={{ color: 'rgba(255,255,255,0.7)', width: 17, height: 17 }} />
</button>

        <span style={{ color: 'white', fontSize: 18, fontWeight: 700, letterSpacing: '-0.4px', flex: 1 }}>
          Notifications
        </span>

        {/* Unread badge */}
        {unreadCount > 0 && (
          <div style={{
            padding: '3px 10px', borderRadius: 999,
            background: 'rgba(168,85,247,0.15)',
            border: '1px solid rgba(168,85,247,0.25)',
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#c084fc' }}>
              {unreadCount} new
            </span>
          </div>
        )}
      </div>

      {/* List */}
      <div
        className="n-scroll"
        style={{ overflowY: 'auto', padding: '12px 14px 60px', display: 'flex', flexDirection: 'column', gap: 6 }}
      >
        {/* Empty state */}
        {notificationData?.length === 0 && (
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', paddingTop: 100, gap: 10,
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>
              No notifications yet
            </p>
          </div>
        )}

        {/* Section labels */}
        {notificationData?.length > 0 && (() => {
          const today = []
          const earlier = []
          const now = new Date()

          notificationData.forEach(n => {
            const d = new Date(n.createdAt)
            if (d.toDateString() === now.toDateString()) today.push(n)
            else earlier.push(n)
          })

          return (
            <>
              {today.length > 0 && (
                <>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', padding: '4px 6px 8px' }}>
                    Today
                  </p>
                  {today.map((noti, i) => (
                    <div key={noti._id} className="noti-item" style={{ animationDelay: `${i * 0.05}s` }}>
                      <NotificationCard noti={noti} />
                    </div>
                  ))}
                </>
              )}

              {earlier.length > 0 && (
                <>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', padding: '14px 6px 8px' }}>
                    Earlier
                  </p>
                  {earlier.map((noti, i) => (
                    <div key={noti._id} className="noti-item" style={{ animationDelay: `${(today.length + i) * 0.05}s` }}>
                      <NotificationCard noti={noti} />
                    </div>
                  ))}
                </>
              )}
            </>
          )
        })()}
      </div>
    </div>
  )
}

export default Notifications