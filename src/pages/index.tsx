import AnimatedListItem from "@/components/AnimatedListItem";
import { MessageData, generateMessage } from "@/utils/MessageGenerator";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const EmailComponent = () => {
  const [messages, setMessages] = useState<MessageData[]>([])
  const [selectedMessages, setSelectedMessages] = useState<string[]>([])

  const handleAddMessage = () => {
    const newMessage = generateMessage();

    setMessages((prev) => ([...prev, newMessage]))
  }

  const handleToggleMessage = (id: string) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages((prev) => {
        return prev.filter((i) => i != id);
      });
    } else {
      setSelectedMessages((prev) => {
        return [...prev, id];
      });
    }
  }

  const handleArchiveMessages = () => {
    setMessages((prev) =>
      prev.filter((message) => !selectedMessages.includes(message.id))
    );
    setSelectedMessages([]);
  };

  return (
    <div className="bg-white rounded-xl ">
      <div className="flex justify-between w-full border-b-zinc-100 border-b-[1px] p-4">
        <button
          className="text-zinc-400 px-2 py-1 hover:text-zinc-500 -mx-2"
          onClick={handleAddMessage}
        >
          Add
        </button>
        <button
          className="text-zinc-400 px-2 py-1 hover:text-zinc-500 -mx-2"
          onClick={handleArchiveMessages}
        >
          Archive
        </button>
      </div>
      <div className="max-h-[400px] px-3 py-2 overflow-y-scroll">
        <ul>
          <AnimatePresence>
            {messages.length == 0 && (
              <li>
                <h1 className="text-center font-semibold py-4">You have no messages.</h1>
              </li>
            )}
            {[...messages].reverse().map((message) => (
              <AnimatedListItem key={message.id}>
                <div className="py-0.5 transition">
                  <button className={`flex flex-col w-full p-4 rounded-md transition-colors ${selectedMessages.includes(message.id) ? "bg-blue-400" : "bg-white"}`} onClick={() => handleToggleMessage(message.id)}>
                    <p className={`font-medium transition-colors ${selectedMessages.includes(message.id) ? 'text-white' : 'text-zinc-600'}`}>{message.content[0]}</p>
                    <span className={`text-sm transition-colors ${selectedMessages.includes(message.id) ? "text-zinc-100" : "text-zinc-400"}`} >{message.content[1]}</span>
                  </button>
                </div>
              </AnimatedListItem>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}

export default function Home() {
  return <main className="flex items-center justify-center min-h-screen bg-zinc-300">
    <div className="h-[400px] w-full max-w-lg">
      <EmailComponent />
    </div>
  </main>;


}
