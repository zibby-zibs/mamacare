"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This would typically come from an API or database
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    lga: "Ife North",
    State: "Osun",
    EDD: "2023-12-31",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    lga: "Ife East",

    State: "Osun",
    EDD: "2023-12-31",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1122334455",
    lga: "Ife North",
    State: "Osun",
    EDD: "2023-12-31",
  },
];

export default function UserDetailPage() {
  const params = useParams();
  const userId = parseInt(params.id as string);
  const user = users.find((u) => u.id === userId);

  const [message, setMessage] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically be an API call to your backend
    console.log(`Sending message to ${user?.name}: ${message}`);
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Message sent successfully!");
    setMessage("");
  };

  if (!user) {
    return (
      <div className="h-svh w-full flex items-start justify-center">
        User not found
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto py-10 px-5 lg:px-12">
      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>LGA:</strong> {user.lga}
          </p>
          <p>
            <strong>STATE:</strong> {user.State}
          </p>
          <p>
            <strong>Expected Delivery Date:</strong> {user.EDD}
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Send Text Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <Textarea
              placeholder="Type your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button type="submit">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
