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
    <div className="flex justify-center mt-10">
      <br></br>
      <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-blue-500">
          <tr>
            <th scope="col" class="px-6 py-3">
              Id
            </th>
            <th scope="col" class="px-6 py-3">
              Subject
            </th>
            <th scope="col" class="px-6 py-3">
              Last Name
            </th>
            <th scope="col" class="px-6 py-3">
              First Name
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Message
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contacts) => (
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {contacts.id}
              </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {contacts.subject}
              </th>
              <td class="px-6 py-4">{contacts.lastname}</td>
              <td class="px-6 py-4">{contacts.firstname}</td>
              <td class="px-6 py-4">{contacts.email}</td>
              <td class="px-6 py-4">{contacts.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
