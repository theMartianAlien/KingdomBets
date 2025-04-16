import { redirect } from 'react-router-dom';
import NewPlayerForm from '../../components/players/NewPlayerForm';

function NewPlayerPage() {
    return (
        <NewPlayerForm />        
    )
}

export default NewPlayerPage;

export async function action({ request, params }) {
    const data = await request.formData();
    const name = data.get('name');
    const playerData = {
        name
    }

    const response = await fetch('http://localhost:3000/players/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playerData)
    });

    if (!response.ok) {

    }

    const resData = await response.json();
    console.log(resData);
    return redirect('/players');
}