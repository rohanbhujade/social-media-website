import React, { useState, useRef, useEffect } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import dp from '../assets/dp.webp'
import { useNavigate } from 'react-router-dom'
import { IoIosImages } from 'react-icons/io'
import { SendHorizonal, X } from 'lucide-react'
import axios from 'axios'
import { serverUrl } from '../App'
import { setMessages } from '../redux/messageSlice'
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'

const MessageArea = () => {
  const { selectedUser, messages } = useSelector(state => state.message)
  const { userData } = useSelector(state => state.user)
  const { socket } = useSelector(state => state.socket)

  const [input, setInput] = useState('')
  const imageinput = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const [sending, setSending] = useState(false)

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
    }
  }

  const clearImage = () => {
    setBackendImage(null)
    setFrontendImage(null)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() && !backendImage) return
    try {
      setSending(true)
      const formData = new FormData()
      formData.append('message', input)
      if (backendImage) formData.append('image', backendImage)
      const result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      )
      dispatch(setMessages([...messages, result.data]))
      setInput('')
      setBackendImage(null)
      setFrontendImage(null)
    } catch (error) {
      console.log(error)
    } finally {
      setSending(false)
    }
  }

  const getAllMessages = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/message/getAll/${selectedUser._id}`,
        { withCredentials: true }
      )
      dispatch(setMessages(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getAllMessages() }, [])

  useEffect(() => {
    socket?.on('newMessage', (mess) => {
      dispatch(setMessages([...messages, mess]))
    })
    return () => socket?.off('newMessage')
  }, [messages])

  return (
    <div className="w-full h-[100vh] flex flex-col" style={{ background: '#0a0b0f' }}>

      {/* Header */}
      <div
        className="flex items-center gap-[14px] px-[16px] py-[12px] fixed top-0 z-[100] w-full"
        style={{
          background: 'rgba(10,11,15,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="w-[36px] h-[36px] flex items-center justify-center rounded-full transition-all cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <MdOutlineKeyboardBackspace className="text-white w-[18px] h-[18px]" />
        </button>

        <div
          className="w-[42px] h-[42px] rounded-full overflow-hidden cursor-pointer flex-shrink-0"
          style={{ border: '2px solid rgba(168,85,247,0.4)' }}
          onClick={() => navigate(`/profile/${selectedUser.userName}`)}
        >
          <img src={selectedUser.profileImage || dp} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-white text-[15px] font-[600] truncate">{selectedUser?.userName}</div>
          <div className="text-[12px] truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {selectedUser?.name}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-[20px] pt-[80px] pb-[100px]"
        style={{
          background: 'linear-gradient(180deg, #0a0b0f 0%, #0d0e14 100%)',
          scrollbarWidth: 'none',
        }}
      >
        <style>{`div::-webkit-scrollbar{display:none}`}</style>
        {messages && messages.map((mess) => (
          mess?.sender === userData?._id
            ? <SenderMessage key={mess._id || mess.createdAt} message={mess} />
            : <ReceiverMessage key={mess._id || mess.createdAt} message={mess} />
        ))}
      </div>

      {/* Input bar */}
      <div
        className="fixed bottom-0 w-full px-[16px] py-[12px] z-[100]"
        style={{
          background: 'rgba(10,11,15,0.9)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Image preview */}
        {frontendImage && (
          <div className="mb-[10px] flex justify-end">
            <div className="relative w-[80px] h-[80px] rounded-[14px] overflow-hidden">
              <img src={frontendImage} alt="" className="w-full h-full object-cover" />
              <button
                onClick={clearImage}
                className="absolute top-[4px] right-[4px] w-[20px] h-[20px] rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.7)' }}
              >
                <X className="w-[11px] h-[11px] text-white" />
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-[10px]"
        >
          <div
            className="flex-1 flex items-center gap-[8px] px-[16px] rounded-[24px]"
            style={{
              background: '#1c1f26',
              border: '1px solid rgba(255,255,255,0.08)',
              minHeight: '48px',
            }}
          >
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Message..."
              className="flex-1 bg-transparent text-[15px] text-white outline-none placeholder-gray-600 py-[12px]"
            />
            <input
              type="file"
              accept="image/*"
              ref={imageinput}
              hidden
              onChange={handleImage}
            />
            <button
              type="button"
              onClick={() => imageinput.current.click()}
              className="flex-shrink-0 p-[6px] rounded-full transition-all"
              style={{ color: frontendImage ? '#a855f7' : 'rgba(255,255,255,0.3)' }}
            >
              <IoIosImages className="w-[22px] h-[22px]" />
            </button>
          </div>

          {(input.trim() || frontendImage) && (
            <button
              type="submit"
              disabled={sending}
              className="w-[48px] h-[48px] rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-95 cursor-pointer"
              style={{
                background: sending
                  ? 'rgba(168,85,247,0.4)'
                  : 'linear-gradient(135deg, #a855f7, #ec4899)',
                boxShadow: '0 4px 20px rgba(168,85,247,0.4)',
              }}
            >
              <SendHorizonal className="w-[20px] h-[20px] text-white" />
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default MessageArea