import Navbar from "@/components/Shared/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="root-container">
      <Navbar />
      <div className="mx-auto max-w-7xl">
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
}
