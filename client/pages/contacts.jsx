export default function Contacts() {
    return (
        <main className="flex">
            <div className="w-1/2">
                <h2 className="mt-10 max-w-md mx-auto">Contacts</h2>
                <br></br>
                <p className="mt-4 max-w-md mx-auto">Abdallah Kadir Abdallah <a href="abdallahkadir222@gmail.com">abdallahkadir222@gmail.com</a></p>
                <p className="mt-4 max-w-md mx-auto">Ryan Bagot <a href="bagot.ryan26@gmail.com">bagot.ryan26@gmail.com</a></p>
                <p className="mt-4 max-w-md mx-auto">Hamed Bamba <a href="medyybamba@gmail.com">medyybamba@gmail.com</a></p>
                <p className="mt-4 max-w-md mx-auto">Taryll Mohamed <a href="taryll.mohamed78250@gmail.com">taryll.mohamed78250@gmail.com</a></p>
                <p className="mt-4 max-w-md mx-auto">Gregoire Petiet <a href="gregoire.petiet@edu.ece.fr">gregoire.petiet@edu.ece.fr</a></p>
            </div>
            <form className="mt-10 max-w-md mx-auto w-1/2">
                <div className="mb-4">
                    <label htmlFor="subject" className="block ml-20 mr-5">Sujet du mail</label>
                    <input className="border py-2 px-4 w-full rounded-md" type="text" name="subject" id="subject" placeholder="Quel est le sujet du message?" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block ml-20 mr-5">Votre email</label>
                    <input className="border py-2 px-4 w-full rounded-md" type="text" name="email" id="email" placeholder="Quel est votre email?" />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block ml-20 mr-5">Votre message</label>
                    <textarea rows={5} className="border py-2 px-4 w-full rounded-md" name="message" id="message" placeholder="Quelles sont vos suggestions ou retours ?"></textarea>
                </div>
                <div className="mb-4 flex justify-center">
                    <input type="submit" value="Envoyer" className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg cursor-pointer hover:bg-blue-700" />
                </div>
            </form>
        </main>
    );
}