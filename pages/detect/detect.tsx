import React, { useState, useCallback } from 'react'
import { IconButton, MicIcon, StopCircleOutlinedIcon } from '../../components'
import { detectApi, mockRequest } from '../../api'
import { StartAudioRecording, MapDetectResponse } from '../../utils'
import styles from './detect.module.scss'

const CN = 'detect-container'

export const Detect: React.FunctionComponent = () => {
  const [inProgress, setInProgress] = useState(false)
  const [url, setUrl] = useState('')

  const handleStartAudioRecording = useCallback(() => {
    setInProgress(true)
    StartAudioRecording()
  }, [])

  const handleStopAudioRecording = useCallback(async () => {
    try {
      setInProgress(false)
      // TODO: implement audio conversion
      // const audioBlob = await StopAudioRecording() as unknown as Blob
      // if (!!audioBlob) {
      //   detectApi(audioBlob)
      // }
      const data = await detectApi(mockRequest)
      if (data) {
        const url = MapDetectResponse(data)
        console.log('url::::', url)
        setUrl(url)
      }
    } catch (error) {
      throw error
    }
  }, []);

  return (
    <div>
      {inProgress ? (
        <IconButton containerclass={styles[CN]} onClick={handleStopAudioRecording}>
          <StopCircleOutlinedIcon fontSize='large' />
        </IconButton>
      ) : (
        <IconButton containerclass={styles[CN]} onClick={handleStartAudioRecording}>
          <MicIcon fontSize='large' />
        </IconButton>
      )}
    </div>
  )
}
