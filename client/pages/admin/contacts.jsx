import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Contacts() {
  const supabaseClient = useSupabaseClient();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      const { data: contacts, error } = await supabaseClient
        .from("contacts")
        .select("*");
      if (error) console.log("error", error);
      else setContacts(contacts);
    }
    fetchContacts();
  }, []);

  return (
    <div className="flex justify-center text-center mt-20 relative overflow-x-auto shadow-md sm:rounded-lg w-3/4 mx-auto">
    <table className="w-full text-sm text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-white dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Subject
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Message
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {contact.id}
              </td>
              <td className="px-6 py-4">{contact.subject}</td>
              <td className="px-6 py-4">{contact.lastname}</td>
              <td className="px-6 py-4">{contact.firstname}</td>
              <td className="px-6 py-4">{contact.email}</td>
              <td className="px-6 py-4">{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
