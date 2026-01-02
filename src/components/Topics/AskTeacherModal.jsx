import { X, Upload, Image as ImageIcon, Loader, AlertCircle, Trash2, ZoomIn } from 'lucide-react'
import { useState, useRef } from 'react'

export default function AskTeacherModal({ isOpen, onClose, currentTopic, onSubmit }) {
  const [message, setMessage] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const fileInputRef = useRef(null)

  if (!isOpen) return null

  const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB absolute max
  const TARGET_FILE_SIZE = 2 * 1024 * 1024 // 2MB ideal
  const MAX_DIMENSION = 1600

  const compressImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          // Resize if needed
          if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
            if (width > height) {
              height = (height / width) * MAX_DIMENSION
              width = MAX_DIMENSION
            } else {
              width = (width / height) * MAX_DIMENSION
              height = MAX_DIMENSION
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)

          // Try WebP first (better compression)
          canvas.toBlob(
            (blob) => {
              if (blob && blob.size <= TARGET_FILE_SIZE) {
                resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' }))
              } else {
                // Fallback to JPEG with quality adjustment
                let quality = 0.8
                const tryCompress = () => {
                  canvas.toBlob(
                    (jpegBlob) => {
                      if (jpegBlob && jpegBlob.size <= TARGET_FILE_SIZE) {
                        resolve(new File([jpegBlob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }))
                      } else if (quality > 0.5) {
                        quality -= 0.1
                        tryCompress()
                      } else {
                        resolve(new File([jpegBlob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }))
                      }
                    },
                    'image/jpeg',
                    quality
                  )
                }
                tryCompress()
              }
            },
            'image/webp',
            0.85
          )
        }
        img.onerror = reject
        img.src = e.target.result
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Yalnız şəkil faylları yükləyə bilərsiniz (JPG, PNG, WebP)')
      return
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError('Şəkil çox böyükdür. Maksimum 3MB olmalıdır.')
      return
    }

    try {
      let processedFile = file

      // Compress if needed
      if (file.size > TARGET_FILE_SIZE) {
        setIsCompressing(true)
        setError('Şəkil böyükdür, avtomatik sıxılır...')
        processedFile = await compressImage(file)
        setIsCompressing(false)
        setError(null)
      }

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setImageFile(processedFile)
      }
      reader.readAsDataURL(processedFile)
    } catch (err) {
      setIsCompressing(false)
      setError('Şəkil emal edilərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.')
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!message.trim()) {
      setError('Zəhmət olmasa mesaj yazın')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
      
      const questionData = {
        id: Date.now(),
        topic: currentTopic,
        message: message,
        image: imageFile ? URL.createObjectURL(imageFile) : null,
        date: new Date(),
        status: 'pending',
        replies: []
      }

      onSubmit?.(questionData)
      
      // Reset and close
      setTimeout(() => {
        setMessage('')
        setImageFile(null)
        setImagePreview(null)
        setIsUploading(false)
        setUploadProgress(0)
        setError(null)
        onClose()
      }, 500)
    }, 1500)
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-5 rounded-t-3xl flex items-center justify-between z-10">
            <div>
              <h2 className="text-xl font-black text-white">Müəllimə sual ver</h2>
              <p className="text-sm text-white/80">Sualınızı yazın, tezliklə cavablandırılacaq</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Topic (read-only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mövzu</label>
              <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium">
                {currentTopic?.code} - {currentTopic?.title}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mesajınız
                <span className="text-gray-400 font-normal ml-2">({message.length}/500)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                placeholder="Sualınızı ətraflı yazın..."
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
              />
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Şəkil əlavə et <span className="text-gray-400 font-normal">(opsional)</span>
              </label>
              
              {!imagePreview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 hover:bg-primary-500/5 transition-all cursor-pointer"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Şəkil yükləmək üçün klikləyin
                  </p>
                  <p className="text-xs text-gray-500">
                    JPG, PNG, WebP (maksimum 3MB)
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Preview */}
                  <div className="relative bg-gray-900 rounded-xl overflow-hidden" style={{ maxHeight: '420px' }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                      style={{ maxHeight: '420px' }}
                    />
                    {isCompressing && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Loader className="w-8 h-8 animate-spin mx-auto mb-2" />
                          <p className="text-sm font-medium">Sıxılır...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* File info */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <ImageIcon className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{imageFile?.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(imageFile?.size || 0)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      title="Şəkli sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className={`flex items-start gap-3 p-4 rounded-xl ${
                isCompressing ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'
              }`}>
                {isCompressing ? (
                  <Loader className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <p className={`text-sm font-medium ${isCompressing ? 'text-blue-800' : 'text-red-800'}`}>
                  {error}
                </p>
              </div>
            )}

            {/* Upload progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">Göndərilir...</span>
                  <span className="text-gray-500">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-primary-700 h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isUploading}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ləğv et
              </button>
              <button
                type="submit"
                disabled={isUploading || !message.trim() || isCompressing}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Göndərilir...' : 'Göndər'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
