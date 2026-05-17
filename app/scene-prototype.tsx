"use client";

import { useMemo, useState } from "react";

type Tone = {
  label: string;
  value: number;
};

type Choice = {
  id: string;
  text: string;
  reading: string;
  gloss: string;
  status: "best" | "possible" | "awkward";
  instinct: string;
  weird?: string;
  tones: Tone[];
};

type Scene = {
  id: string;
  place: string;
  mood: string;
  relationship: string;
  title: string;
  narration: string;
  speaker: string;
  lineBefore: string;
  lineAfter: string;
  prompt: string;
  intuition: string;
  choices: Choice[];
};

const scenes: Scene[] = [
  {
    id: "after-rain",
    place: "Kichijoji, early evening",
    mood: "quiet, relieved, a little nostalgic",
    relationship: "close friends after a long walk",
    title: "After the Rain",
    narration:
      "The rain stopped just as you reached the overlook. Streetlights begin to appear one by one beneath the damp spring air.",
    speaker: "Mina",
    lineBefore: "わあ、すごいね。この",
    lineAfter: "、ずっと見ていたくなる。",
    prompt: "Which word feels most natural in this soft, immediate reaction?",
    intuition: "personal immediacy vs distant description",
    choices: [
      {
        id: "keshiki",
        text: "景色",
        reading: "けしき",
        gloss: "view, scenery",
        status: "best",
        instinct:
          "景色 feels close to the speaker's eyes and body. It is the view right here, being felt in the moment, so it carries warmth without sounding dramatic.",
        tones: [
          { label: "Natural", value: 5 },
          { label: "Personal", value: 5 },
          { label: "Poetic", value: 2 },
          { label: "Formal", value: 1 },
        ],
      },
      {
        id: "fuukei",
        text: "風景",
        reading: "ふうけい",
        gloss: "landscape, scene",
        status: "possible",
        instinct:
          "風景 is not wrong, but it steps back from the moment. It sounds more like a described landscape, a memory, or a framed scene in narration.",
        weird:
          "In casual speech here, it can feel slightly composed, as if Mina is already turning the moment into prose.",
        tones: [
          { label: "Natural", value: 3 },
          { label: "Personal", value: 2 },
          { label: "Poetic", value: 4 },
          { label: "Formal", value: 2 },
        ],
      },
      {
        id: "koukei",
        text: "光景",
        reading: "こうけい",
        gloss: "sight, spectacle",
        status: "awkward",
        instinct:
          "光景 often points to a striking sight or a scene where something is happening. It fits a dramatic moment more than a quiet city view.",
        weird:
          "It makes the sentence sound like Mina witnessed an event, not simply a beautiful view.",
        tones: [
          { label: "Natural", value: 2 },
          { label: "Personal", value: 2 },
          { label: "Poetic", value: 3 },
          { label: "Formal", value: 3 },
        ],
      },
      {
        id: "keikan",
        text: "景観",
        reading: "けいかん",
        gloss: "landscape appearance",
        status: "awkward",
        instinct:
          "景観 belongs to public design, architecture, tourism, and city planning. It looks at scenery as an object to evaluate.",
        weird:
          "Here it sounds like Mina is making a planning report from the overlook.",
        tones: [
          { label: "Natural", value: 1 },
          { label: "Personal", value: 1 },
          { label: "Poetic", value: 1 },
          { label: "Formal", value: 5 },
        ],
      },
    ],
  },
  {
    id: "train-text",
    place: "Chuo Line, one stop before home",
    mood: "concerned, gentle, trying not to pressure",
    relationship: "friend texting after a hard day",
    title: "A Message Left Open",
    narration:
      "Your friend saw you leave the cafe quieter than usual. A message appears while the train rocks through the dark windows.",
    speaker: "Ren",
    lineBefore: "今日、ちょっと元気なさそうだったけど、",
    lineAfter: "？無理しないでね。",
    prompt: "What sounds like a natural, caring check-in?",
    intuition: "soft concern vs tough reassurance",
    choices: [
      {
        id: "daijoubu",
        text: "大丈夫",
        reading: "だいじょうぶ",
        gloss: "okay, all right",
        status: "best",
        instinct:
          "大丈夫？ is the natural soft check-in. It leaves room for the other person to answer honestly and does not assume they should be fine.",
        tones: [
          { label: "Natural", value: 5 },
          { label: "Soft", value: 4 },
          { label: "Casual", value: 4 },
          { label: "Blunt", value: 1 },
        ],
      },
      {
        id: "heiki",
        text: "平気",
        reading: "へいき",
        gloss: "fine, unaffected",
        status: "possible",
        instinct:
          "平気？ can work between close friends, but it has a slightly tougher feeling, like asking whether someone can handle it.",
        weird:
          "Because Ren is worried, 平気？ may sound a little less tender than 大丈夫？",
        tones: [
          { label: "Natural", value: 3 },
          { label: "Soft", value: 2 },
          { label: "Casual", value: 5 },
          { label: "Blunt", value: 3 },
        ],
      },
      {
        id: "genki",
        text: "元気",
        reading: "げんき",
        gloss: "energetic, well",
        status: "awkward",
        instinct:
          "元気？ asks whether someone is energetic or well in a broader sense. After saying they looked not-genki, repeating it feels a bit flat.",
        weird:
          "It becomes more like checking a condition than gently opening a door.",
        tones: [
          { label: "Natural", value: 2 },
          { label: "Soft", value: 2 },
          { label: "Casual", value: 4 },
          { label: "Blunt", value: 2 },
        ],
      },
      {
        id: "mondainai",
        text: "問題ない",
        reading: "もんだいない",
        gloss: "no problem",
        status: "awkward",
        instinct:
          "問題ない？ sounds like confirming whether there is an issue. It is practical, not emotionally tuned.",
        weird:
          "In this text, it feels workplace-like and emotionally distant.",
        tones: [
          { label: "Natural", value: 1 },
          { label: "Soft", value: 1 },
          { label: "Casual", value: 2 },
          { label: "Blunt", value: 4 },
        ],
      },
    ],
  },
  {
    id: "bookstore",
    place: "Jimbocho secondhand bookstore",
    mood: "slow, absorbed, privately delighted",
    relationship: "inner narration",
    title: "The Bookstore Window",
    narration:
      "You find an old poetry book near the window. Dust floats in the light, and for a while you forget the street outside.",
    speaker: "Narration",
    lineBefore: "窓辺の古い本を、しばらく",
    lineAfter: "いた。",
    prompt: "Which verb makes the action feel quietly absorbed?",
    intuition: "functional seeing vs lingering attention",
    choices: [
      {
        id: "nagameru",
        text: "眺めて",
        reading: "ながめて",
        gloss: "gazing at, looking over",
        status: "best",
        instinct:
          "眺める has duration and mood. The eyes rest on something, often with feeling, distance, or quiet absorption.",
        tones: [
          { label: "Natural", value: 5 },
          { label: "Soft", value: 4 },
          { label: "Poetic", value: 4 },
          { label: "Functional", value: 1 },
        ],
      },
      {
        id: "miru",
        text: "見て",
        reading: "みて",
        gloss: "looking at, seeing",
        status: "possible",
        instinct:
          "見る is completely normal, but it is broad. It tells us the action, not the atmosphere.",
        weird:
          "Because the scene is lingering and visual, 見て feels a little plain compared with 眺めて.",
        tones: [
          { label: "Natural", value: 4 },
          { label: "Soft", value: 2 },
          { label: "Poetic", value: 1 },
          { label: "Functional", value: 4 },
        ],
      },
      {
        id: "kansatsu",
        text: "観察して",
        reading: "かんさつして",
        gloss: "observing",
        status: "awkward",
        instinct:
          "観察する feels analytical. You observe a plant, a habit, a person, or a phenomenon to notice details.",
        weird:
          "It makes the narrator sound like they are studying the book instead of drifting into it.",
        tones: [
          { label: "Natural", value: 1 },
          { label: "Soft", value: 1 },
          { label: "Poetic", value: 1 },
          { label: "Functional", value: 5 },
        ],
      },
      {
        id: "haiken",
        text: "拝見して",
        reading: "はいけんして",
        gloss: "humbly looking at",
        status: "awkward",
        instinct:
          "拝見する is humble, polite language used toward someone else's things, work, or information.",
        weird:
          "In private narration it sounds stiff, as if the speaker is bowing to the book.",
        tones: [
          { label: "Natural", value: 1 },
          { label: "Soft", value: 2 },
          { label: "Poetic", value: 1 },
          { label: "Functional", value: 3 },
        ],
      },
    ],
  },
];

