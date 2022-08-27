import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../Posts/Post/Post';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';

const CreateOrTags = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { listPost, isLoading } = useSelector((state) => state.posts);
  const { par } = useParams()

  useEffect(() => {
    if(location.pathname.startsWith('/tags'))
      dispatch(getPostsBySearch({tags: par}))
    else
      dispatch(getPostsByCreator(par)) //id
  }, [])

  return (
    <div>
    <Typography variant="h2">#{par}</Typography>
    <Divider style={{ margin: '20px 0 50px 0' }} />
    {isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {listPost?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )}
  </div>
  )
}

export default CreateOrTags














