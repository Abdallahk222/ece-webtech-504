import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Contact({ id }) {
  const supabaseClient = useSupabaseClient();
  const [contact, setContact] = useState([]);

  useEffect(() => {
    async function fetchContact() {
      const { data: contact, error } = await supabaseClient
        .from("contacts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.log("error", error);
      else setContact(contact);
    }
    fetchContact();
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
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {contact.id}
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {contact.subject}
            </th>
            <td class="px-6 py-4">{contact.lastname}</td>
            <td class="px-6 py-4">{contact.firstname}</td>
            <td class="px-6 py-4">{contact.email}</td>
            <td class="px-6 py-4">{contact.message}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  return {
    props: {
      id,
    },
  };
};
