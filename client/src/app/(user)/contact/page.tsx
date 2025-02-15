"use client"
import { useEffect, useState } from "react";

const ContactsPage = () => {
    const [contacts, setContacts] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/contacts", {
                    method: "GET",
                    credentials: "include", 
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch contacts");
                }
                const data = await response.json();
                console.log(data.contacts);
                setContacts(data.contacts); setContacts(Array.isArray(data.contacts) ? data.contacts : []); // Ensure it's an array
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="w-full flex flex-col items-center mt-20 mb-20 px-4">
            <h1 className="text-4xl font-extrabold text-center mb-6">My Contacts</h1>
            
            {loading && <p className="text-lg text-gray-500">Loading...</p>}
            {error && <p className="text-lg text-red-500">Error: {error}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {contacts.map((contact, index) => (
                    <div 
                        key={index} 
                        className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 transition-transform transform hover:scale-105"
                    >
                        <p className="text-lg font-medium text-gray-800">{contact}</p>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default ContactsPage;