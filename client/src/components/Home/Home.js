import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  //  useLocation().search =  ?page=1
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();

  const [currentId, setCurrentId] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const query = useQuery();
  const page = query.get('page') || 1;    //page
  const searchQuery = query.get('searchText');   //searchText
  console.log(searchQuery)
  
  const handleSearchPost = () => {
    if (searchText.trim() || tags) {
      dispatch(getPostsBySearch({ searchText, tags: tags.join(',') }));
      history.push(`/posts/search?searchText=${searchText || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) { //enter
      handleSearchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={handleSearchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (    //nếu không searh thì mới phân trang
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />  {/* gọi action getPosts, component Posts dùng useSelector để lấy state.posts */}
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;