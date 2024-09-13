import { useState } from 'react';
import classes from './NewPost.module.css';

function NewPost({onCansel, onAddPost}) {

  const [enteredBody, setEnteredBody] = useState('');
    const [enteredAuthor, setEnteredAuthor] = useState('');

    function changeBodyHeader(event){
        setEnteredBody(event.target.value);
    }
    function changeAuthorHeader(event){
        setEnteredAuthor(event.target.value);
    }

    function submitHandler(event){
      event.preventDefault();
      const postData = {
        body: enteredBody,
        author: enteredAuthor
      }
      onAddPost(postData);
      onCansel();
    }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={ changeBodyHeader} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={ changeAuthorHeader}/>
      </p>
      <p className={classes.actions}>
        <button type='button' onClick={onCansel}>Cansel</button>
        <button >Submit</button>
      </p>
    </form>
  );
}

export default NewPost;