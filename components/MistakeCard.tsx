type Props = {
  number: number;
  ukrainian: string;
  wrong: string;
  correct: string;
  tip: string;
};

export default function MistakeCard({
  number,
  ukrainian,
  wrong,
  correct,
  tip,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 hover:shadow-xl transition">

      <div className="flex items-center gap-3 mb-4">

        <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold">
          {number}
        </div>

        <h3 className="font-bold text-slate-800">
          {ukrainian}
        </h3>

      </div>

      <p className="text-red-600 mb-2">
        ❌ {wrong}
      </p>

      <p className="text-green-600 font-semibold">
        ✅ {correct}
      </p>

      <div className="mt-5 rounded-xl bg-slate-100 p-4 text-sm text-slate-600">
        💡 {tip}
      </div>

    </div>
  );
}
