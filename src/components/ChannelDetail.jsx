import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [ChannelDetail, setChannelDetail] = useState(null)
  const [videos, setvideos] = useState([])

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&id&order=date`)
      .then((data) => setvideos(data?.items));
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'radial-gradient(circle, rgba(149,63,251,1) 0%, rgba(252,70,70,1) 100%)',
          zIndex: 10,
          height: '300px'
        }}
        />
          <ChannelCard channelDetail={ChannelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '100px' }}} />
          <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail
