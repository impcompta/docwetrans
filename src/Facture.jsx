
import oups from "../src/assets/oups.png";
import { useNavigate } from "react-router";

export default function Facture(){
    const navigate = useNavigate();

    const retourner =()=>{
        navigate(-1)
    }

    return(
        <div className='facture'>
            <div className="img">
            <img src={oups} alt="oups" />
            </div>
            <h2>
                Oups, votre facture n'est plus disponible
            </h2>
            <h3> Vérifiez que vous avez bien saisi l'adresse destinée et que le mot de passe correspondant est correct.</h3>
            <span style={{fontStyle:'italic', fontSize:'12px', marginTop:'2vw'}}>Le cas échéant, nous notifierons le destinataire</span>

            <div className="btn">
                <button onClick={retourner}>Revenir</button>
            </div>
        </div>
    )
}