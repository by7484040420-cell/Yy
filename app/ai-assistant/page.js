import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import AIChat from "@/components/AIChat";

export const metadata = { title: "Bipin AI Assistant" };

export default function AIAssistantPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        <h1 className="font-display font-bold text-xl mb-4">Bipin AI Assistant</h1>
        <AIChat />
      </main>
      <BottomNav />
    </>
  );
}
