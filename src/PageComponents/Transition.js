// 1. 보통 useTransition는 Suspsne와 같이 쓰입니다.

import React, { useState, useTransition, Suspense } from "react";
import { fetchProfileData } from "../libs/fakeApi";

const initialResource = fetchProfileData(0);

export default function Transition() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resource, setResource] = useState(initialResource);
  const [isPending, startTransition] = useTransition({
    timeoutMs: 5000,
  });

  function handleChange(e) {
    const value = e.target.value;

    // 즉각적으로 업데이트 되어야 하는 UI
    setCurrentIndex(value);

    // UI업데이트 우선순위를 낮춘다. => 즉각적으로 업데이트 되지 않아도 되는UI
    startTransition(() => {
      setResource(fetchProfileData(Number(value)));
    });
  }

  return (
    <section>
      <h1>Transition</h1>
      <input
        type="range"
        min="0"
        max="3"
        value={currentIndex}
        onChange={handleChange}
      />
      currentIndex: {currentIndex}
      <div
        style={{
          color: isPending ? "#777" : "#222",
        }}
      >
        <ProfilePage resource={resource} />
      </div>
    </section>
  );
}

function ProfilePage({ resource }) {
  return (
    <Suspense fallback={<h3>loading posts...</h3>}>
      <ProfileTimeline resource={resource} />
    </Suspense>
  );
}

function ProfileTimeline({ resource }) {
  const posts = resource.posts.read();

  // 기존의 방식이었다면
  //   if (!posts) return <h3>Loaidng...</h3>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
