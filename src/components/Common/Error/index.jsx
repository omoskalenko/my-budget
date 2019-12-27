import React from 'react'

export default function Error({
  error
}) {
  return (
    <div>
      Ошибка рендера компонента
      {' '}
      {error.message}
    </div>
  )
}