const statusText = {
  best: "Most natural",
  possible: "Possible, but shifted",
  awkward: "Grammatically possible, emotionally off",
};

const statusClass = {
  best: "border-[#5b8d76] bg-[#eef6f1] text-[#23473b]",
  possible: "border-[#d2a24f] bg-[#fff6e6] text-[#67440e]",
  awkward: "border-[#c98278] bg-[#fff0ee] text-[#6c2f29]",
};

export default function ScenePrototype() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState<Record<string, string>>({});

  const scene = scenes[sceneIndex];
  const selected = scene.choices.find((choice) => choice.id === selectedId);
  const completedCount = Object.keys(answered).length;
  const bestChoice = scene.choices.find((choice) => choice.status === "best");

  const instinctProfile = useMemo(() => {
    const selectedChoices = scenes
      .map((item) => item.choices.find((choice) => choice.id === answered[item.id]))
      .filter(Boolean) as Choice[];

    const tooFormal = selectedChoices.filter((choice) =>
      choice.tones.some((tone) => tone.label === "Formal" && tone.value >= 4),
    ).length;
    const tooFunctional = selectedChoices.filter((choice) =>
      choice.tones.some((tone) => tone.label === "Functional" && tone.value >= 4),
    ).length;
    const best = selectedChoices.filter((choice) => choice.status === "best").length;

    if (!selectedChoices.length) {
      return "Your intuition profile will appear as you move through scenes.";
    }

    if (best === selectedChoices.length) {
      return "You are choosing words that fit the emotional temperature of the scene.";
    }

    if (tooFormal > 0) {
      return "You may be reaching for precise words that sound a little formal in intimate moments.";
    }

    if (tooFunctional > 0) {
      return "You may be choosing words that describe the action but miss the atmosphere.";
    }

    return "You are noticing meaning, and the next step is tuning social distance and softness.";
  }, [answered]);

  function choose(choice: Choice) {
    setSelectedId(choice.id);
    setAnswered((current) => ({ ...current, [scene.id]: choice.id }));
  }

  function goToScene(nextIndex: number) {
    setSceneIndex(nextIndex);
    setSelectedId(answered[scenes[nextIndex].id] ?? null);
  }

  function reset() {
    setAnswered({});
    setSelectedId(null);
    setSceneIndex(0);
  }

  return (
    <main className="min-h-screen bg-[#f7f1e8] text-[#27221d]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ded2c0] pb-4">
          <div>
            <p className="text-sm font-medium text-[#8f5d3f]">言葉の温度</p>
            <h1 className="text-2xl font-semibold sm:text-3xl">Kotoba no Ondo</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#665c50]">
            <span>{completedCount} / {scenes.length} scenes</span>
            <button
              className="h-10 rounded-md border border-[#c9b9a2] px-4 font-medium transition hover:bg-[#efe4d4]"
              onClick={reset}
              type="button"
            >
              Reset
            </button>
          </div>
        </header>

        <section className="grid flex-1 gap-5 py-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex min-h-[640px] flex-col overflow-hidden rounded-lg border border-[#d8c9b5] bg-[#fffaf2] shadow-[0_22px_70px_rgba(85,62,38,0.13)]">
            <div className="relative min-h-[260px] overflow-hidden bg-[#d8d8ca]">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,#d7e3df_0%,#f1d7bd_56%,#8e7966_57%,#594b43_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-[linear-gradient(90deg,#3f544d,#6d675a,#4f453f)] opacity-80" />
              <div className="absolute bottom-12 left-[10%] h-32 w-24 rounded-t-md bg-[#55483f] shadow-2xl">
                <div className="grid grid-cols-3 gap-2 p-3">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <span key={index} className="h-3 rounded-sm bg-[#f6d58d]" />
                  ))}
                </div>
              </div>
              <div className="absolute bottom-10 left-[36%] h-44 w-32 rounded-t-md bg-[#6a5a4f] shadow-2xl">
                <div className="grid grid-cols-4 gap-2 p-3">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <span key={index} className="h-3 rounded-sm bg-[#f3c982]" />
                  ))}
                </div>
              </div>
              <div className="absolute bottom-8 right-[12%] h-36 w-28 rounded-t-md bg-[#4d5d5c] shadow-2xl">
                <div className="grid grid-cols-3 gap-2 p-3">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <span key={index} className="h-3 rounded-sm bg-[#f1dba7]" />
                  ))}
                </div>
              </div>
              <div className="absolute left-6 top-6 rounded-md bg-[#fffaf2]/82 px-4 py-3 backdrop-blur">
                <p className="text-sm font-semibold text-[#3f5148]">{scene.place}</p>
                <p className="text-xs text-[#665c50]">{scene.mood}</p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-5 p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-[#8f5d3f]">{scene.relationship}</p>
                  <h2 className="mt-1 text-3xl font-semibold">{scene.title}</h2>
                </div>
                <span className="rounded-md border border-[#d8c9b5] px-3 py-2 text-sm text-[#665c50]">
                  Theme: {scene.intuition}
                </span>
              </div>

              <p className="max-w-3xl text-base leading-7 text-[#554d44]">{scene.narration}</p>

              <div className="rounded-lg border border-[#d8c9b5] bg-[#f8efe2] p-5">
                <p className="mb-3 text-sm font-semibold text-[#8f5d3f]">{scene.speaker}</p>
                <p className="text-2xl leading-10 text-[#27221d]">
                  {scene.lineBefore}
                  <span className="mx-2 inline-flex min-h-11 min-w-28 items-center justify-center rounded-md border border-dashed border-[#a98968] bg-[#fffaf2] px-4 text-xl text-[#8f5d3f]">
                    {selected?.text ?? "_____"}
                  </span>
                  {scene.lineAfter}
                </p>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-[#554d44]">{scene.prompt}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {scene.choices.map((choice) => {
                    const isSelected = selectedId === choice.id;
                    return (
                      <button
                        className={`min-h-24 rounded-lg border p-4 text-left transition ${
                          isSelected
                            ? "border-[#8f5d3f] bg-[#f1dfcc] shadow-[0_10px_24px_rgba(85,62,38,0.14)]"
                            : "border-[#d8c9b5] bg-[#fffaf2] hover:border-[#a98968] hover:bg-[#fbf1e5]"
                        }`}
                        key={choice.id}
                        onClick={() => choose(choice)}
                        type="button"
                      >
                        <span className="block text-2xl font-semibold">{choice.text}</span>
                        <span className="mt-1 block text-sm text-[#665c50]">
                          {choice.reading} · {choice.gloss}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-5">
            <div className="rounded-lg border border-[#d8c9b5] bg-[#fffaf2] p-5 shadow-[0_18px_55px_rgba(85,62,38,0.1)]">
              <p className="text-sm font-semibold text-[#8f5d3f]">Nuance reveal</p>
              {selected ? (
                <div className="mt-4">
                  <span className={`inline-flex rounded-md border px-3 py-2 text-sm font-semibold ${statusClass[selected.status]}`}>
                    {statusText[selected.status]}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold">{selected.text}</h3>
                  <p className="mt-3 leading-7 text-[#554d44]">{selected.instinct}</p>
                  {selected.weird ? (
                    <div className="mt-4 border-l-4 border-[#c98278] bg-[#fff0ee] p-4">
                      <p className="text-sm font-semibold text-[#6c2f29]">Why this sounds weird</p>
                      <p className="mt-2 leading-6 text-[#6c2f29]">{selected.weird}</p>
                    </div>
                  ) : (
                    <div className="mt-4 border-l-4 border-[#5b8d76] bg-[#eef6f1] p-4">
                      <p className="text-sm font-semibold text-[#23473b]">Native speaker instinct</p>
                      <p className="mt-2 leading-6 text-[#23473b]">
                        This choice matches the relationship, emotional softness, and point of view in the scene.
                      </p>
                    </div>
                  )}

                  <div className="mt-5 space-y-3">
                    {selected.tones.map((tone) => (
                      <div key={tone.label}>
                        <div className="mb-1 flex justify-between text-sm text-[#665c50]">
                          <span>{tone.label}</span>
                          <span>{tone.value}/5</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-[#eadfcc]">
                          <div
                            className="h-full rounded-full bg-[#8f5d3f]"
                            style={{ width: `${tone.value * 20}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-8 min-h-80 rounded-lg border border-dashed border-[#d8c9b5] bg-[#fbf3e8] p-6 text-[#665c50]">
                  Choose the word that feels most natural. The explanation will focus on tone, emotional posture, and what would sound instinctive to a native speaker.
                </div>
              )}
            </div>

            <div className="rounded-lg border border-[#d8c9b5] bg-[#fffaf2] p-5">
              <p className="text-sm font-semibold text-[#8f5d3f]">Intuition profile</p>
              <p className="mt-3 leading-7 text-[#554d44]">{instinctProfile}</p>
            </div>

            <div className="rounded-lg border border-[#d8c9b5] bg-[#fffaf2] p-5">
              <p className="text-sm font-semibold text-[#8f5d3f]">Episode path</p>
              <div className="mt-4 grid gap-2">
                {scenes.map((item, index) => {
                  const answerId = answered[item.id];
                  const answer = item.choices.find((choice) => choice.id === answerId);
                  return (
                    <button
                      className={`rounded-md border p-3 text-left transition ${
                        index === sceneIndex
                          ? "border-[#8f5d3f] bg-[#f1dfcc]"
                          : "border-[#d8c9b5] hover:bg-[#fbf1e5]"
                      }`}
                      key={item.id}
                      onClick={() => goToScene(index)}
                      type="button"
                    >
                      <span className="block font-semibold">{item.title}</span>
                      <span className="mt-1 block text-sm text-[#665c50]">
                        {answer ? `${statusText[answer.status]}: ${answer.text}` : "Not answered yet"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="h-12 flex-1 rounded-md border border-[#c9b9a2] font-semibold transition hover:bg-[#efe4d4]"
                disabled={sceneIndex === 0}
                onClick={() => goToScene(Math.max(0, sceneIndex - 1))}
                type="button"
              >
                Previous
              </button>
              <button
                className="h-12 flex-1 rounded-md bg-[#3f5148] font-semibold text-[#fffaf2] transition hover:bg-[#314139] disabled:bg-[#b8aa98]"
                disabled={!selected || sceneIndex === scenes.length - 1}
                onClick={() => goToScene(Math.min(scenes.length - 1, sceneIndex + 1))}
                type="button"
              >
                Next scene
              </button>
            </div>

            {selected && bestChoice && selected.status !== "best" ? (
              <p className="rounded-lg border border-[#d8c9b5] bg-[#fbf3e8] p-4 text-sm leading-6 text-[#665c50]">
                Most natural here: <span className="font-semibold text-[#27221d]">{bestChoice.text}</span>. Try comparing how the sentence feels when the speaker is closer, softer, or more detached.
              </p>
            ) : null}
          </aside>
        </section>
      </div>
    </main>
  );
}
