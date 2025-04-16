import Input from "./UI/Input";
import './NewBets.module.css';
import { useActionState } from "react";
import { Form, Link } from "react-router-dom";

export default function NewBet({ bet, players }) {

    function onChangeSelectHandler(id, event) {
        console.log(id);
    }

    function formSubmit(prevState, formData) {
        const title = formData.get('title');
        const link = formData.get('link');
        const betStatus = formData.get('bet-status');
        const teamA = formData.getAll('teamA');
        const teamB = formData.getAll('teamB');
        const text = formData.get('text');
console.log(teamA);
console.log(teamB);
        let errors = [];

        if (title.trim().length < 10) {
            errors.push("Please add more meaningful title");
        }

        if (link.trim().length < 10) {
            errors.push("I need the bet link!");
        }

        if (teamA.trim().length < 0) {
            errors.push("I need the participants in team A");
        }

        if (teamB.trim().length < 0) {
            errors.push("I need the participants in team B");
        }

        if (text.trim().length < 10) {
            errors.push("I need the contents of the bet");
        }

        const newBet = {
            betId: '',
            title,
            link,
            players: {
                teamA,
                teamB
            },
            status: !betStatus ? 'On going' : 'Solved',
            text
        }

        if (errors.length > 0) {
            return {
                errors,
                enteredValues: {
                    betId: '',
                    title,
                    link,
                    players: {
                        teamA,
                        teamB
                    },
                    status: !betStatus ? 'On going' : 'Solved',
                    text

                }
            }
        }

        console.log(newBet);

    }

    const [formState, formAction] = useActionState(formSubmit, {
        errors: null,
        enteredValues: { ...bet }
    });

    function betStatusOnChangeHandler() {

    }

    return (
        <>
            <Form action={formAction} method="post">
                <div>
                    <Input label="Title of Bet" id="title" name="title" defaultValue={formState.enteredValues?.title} />
                    {formState.enteredValues?.status ??
                        (<div>
                            <label htmlFor="bet-status">Bet Status</label>
                            <select
                                id="bet-status"
                                name="bet-status"
                                defaultValue="ongoing">
                                <option value="ongoing">On going</option>
                                <option value="done">Void</option>
                                <option value="complete">Complete</option>
                            </select>
                        </div>)
                    }
                    <div>
                        <p>
                            <span>Participants A</span>
                            <select
                                name="teamA"
                                id="teamA"
                                multiple={true}
                                className='multi-select'
                                defaultValue={formState.enteredValues?.players.teamA}
                                onChange={() => onChangeSelectHandler("teamA")}>
                                {players.map(player => (
                                    <option
                                        key={player.id}
                                        value={player.id}>
                                        {player.name}
                                    </option>
                                ))}
                            </select>
                        </p>
                        <p>
                            <span>Participants B</span>
                            <select name="teamB" id="teamB"
                                multiple={true}
                                className='multi-select'
                                defaultValue={formState.enteredValues?.players.teamA}
                                onChange={() => onChangeSelectHandler("teamA")}>
                                {players.map(player => (
                                    <option
                                        key={player.id}
                                        value={player.id}>
                                        {player.name}
                                    </option>
                                ))}
                            </select>
                        </p>
                    </div>
                    <Input label="Bet Link" id="link" name="link" defaultValue={formState.enteredValues?.link} />
                    <Input label="Bet content" id="text" name="text" textarea defaultValue={formState.enteredValues?.text} />
                </div>
                {formState.errors && (
                    <ul className="errors">
                        {formState.errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
                <p className="form-actions">
                    {/* <button type="reset" className="button button-flat">
                        Reset
                    </button> */}
                    <button className="button">Save Bet</button>
                    <Link to=".." relative="path">Back</Link>
                </p>
            </Form>
        </>
    );
}