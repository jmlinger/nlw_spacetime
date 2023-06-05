'use client'
// Indica que o js de todo o arquivo deve ser exportado para o browser.

import { ChangeEvent, useState } from 'react'

// Aqui estamos encapsulando o elemento dinâmico a fim mandar somente seu js para o browser.

interface IPreview {
  url: string
  type: string
}

export default function MediaPicker() {
  const [preview, setPreview] = useState<IPreview | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return null
    }

    const previewURL = URL.createObjectURL(files[0])
    const fileType = files[0].type.split('/')[0]

    setPreview({ url: previewURL, type: fileType })
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*, video/*"
        className="invisible h-0 w-0"
      />
      {preview?.type === 'image' ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview?.url}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      ) : (
        <video
          src={preview?.url}
          // poster="../icon.png"
          controls={true}
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
