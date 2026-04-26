import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchData } from '../redux/userSlice'
import dp from '../assets/dp.webp'

const Search = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [focused, setFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { searchData } = useSelector(state => state.user)

  const handleSearch = async () => {
    if (!input.trim()){ 
        dispatch(setSearchData([]))
        return}
    setLoading(true)
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/search?keyword=${input}`,
        { withCredentials: true }
      )
      dispatch(setSearchData(result.data))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => { handleSearch() }, 400)
    return () => clearTimeout(delay)
  }, [input])

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#0a0b0f' }}>
      <style>{`
        .s-scroll::-webkit-scrollbar { display: none; }
        .s-scroll { scrollbar-width: none; }
        .search-inp::placeholder { color: rgba(255,255,255,0.2); }
        .search-inp:focus { outline: none; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .fade-up { animation: fadeUp 0.25s ease forwards; opacity: 0; }
        .spinner {
          width: 16px; height: 16px;
          border: 1.5px solid rgba(168,85,247,0.2);
          border-top-color: #a855f7;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        .user-row { transition: background 0.15s ease; cursor: pointer; }
        .user-row:hover { background: rgba(255,255,255,0.04) !important; }
      `}</style>

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '16px 24px',
        background: 'rgba(10,11,15,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <MdOutlineKeyboardBackspace style={{ color: 'rgba(255,255,255,0.7)', width: 17, height: 17 }} />
        </button>
        <span style={{ color: 'white', fontSize: 18, fontWeight: 700, letterSpacing: '-0.4px' }}>
          Search
        </span>
      </div>

      <div className="s-scroll" style={{ overflowY: 'auto' }}>

        {/* Search input */}
        <div style={{ padding: '28px 24px 16px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '0 16px', height: 52, borderRadius: 16,
            background: 'rgba(255,255,255,0.04)',
            border: focused
              ? '1px solid rgba(168,85,247,0.45)'
              : '1px solid rgba(255,255,255,0.07)',
            boxShadow: focused ? '0 0 0 3px rgba(168,85,247,0.08)' : 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}>
            {loading
              ? <div className="spinner" />
              : <FiSearch style={{
                  width: 17, height: 17, flexShrink: 0,
                  color: focused ? '#a855f7' : 'rgba(255,255,255,0.25)',
                  transition: 'color 0.2s',
                }} />
            }
            <input
              type="text"
              placeholder="Search by username or name..."
              className="search-inp"
              value={input}
              onChange={e => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                flex: 1, height: '100%',
                background: 'transparent',
                border: 'none', color: 'white', fontSize: 15,
              }}
            />
            {input && (
              <button
                onClick={() => { setInput(''); dispatch(setSearchData([])) }}
                style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', flexShrink: 0,
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 1l6 6M7 1L1 7" stroke="rgba(255,255,255,0.7)" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Idle state */}
        {!input && (
          <div className="fade-up" style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', paddingTop: 80, gap: 10,
          }}>
            <FiSearch style={{ width: 32, height: 32, color: 'rgba(255,255,255,0.08)' }} />
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14, marginTop: 4 }}>
              Search for people to connect with
            </p>
          </div>
        )}

        {/* No results */}
        {input && !loading && searchData?.length === 0 && (
          <div className="fade-up" style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', paddingTop: 80, gap: 8,
          }}>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>
              No results for{' '}
              <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                "{input}"
              </span>
            </p>
          </div>
        )}

        {/* Results */}
        {input && searchData?.length > 0 && (
          <div style={{ padding: '8px 16px 60px' }}>

            <p style={{
              fontSize: 11, fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.18)',
              padding: '0 8px 10px',
            }}>
              {searchData.length} result{searchData.length !== 1 ? 's' : ''}
            </p>

            {searchData?.map((user, index) => (
              <div
                key={user._id}
                className="user-row fade-up"
                onClick={() => navigate(`/profile/${user.userName}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 13,
                  padding: '11px 12px', borderRadius: 14,
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 46, height: 46, borderRadius: '50%',
                  overflow: 'hidden', flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <img
                    src={user.profileImage || dp}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 15, fontWeight: 600, color: 'white',
                    letterSpacing: '-0.1px',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {user.userName}
                  </div>
                  <div style={{
                    fontSize: 12, color: 'rgba(255,255,255,0.35)',
                    marginTop: 2,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {user.name}
                  </div>
                </div>

                {/* Arrow */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M6 12l4-4-4-4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search