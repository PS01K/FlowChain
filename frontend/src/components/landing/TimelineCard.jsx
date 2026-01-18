export function TimelineCard({ title, desc, icon }) {
  return (
    <div
      className="inline-block max-w-md rounded-3xl p-7
      bg-white/50 dark:bg-slate-900/50
      backdrop-blur-xl
      border border-white/30 dark:border-slate-700/40
      shadow-xl shadow-indigo-500/10"
    >
      <div className="text-3xl mb-4">{icon}</div>

      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h4>

      <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
