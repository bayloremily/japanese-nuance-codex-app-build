"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

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

type SceneVariant = {
  id: "textbook" | "diary" | "literature";
  label: string;
  note: string;
  level: "N4" | "N3" | "N2" | "N1";
  narration: string;
  speaker: string;
  lineBefore: string;
  lineAfter: string;
  prompt: string;
  intuition: string;
  choices: Choice[];
};

type Scene = {
  id: "after-rain" | "train-text" | "bookstore";
  place: string;
  mood: string;
  title: string;
  visualLabel: string;
  variants: SceneVariant[];
};

const statusText = {
  best: "自然",
  possible: "使えるがニュアンスが変わる",
  awkward: "文法的でも不自然",
};

const statusClass = {
  best: "border-emerald-700 bg-emerald-50 text-emerald-950",
  possible: "border-amber-700 bg-amber-50 text-amber-950",
  awkward: "border-rose-700 bg-rose-50 text-rose-950",
};

const scenes: Scene[] = [
  {
    id: "after-rain",
    place: "Kichijoji overlook",
    mood: "quiet after rain",
    title: "After the Rain",
    visualLabel: "wet city lights",
    variants: [
      {
        id: "textbook",
        label: "教科書",
        note: "A formal public description.",
        level: "N3",
        narration:
          "The same overlook appears in a guidebook-style sentence. The writer is describing a public feature, not sharing a personal feeling.",
        speaker: "Guide text",
        lineBefore: "この展望台からは、市街地の美しい",
        lineAfter: "を楽しむことができます。",
        prompt: "Which word fits this formal descriptive register?",
        intuition: "public description vs personal reaction",
        choices: [
          {
            id: "keikan",
            text: "景観",
            reading: "けいかん",
            gloss: "landscape appearance",
            status: "best",
            instinct:
              "景観 fits because the sentence is polished and public-facing. It treats the view as a feature of the place, which is natural in guide, tourism, and planning language.",
            tones: [
              { label: "Natural", value: 5 },
              { label: "Formal", value: 5 },
              { label: "Personal", value: 1 },
              { label: "Literary", value: 1 },
            ],
          },
          {
            id: "keshiki",
            text: "景色",
            reading: "けしき",
            gloss: "view, scenery",
            status: "possible",
            instinct:
              "景色 is understandable, but it is more everyday and personal. It would sound friendlier, like travel-blog copy rather than a formal guide.",
            weird:
              "It slightly softens the official tone, so the sentence loses some of its polished public-register feeling.",
            tones: [
              { label: "Natural", value: 4 },
              { label: "Formal", value: 2 },
              { label: "Personal", value: 3 },
              { label: "Literary", value: 1 },
            ],
          },
          {
            id: "fuukei",
            text: "風景",
            reading: "ふうけい",
            gloss: "landscape, scene",
            status: "possible",
            instinct:
              "風景 can work in descriptive writing, especially if the writer wants a scenic or slightly literary feeling.",
            weird:
              "For guidebook language, 景観 is more precise because it sounds like an official description of what visitors can view.",
            tones: [
              { label: "Natural", value: 4 },
              { label: "Formal", value: 3 },
              { label: "Personal", value: 2 },
              { label: "Literary", value: 3 },
            ],
          },
          {
            id: "koukei",
            text: "光景",
            reading: "こうけい",
            gloss: "sight, spectacle",
            status: "awkward",
            instinct:
              "光景 usually points to a specific sight or memorable scene, often with something happening.",
            weird:
              "A guidebook promising that visitors can enjoy a 光景 sounds oddly dramatic and less idiomatic.",
            tones: [
              { label: "Natural", value: 2 },
              { label: "Formal", value: 3 },
              { label: "Personal", value: 2 },
              { label: "Literary", value: 3 },
            ],
          },
        ],
      },
      {
        id: "diary",
        label: "SNS・日記",
        note: "A casual personal caption.",
        level: "N4",
        narration:
          "Later, you post one photo from the overlook. The sentence should feel light, natural, and personally felt without becoming essay-like.",
        speaker: "Caption",
        lineBefore: "雨上がりの",
        lineAfter: "、めちゃくちゃきれいだった。",
        prompt: "What sounds natural in a casual SNS or diary sentence?",
        intuition: "shareable immediacy vs over-written caption",
        choices: [
          {
            id: "keshiki",
            text: "景色",
            reading: "けしき",
            gloss: "view, scenery",
            status: "best",
            instinct:
              "景色 sounds like a person sharing what they saw. It is immediate, natural, and relaxed enough to sit next to めちゃくちゃきれいだった.",
            tones: [
              { label: "Natural", value: 5 },
              { label: "Casual", value: 5 },
              { label: "Personal", value: 5 },
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
              "風景 can work if the caption is more aesthetic or photo-diary-like. It feels a bit more composed than everyday speech.",
            weird:
              "With めちゃくちゃ, 風景 is slightly more written than the rest of the sentence.",
            tones: [
              { label: "Natural", value: 4 },
              { label: "Casual", value: 3 },
              { label: "Personal", value: 3 },
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
              "光景 makes the caption heavier, as if the photo captured an extraordinary or dramatic sight.",
            weird:
              "It clashes with the casual energy of めちゃくちゃ and sounds unintentionally grand.",
            tones: [
              { label: "Natural", value: 2 },
              { label: "Casual", value: 1 },
              { label: "Personal", value: 2 },
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
              "景観 is far too formal for a personal caption. It belongs to public scenery, cityscape preservation, and tourism language.",
            weird:
              "It sounds like a municipal account posted the photo, not a person sharing a pretty night.",
            tones: [
              { label: "Natural", value: 1 },
              { label: "Casual", value: 1 },
              { label: "Personal", value: 1 },
              { label: "Formal", value: 5 },
            ],
          },
        ],
      },
      {
        id: "literature",
        label: "文学",
        note: "A reflective narrated scene.",
        level: "N2",
        narration:
          "The same view is now written as literary narration. The sentence can tolerate more distance, imagery, and a framed sense of memory.",
        speaker: "Narration",
        lineBefore: "雨上がりの",
        lineAfter: "だけが、まだ夕暮れの静けさを残していた。",
        prompt: "Which word best carries the literary distance of this sentence?",
        intuition: "framed scene vs immediate view",
        choices: [
          {
            id: "fuukei",
            text: "風景",
            reading: "ふうけい",
            gloss: "landscape, scene",
            status: "best",
            instinct:
              "風景 works beautifully in narration because it frames the view as a scene. It creates a little distance, which suits memory, description, and literary atmosphere.",
            tones: [
              { label: "Natural", value: 5 },
              { label: "Literary", value: 5 },
              { label: "Personal", value: 2 },
              { label: "Formal", value: 2 },
            ],
          },
          {
            id: "keshiki",
            text: "景色",
            reading: "けしき",
            gloss: "view, scenery",
            status: "possible",
            instinct:
              "景色 still works, especially if the narration stays close to the character's eyes and feelings.",
            weird:
              "Compared with 風景, it feels a little more immediate and less composed.",
            tones: [
              { label: "Natural", value: 4 },
              { label: "Literary", value: 3 },
              { label: "Personal", value: 4 },
              { label: "Formal", value: 1 },
            ],
          },
          {
            id: "koukei",
            text: "光景",
            reading: "こうけい",
            gloss: "sight, spectacle",
            status: "possible",
            instinct:
              "光景 is possible if the writer wants the image to feel striking or memorable, almost like a scene imprinted on the mind.",
            weird:
              "Here it can feel slightly too dramatic because the sentence is quiet rather than eventful.",
            tones: [
              { label: "Natural", value: 3 },
              { label: "Literary", value: 4 },
              { label: "Personal", value: 2 },
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
              "景観 breaks the literary mood because it sounds institutional and evaluative.",
            weird:
              "The sentence suddenly feels like a planning document rather than a quiet memory.",
            tones: [
              { label: "Natural", value: 1 },
              { label: "Literary", value: 1 },
              { label: "Personal", value: 1 },
              { label: "Formal", value: 5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "train-text",
    place: "Chuo Line",
    mood: "concern at night",
    title: "A Message Left Open",
    visualLabel: "late train window",
    variants: [
      {
        id: "textbook",
        label: "教科書",
        note: "A neutral explanation of condition.",
        level: "N4",
        narration:
          "The phrase appears in a learning example. The sentence describes whether there is a problem, so precision matters more than emotional warmth.",
        speaker: "Example sentence",
        lineBefore: "この程度のけがなら、",
        lineAfter: "です。",
        prompt: "Which expression fits a neutral statement of being okay?",
        intuition: "objective condition vs emotional reassurance",
        choices: [
          {
            id: "daijoubu",
            text: "大丈夫",
            reading: "だいじょうぶ",
            gloss: "okay, all right",
            status: "best",
            instinct:
              "大丈夫です fits a neutral explanation because it can describe safety, acceptability, or the absence of a serious problem.",
            tones: [
              { label: "Natural", value: 5 },
              { label: "Neutral", value: 5 },
              { label: "Soft", value: 3 },
              { label: "Casual", value: 1 },
            ],
          },
          {
            id: "heiki",
            text: "平気",
            reading: "へいき",
            gloss: "fine, unaffected",
            status: "possible",
            instinct:
              "平気です is understandable, but it focuses more on whether the person is unfazed or can endure it.",
            weird:
              "In a textbook-like injury example, it can sound slightly more personal or tough than the neutral 大丈夫です.",
            tones: [
              { label: "Natural", value: 3 },
              { label: "Neutral", value: 3 },
              { label: "Soft", value: 2 },
              { label: "Casual", value: 3 },
            ],
          },
          {
            id: "genki",
            text: "元気",
            reading: "げんき",
            gloss: "energetic, well",
            status: "awkward",
            instinct:
              "元気 describes health or energy more broadly. It does not naturally evaluate whether an injury is okay.",
            weird:
              "It sounds like the sentence is saying the injury itself is energetic.",
            tones: [
              { label: "Natural", value: 1 },
              { label: "Neutral", value: 2 },
              { label: "Soft", value: 2 },
              { label: "Casual", value: 3 },
            ],
          },
          {
            id: "mondainai",
            text: "問題ない",
            reading: "もんだいない",
            gloss: "no problem",
            status: "possible",
            instinct:
              "問題ないです can work when judging whether something is a problem. It sounds more technical and less reassuring.",
            weird:
              "It fits a report better than a human explanation to someone worried.",
            tones: [
              { label: "Natural", value: 4 },
              { label: "Neutral", value: 5 },
              { label: "Soft", value: 1 },
              { label: "Casual", value: 1 },
            ],
          },
        ],
      },
      {
        id: "diary",
        label: "SNS・日記",
        note: "A friend checks in gently.",
        level: "N4",
        narration:
          "You are writing a short message after noticing your friend seemed quiet. The goal is concern without pressure.",
        speaker: "Message",
        lineBefore: "今日ちょっと元気なさそうだったけど、",
        lineAfter: "？無理しないでね。",
        prompt: "Which expression feels most caring and natural in a message?",
        intuition: "soft check-in vs tough reassurance",
        choices: [
          {
            id: "daijoubu",
            text: "大丈夫",
            reading: "だいじょうぶ",
            gloss: "okay, all right",
            status: "best",
            instinct:
              "大丈夫？ is the natural soft check-in. It leaves room for the other person to answer honestly and does not imply they should be fine.",
            tones: [
              { label: "Natural", value: 5 },
              { label: "Soft", value: 5 },
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
              "平気？ can work between close friends, but it has a tougher feeling, like asking whether someone can handle it.",
            weird:
              "Because this message is worried and gentle, 平気？ may sound a little less tender than 大丈夫？",
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
              "元気？ asks whether someone is energetic or well in a broad sense. After saying they looked not-genki, repeating it feels flat.",
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
        id: "literature",
        label: "文学",
        note: "A character hides how they feel.",
        level: "N2",
        narration:
          "In fiction, the phrase can carry the gap between what a character says and what they actually feel.",
        speaker: "Narration",
        lineBefore: "「",
        lineAfter: "」と彼女は笑った。けれど、その声は少し震えていた。",
        prompt: "Which expression carries the fragile reassurance in this line?",
        intuition: "spoken reassurance vs emotional leakage",
        choices: [
          {
            id: "daijoubu",
            text: "大丈夫",
            reading: "だいじょうぶ",
            gloss: "okay, all right",
            status: "best",
            instinct:
              "大丈夫 works because it can be sincere, polite, or quietly false. In narration, that ambiguity lets the reader feel the character trying to reassure someone.",
            tones: [
              { label: "Natural", value: 5 },
              { label: "Soft", value: 4 },
              { label: "Literary", value: 4 },
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
              "平気 can work if the character is trying to sound tough or casual. It has more resistance in it.",
            weird:
              "For a trembling voice, 平気 feels more like bravado than gentle reassurance.",
            tones: [
              { label: "Natural", value: 4 },
              { label: "Soft", value: 2 },
              { label: "Literary", value: 3 },
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
              "元気 sounds like a state of health or cheerfulness, not the kind of reassurance someone gives while hiding hurt.",
            weird:
              "It makes the line sound oddly cheerful and reduces the emotional tension.",
            tones: [
              { label: "Natural", value: 2 },
              { label: "Soft", value: 2 },
              { label: "Literary", value: 1 },
              { label: "Blunt", value: 1 },
            ],
          },
          {
            id: "mondainai",
            text: "問題ない",
            reading: "もんだいない",
            gloss: "no problem",
            status: "awkward",
            instinct:
              "問題ない is controlled and practical. It can be characterful, but not tender by default.",
            weird:
              "Unless the character is intentionally cold or formal, it flattens the vulnerable mood.",
            tones: [
              { label: "Natural", value: 2 },
              { label: "Soft", value: 1 },
              { label: "Literary", value: 2 },
              { label: "Blunt", value: 4 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "bookstore",
    place: "Jimbocho bookstore",
    mood: "quiet concentration",
    title: "The Bookstore Window",
    visualLabel: "bookstore afternoon",
    variants: [
      {
        id: "textbook",
        label: "教科書",
        note: "A neutral explanation of action.",
        level: "N4",
        narration:
          "The sentence appears in a language textbook. The goal is to describe the basic action clearly, not create atmosphere.",
        speaker: "Example sentence",
        lineBefore: "学生たちは展示されている本を",
        lineAfter: "いました。",
        prompt: "Which verb fits a neutral textbook description?",
        intuition: "clear action vs atmospheric gaze",
        choices: [
          {
            id: "miru",
            text: "見て",
            reading: "みて",
            gloss: "looking at, seeing",
            status: "best",
            instinct:
              "見る is broad and neutral, which is exactly why it fits a textbook sentence. It teaches the action without adding mood.",
            tones: [
              { label: "Natural", value: 5 },
              { label: "Neutral", value: 5 },
              { label: "Atmospheric", value: 1 },
              { label: "Formal", value: 1 },
            ],
          },
          {
            id: "nagameru",
            text: "眺めて",
            reading: "ながめて",
            gloss: "gazing at, looking over",
            status: "possible",
            instinct:
              "眺める is natural, but it adds duration and mood. It sounds more like the students are lingering over the books.",
            weird:
              "For a basic example sentence, it may teach extra nuance the sentence does not need.",
            tones: [
              { label: "Natural", value: 4 },
              { label: "Neutral", value: 2 },
              { label: "Atmospheric", value: 5 },
              { label: "Formal", value: 1 },
            ],
          },
          {
            id: "kansatsu",
            text: "観察して",
            reading: "かんさつして",
            gloss: "observing",
            status: "possible",
            instinct:
              "観察する works if the students are studying details carefully, but it changes the scene into analysis.",
            weird:
              "Without that study context, it sounds too scientific for simply looking at books.",
            tones: [
              { label: "Natural", value: 3 },
              { label: "Neutral", value: 4 },
              { label: "Atmospheric", value: 1 },
              { label: "Formal", value: 4 },
            ],
          },
          {
            id: "haiken",
            text: "拝見して",
            reading: "はいけんして",
            gloss: "humbly looking at",
            status: "awkward",
            instinct:
              "拝見する is humble language. It does not fit a neutral third-person textbook sentence about students.",
            weird:
              "The students suddenly sound like they are politely humbling themselves to the books.",
            tones: [
              { label: "Natural", value: 1 },
              { label: "Neutral", value: 1 },
              { label: "Atmospheric", value: 1 },
              { label: "Formal", value: 5 },
            ],
          },
        ],
      },
      {
        id: "diary",
        label: "SNS・日記",
        note: "A casual personal memory.",
        level: "N3",
        narration:
          "You write a small diary note after finding an old poetry book near the window. The sentence should feel personal and unforced.",
        speaker: "Diary",
        lineBefore: "窓辺の古い本を、しばらく",
        lineAfter: "いた。",
        prompt: "Which verb makes the diary feel quietly absorbed?",
        intuition: "lingering attention vs plain action",
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
              { label: "Casual", value: 3 },
              { label: "Atmospheric", value: 5 },
              { label: "Formal", value: 1 },
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
              "Because the diary is lingering and visual, 見て feels a little plain compared with 眺めて.",
            tones: [
              { label: "Natural", value: 4 },
              { label: "Casual", value: 4 },
              { label: "Atmospheric", value: 2 },
              { label: "Formal", value: 1 },
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
              "It makes the writer sound like they are studying the book instead of drifting into it.",
            tones: [
              { label: "Natural", value: 1 },
              { label: "Casual", value: 1 },
              { label: "Atmospheric", value: 1 },
              { label: "Formal", value: 4 },
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
              "In private diary narration it sounds stiff, as if the writer is bowing to the book.",
            tones: [
              { label: "Natural", value: 1 },
              { label: "Casual", value: 1 },
              { label: "Atmospheric", value: 1 },
              { label: "Formal", value: 5 },
            ],
          },
        ],
      },
      {
        id: "literature",
        label: "文学",
        note: "A sentence with stillness.",
        level: "N1",
        narration:
          "In a literary passage, the act of looking can carry time, attention, and silence. The word should let the scene breathe.",
        speaker: "Narration",
        lineBefore: "彼は古い詩集の背表紙を、午後の光の中で",
        lineAfter: "いた。",
        prompt: "Which verb gives the scene stillness and duration?",
        intuition: "poetic gaze vs mechanical seeing",
        choices: [
          {
            id: "nagameru",
            text: "眺めて",
            reading: "ながめて",
            gloss: "gazing at, looking over",
            status: "best",
            instinct:
              "眺める is natural in literature because it lets looking become time. It suggests a gaze that lingers rather than a quick act of seeing.",
            tones: [
              { label: "Natural", value: 5 },
              { label: "Literary", value: 5 },
              { label: "Atmospheric", value: 5 },
              { label: "Formal", value: 1 },
            ],
          },
          {
            id: "miru",
            text: "見て",
            reading: "みて",
            gloss: "looking at, seeing",
            status: "possible",
            instinct:
              "見る is possible, but it makes the sentence more functional. The scene loses some quiet duration.",
            weird:
              "It is not wrong; it is simply less textured than 眺めて.",
            tones: [
              { label: "Natural", value: 4 },
              { label: "Literary", value: 2 },
              { label: "Atmospheric", value: 2 },
              { label: "Formal", value: 1 },
            ],
          },
          {
            id: "kansatsu",
            text: "観察して",
            reading: "かんさつして",
            gloss: "observing",
            status: "awkward",
            instinct:
              "観察する would make the character sound analytical, as if collecting details for a study.",
            weird:
              "It breaks the stillness and replaces mood with examination.",
            tones: [
              { label: "Natural", value: 1 },
              { label: "Literary", value: 1 },
              { label: "Atmospheric", value: 1 },
              { label: "Formal", value: 4 },
            ],
          },
          {
            id: "haiken",
            text: "拝見して",
            reading: "はいけんして",
            gloss: "humbly looking at",
            status: "awkward",
            instinct:
              "拝見する could be used in dialogue with politeness, but here it interrupts the narrator's quiet distance.",
            weird:
              "The humility sounds socially marked in a sentence that wants visual stillness.",
            tones: [
              { label: "Natural", value: 1 },
              { label: "Literary", value: 1 },
              { label: "Atmospheric", value: 1 },
              { label: "Formal", value: 5 },
            ],
          },
        ],
      },
    ],
  },
];

function answerKey(sceneId: Scene["id"], variantId: SceneVariant["id"]) {
  return `${sceneId}:${variantId}`;
}

const furiganaEntries = [
  ["雨上がり", "あめあがり"],
  ["展望台", "てんぼうだい"],
  ["市街地", "しがいち"],
  ["景観", "けいかん"],
  ["景色", "けしき"],
  ["風景", "ふうけい"],
  ["光景", "こうけい"],
  ["程度", "ていど"],
  ["今日", "きょう"],
  ["元気", "げんき"],
  ["大丈夫", "だいじょうぶ"],
  ["平気", "へいき"],
  ["問題", "もんだい"],
  ["彼女", "かのじょ"],
  ["笑った", "わらった"],
  ["震えて", "ふるえて"],
  ["学生", "がくせい"],
  ["展示", "てんじ"],
  ["窓辺", "まどべ"],
  ["古い", "ふるい"],
  ["眺めて", "ながめて"],
  ["見て", "みて"],
  ["観察", "かんさつ"],
  ["拝見", "はいけん"],
  ["彼", "かれ"],
  ["詩集", "ししゅう"],
  ["背表紙", "せびょうし"],
  ["午後", "ごご"],
  ["光", "ひかり"],
  ["夕暮れ", "ゆうぐれ"],
  ["静けさ", "しずけさ"],
] as const;

function withFurigana(text: string, showFurigana: boolean): ReactNode[] {
  if (!showFurigana) {
    return [text];
  }

  const entries = [...furiganaEntries].sort((a, b) => b[0].length - a[0].length);
  const nodes: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length) {
    const match = entries.find(([word]) => remaining.startsWith(word));

    if (match) {
      nodes.push(
        <ruby key={key}>
          {match[0]}
          <rt>{match[1]}</rt>
        </ruby>,
      );
      remaining = remaining.slice(match[0].length);
    } else {
      nodes.push(remaining[0]);
      remaining = remaining.slice(1);
    }

    key += 1;
  }

  return nodes;
}

function ToneGauge({ tone }: { tone: Tone }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm text-slate-700">
        <span>{tone.label}</span>
        <span className="sr-only">{tone.value} out of 5</span>
      </div>
      <div className="relative h-3 rounded-full bg-slate-200">
        <div
          className="absolute left-0 top-0 h-3 rounded-full bg-slate-950"
          style={{ width: `${tone.value * 20}%` }}
        />
        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-950 bg-white shadow-sm"
          style={{ left: `${tone.value * 20}%` }}
        />
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            className={`h-1 rounded-full ${index < tone.value ? "bg-slate-950" : "bg-slate-200"}`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

function SceneImage({
  scene,
  variant,
}: {
  scene: Scene["id"];
  variant: SceneVariant["id"];
}) {
  const isTextbook = variant === "textbook";
  const isDiary = variant === "diary";

  return (
    <div className="relative min-h-[250px] overflow-hidden bg-slate-100">
      {scene === "after-rain" ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#dbeafe_0%,#e0f2fe_48%,#94a3b8_49%,#475569_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-slate-800" />
          {[12, 31, 54, 76].map((left, index) => (
            <div
              className="absolute bottom-12 w-16 rounded-t-sm bg-slate-700"
              key={left}
              style={{ height: `${80 + index * 18}px`, left: `${left}%` }}
            >
              <div className="grid grid-cols-2 gap-2 p-3">
                {Array.from({ length: 8 }).map((_, light) => (
                  <span
                    className={`h-2 rounded-sm ${isTextbook ? "bg-slate-400" : "bg-amber-200"}`}
                    key={light}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      ) : null}

      {scene === "train-text" ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#e5e7eb_0%,#cbd5e1_48%,#334155_49%,#0f172a_100%)]" />
          <div className="absolute left-[8%] top-[18%] h-32 w-[84%] rounded-md border-4 border-slate-700 bg-slate-900">
            <div className="absolute inset-3 rounded-sm bg-[linear-gradient(120deg,#1e293b,#475569)]" />
            <div className="absolute left-10 top-10 h-3 w-32 rounded-full bg-sky-200/70" />
            <div className="absolute right-12 top-16 h-2 w-20 rounded-full bg-amber-200/80" />
          </div>
          <div className="absolute bottom-8 left-[20%] h-20 w-[60%] rounded-md bg-white shadow-lg">
            <div className="m-4 h-3 w-3/4 rounded bg-slate-300" />
            <div className="mx-4 h-3 w-1/2 rounded bg-slate-200" />
          </div>
        </>
      ) : null}

      {scene === "bookstore" ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8fafc_0%,#e2e8f0_48%,#cbd5e1_100%)]" />
          <div className="absolute bottom-0 left-[8%] h-44 w-[84%] rounded-t-md bg-slate-800" />
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              className={`absolute bottom-8 h-28 w-3 rounded-sm ${index % 3 === 0 ? "bg-sky-200" : index % 3 === 1 ? "bg-emerald-200" : "bg-slate-300"}`}
              key={index}
              style={{ left: `${15 + index * 4}%`, height: `${70 + (index % 5) * 10}px` }}
            />
          ))}
          <div className="absolute right-[18%] top-10 h-28 w-20 rounded-sm bg-white/70 shadow" />
        </>
      ) : null}

      <div className="absolute inset-0 bg-white/10" />
      <div className="absolute left-5 top-5 rounded-md border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
        <p className="text-sm font-semibold text-slate-950">
          {isTextbook ? "Reference view" : isDiary ? "Personal view" : "Literary view"}
        </p>
        <p className="text-xs text-slate-700">
          {variant === "literature" ? "framed and reflective" : variant === "diary" ? "close and immediate" : "clean and descriptive"}
        </p>
      </div>
    </div>
  );
}

export default function ScenePrototype() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [variantId, setVariantId] = useState<SceneVariant["id"]>("textbook");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState<Record<string, string>>({});
  const [showFurigana, setShowFurigana] = useState(false);

  const scene = scenes[sceneIndex];
  const activeVariant = scene.variants.find((variant) => variant.id === variantId) ?? scene.variants[0];
  const currentAnswerKey = answerKey(scene.id, activeVariant.id);
  const selected = activeVariant.choices.find((choice) => choice.id === selectedId);
  const bestChoice = activeVariant.choices.find((choice) => choice.status === "best");
  const lessonUnits = scenes.length * 3;
  const completedCount = Object.keys(answered).length;

  const instinctProfile = useMemo(() => {
    const selectedChoices = scenes.flatMap((item) =>
      item.variants
        .map((variant) =>
          variant.choices.find((choice) => choice.id === answered[answerKey(item.id, variant.id)]),
        )
        .filter(Boolean),
    ) as Choice[];

    const tooFormal = selectedChoices.filter((choice) =>
      choice.tones.some((tone) => tone.label === "Formal" && tone.value >= 4),
    ).length;
    const tooFunctional = selectedChoices.filter((choice) =>
      choice.tones.some((tone) => ["Neutral", "Formal"].includes(tone.label) && tone.value >= 5),
    ).length;
    const best = selectedChoices.filter((choice) => choice.status === "best").length;

    if (!selectedChoices.length) {
      return "Your intuition profile will appear as you compare registers.";
    }

    if (best === selectedChoices.length) {
      return "You are tracking how register changes the natural choice.";
    }

    if (tooFormal > 0) {
      return "You may be reaching for precise words that sound too formal in personal writing.";
    }

    if (tooFunctional > 0) {
      return "You may be choosing words that explain the action clearly but miss the emotional register.";
    }

    return "You are noticing meaning; the next step is tuning distance, softness, and genre.";
  }, [answered]);

  function choose(choice: Choice) {
    setSelectedId(choice.id);
    setAnswered((current) => ({ ...current, [currentAnswerKey]: choice.id }));
  }

  function goToScene(nextIndex: number) {
    const nextScene = scenes[nextIndex];
    const nextVariantId = nextScene.variants[0].id;

    setSceneIndex(nextIndex);
    setVariantId(nextVariantId);
    setSelectedId(answered[answerKey(nextScene.id, nextVariantId)] ?? null);
  }

  function switchVariant(nextVariantId: SceneVariant["id"]) {
    setVariantId(nextVariantId);
    setSelectedId(answered[answerKey(scene.id, nextVariantId)] ?? null);
  }

  function reset() {
    setAnswered({});
    setSelectedId(null);
    setSceneIndex(0);
    setVariantId("textbook");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-medium text-slate-700">言葉の温度</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Kotoba no Ondo</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
            <span>{completedCount} / {lessonUnits} 問</span>
            <button
              aria-pressed={showFurigana}
              className={`h-10 rounded-md border px-4 font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-950 ${
                showFurigana
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-300 bg-white text-slate-950 hover:bg-slate-100"
              }`}
              onClick={() => setShowFurigana((current) => !current)}
              type="button"
            >
              ふりがな
            </button>
            <button
              className="h-10 rounded-md border border-slate-300 bg-white px-4 font-medium text-slate-950 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950"
              onClick={reset}
              type="button"
            >
              リセット
            </button>
          </div>
        </header>

        <section className="grid flex-1 gap-5 py-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex min-h-[640px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <SceneImage scene={scene.id} variant={activeVariant.id} />

            <div className="flex flex-1 flex-col gap-5 p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-700">{scene.place} · {scene.mood}</p>
                  <h2 className="mt-1 text-3xl font-semibold tracking-tight">{scene.title}</h2>
                </div>
                <span className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-950">
                  {activeVariant.level}
                </span>
              </div>

              <p className="max-w-3xl text-base leading-7 text-slate-700">{activeVariant.narration}</p>

              <div className="grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2 sm:grid-cols-3">
                {scene.variants.map((variant) => {
                  const isActive = variant.id === activeVariant.id;

                  return (
                    <button
                      className={`min-h-20 rounded-md border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-slate-950 ${
                        isActive
                          ? "border-slate-950 bg-white shadow-sm"
                          : "border-transparent text-slate-700 hover:bg-white"
                      }`}
                      key={variant.id}
                      onClick={() => switchVariant(variant.id)}
                      type="button"
                    >
                      <span className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-950">
                        <span>{variant.label}</span>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs">{variant.level}</span>
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-slate-700">{variant.note}</span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="mb-3 text-sm font-semibold text-slate-700">{activeVariant.speaker}</p>
                <p className="text-2xl leading-10 text-slate-950">
                  {withFurigana(activeVariant.lineBefore, showFurigana)}
                  <span className="mx-2 inline-flex min-h-11 min-w-28 items-center justify-center rounded-md border border-dashed border-slate-500 bg-white px-4 text-xl text-slate-950">
                    {selected ? withFurigana(selected.text, showFurigana) : "_____"}
                  </span>
                  {withFurigana(activeVariant.lineAfter, showFurigana)}
                </p>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-slate-800">{activeVariant.prompt}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {activeVariant.choices.map((choice) => {
                    const isSelected = selectedId === choice.id;
                    return (
                      <button
                        className={`min-h-24 rounded-lg border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-slate-950 ${
                          isSelected
                            ? "border-slate-950 bg-slate-100 shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-500 hover:bg-slate-50"
                        }`}
                        key={choice.id}
                        onClick={() => choose(choice)}
                        type="button"
                      >
                        <span className="block text-2xl font-semibold text-slate-950">
                          {withFurigana(choice.text, showFurigana)}
                        </span>
                        <span className="mt-1 block text-sm text-slate-700">
                          {showFurigana ? choice.gloss : `${choice.reading} · ${choice.gloss}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-5">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-700">解説</p>
              {selected ? (
                <div className="mt-4">
                  <span className={`inline-flex rounded-md border px-3 py-2 text-sm font-semibold ${statusClass[selected.status]}`}>
                    {statusText[selected.status]}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-950">
                    {withFurigana(selected.text, showFurigana)}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">{selected.instinct}</p>
                  {selected.weird ? (
                    <div className="mt-4 border-l-4 border-rose-700 bg-rose-50 p-4">
                      <p className="text-sm font-semibold text-rose-950">Why this sounds weird</p>
                      <p className="mt-2 leading-6 text-rose-950">{selected.weird}</p>
                    </div>
                  ) : (
                    <div className="mt-4 border-l-4 border-emerald-700 bg-emerald-50 p-4">
                      <p className="text-sm font-semibold text-emerald-950">Native speaker instinct</p>
                      <p className="mt-2 leading-6 text-emerald-950">
                        This choice matches the genre, emotional distance, and natural point of view in this version.
                      </p>
                    </div>
                  )}

                  <div className="mt-5 space-y-5">
                    {selected.tones.map((tone) => (
                      <ToneGauge key={tone.label} tone={tone} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-8 min-h-80 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-700">
                  いちばん自然に聞こえる表現を選んでください。Explanations will focus on register, genre, emotional posture, and native speaker instinct.
                </div>
              )}
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-700">直感プロフィール</p>
              <p className="mt-3 leading-7 text-slate-700">{instinctProfile}</p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-700">シーン</p>
              <div className="mt-4 grid gap-2">
                {scenes.map((item, index) => {
                  const answeredVariants = item.variants.filter((variant) => answered[answerKey(item.id, variant.id)]).length;

                  return (
                    <button
                      className={`rounded-md border p-3 text-left transition focus:outline-none focus:ring-2 focus:ring-slate-950 ${
                        index === sceneIndex
                          ? "border-slate-950 bg-slate-100"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                      key={item.id}
                      onClick={() => goToScene(index)}
                      type="button"
                    >
                      <span className="block font-semibold text-slate-950">{item.title}</span>
                      <span className="mt-1 block text-sm text-slate-700">
                        {answeredVariants} / {item.variants.length} register lenses
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="h-12 flex-1 rounded-md border border-slate-300 bg-white font-semibold text-slate-950 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:bg-slate-100 disabled:text-slate-500"
                disabled={sceneIndex === 0}
                onClick={() => goToScene(Math.max(0, sceneIndex - 1))}
                type="button"
              >
                前へ
              </button>
              <button
                className="h-12 flex-1 rounded-md bg-slate-950 font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:bg-slate-300 disabled:text-slate-600"
                disabled={sceneIndex === scenes.length - 1}
                onClick={() => goToScene(Math.min(scenes.length - 1, sceneIndex + 1))}
                type="button"
              >
                次のシーン
              </button>
            </div>

            {selected && bestChoice && selected.status !== "best" ? (
              <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                Most natural here: <span className="font-semibold text-slate-950">{bestChoice.text}</span>. Compare how the same idea changes between textbook, SNS/diary, and literature.
              </p>
            ) : null}
          </aside>
        </section>
      </div>
    </main>
  );
}
