export default function Home() {
  return (
    <main className="min-h-screen p-8 pb-20 sm:p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          Pompidou
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The Holy Grail of Autonomous AI Development
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">The Five Phases</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">1. Spec It</h3>
              <p className="text-gray-600">Define what to build, surface blockers upfront</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">2. Task It</h3>
              <p className="text-gray-600">Break specs into dependency-aware tasks</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold">3. Build It</h3>
              <p className="text-gray-600">Execute with multi-agent coordination</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold">4. Verify It</h3>
              <p className="text-gray-600">Full CI validation before merge</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold">5. Learn It</h3>
              <p className="text-gray-600">Capture session learnings into documentation</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">About This Catalogue</h2>
          <p className="text-gray-700 mb-4">
            This site presents 80+ evaluated tools for building autonomous AI development systems.
            Each tool has been assessed across multiple dimensions including integration complexity,
            ecosystem maturity, and fit within the Holy Grail framework.
          </p>
          <p className="text-gray-700">
            Navigate to the catalogue to explore tools by phase, category, or search for specific capabilities.
          </p>
        </section>
      </div>
    </main>
  );
}
