export default function Contacts() {
    return (
        <main>
            <h2>Contacts</h2>
            <br></br>
            <p>Abdallah Kadir Abdallah <a href="abdallahkadir222@gmail.com">abdallahkadir222@gmail.com</a></p>
            <p>Ryan Bagot <a href="bagot.ryan26@gmail.com">bagot.ryan26@gmail.com</a></p>
            <p>Hamed Bamba <a href="medyybamba@gmail.com">medyybamba@gmail.com</a></p>
            <p>Taryll Mohamed <a href="taryll.mohamed78250@gmail.com">taryll.mohamed78250@gmail.com</a></p>
            <p>Gregoire Petiet <a href="gregoire.petiet@edu.ece.fr">gregoire.petiet@edu.ece.fr</a></p>
            
            <form className="mt-5">
                <div className="mb-4">
                    <label className="mr-5" htmlFor="subject"> Sujet du mail</label>
                    <input className= "border" type="text" name="subject" id="subject" placeholder="Quel est le sujet du mail? "></input>
                </div>
                <div className="mb-4">
                    <label className="mr-5" htmlFor="email"> Votre email</label>
                    <input className= "border" type="text" name="email" id="email" placeholder="Quel est votre email? "></input>
                </div>
                <div className="mb-4">
                    <label className="mr-5" htmlFor="message"> Votre message </label>
                    <textarea rows={5} className= "border" name="message" id="message" placeholder="Quel est votre messafe?  "></textarea>
                </div>
                <div className="mb-4">
                    <input type="submit" className="block bg-[#085D22] text-[white] py-2 px-2 hover:bg-[#4E6EDD] hover:text-[black]"></input>
                </div>
            </form>
        </main>
    );
}