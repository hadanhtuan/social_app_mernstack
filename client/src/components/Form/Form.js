import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
import FileBase from "react-file-base64";

import { createPost, editPost } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import ChipInput from 'material-ui-chip-input';

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentPost = useSelector((state) =>
    currentId ? state.posts.listPost.find((post) => post._id === currentId) : null
  );

  const user = JSON.parse(localStorage.getItem('profile'))
  
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    creator_name: user?.result?.name,
    tags: [],
    selectedFile: "",
  });

  useEffect(() => {
    if(currentPost)
        setPostData(currentPost)
        console.log(currentPost)
  }, [currentPost])

 

  const handleSubmit = (e) => {
    e.preventDefault();
      if (!currentId) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(editPost(postData, currentId));
      clear();
    }
  };

  const handleAddChip = (chip) => {
    setPostData({ ...postData, tags: [...postData.tags, chip] });
  }

  const handleDeleteChip = (chip) => {
    setPostData({ ...postData, tags: postData.tags.filter(tag => tag != chip) });
    console.log(postData)

  }

  const clear = (e) => {
    setCurrentId(0);
    console.log(postData)
    setPostData({ creator: '', title: '', message: '', tags: [], selectedFile: '' });
  };

  if(!user?.result) {
    return (
      <Paper className={classes.paper} elevation={6}>
      <Typography variant="h6" align="center">
        Please Sign In to create your own memories and like other's memories.
      </Typography>
    </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant="h6">{currentId ? `Editing "${currentPost?.title}"` : 'Creating a Memory'}</Typography>
      <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
      <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
      <div style={{ padding: '5px 0', width: '94%' }}>
        <ChipInput
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip) => handleDeleteChip(chip)}
        />
      </div>
      <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
      <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
      <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
    </form>
  </Paper>
  );
};

export default Form;
