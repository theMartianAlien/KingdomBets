import { useNavigate } from 'react-router-dom';
import { Form, Link } from "react-router-dom";

import classes from './NewPlayerForm.module.css';

function PlayerForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form className={classes.form} method="post">
      <p>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" required />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export default PlayerForm;
